import { PayComponent } from "@prisma/client";
import { apiService } from "./apiService";
import { EmployeeComponent } from "@/app/types";

export const payComponentApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getPayComponents: builder.query<EmployeeComponent[], void>({
      query: () => "pay-component",
      providesTags: ["PayComponent"],
    }),
    getPayComponent: builder.query<PayComponent, number>({
      query: (id) => `pay-component/${id}`,
      providesTags: (result, error, id) => [{ type: "PayComponent", id }],
    }),
    createPayComponent: builder.mutation<PayComponent, Partial<PayComponent>>({
      query: (body) => ({
        url: "pay-component",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PayComponent"],
    }),
    updatePayComponent: builder.mutation<PayComponent, Partial<PayComponent>>({
      query: ({ id, ...patch }) => ({
        url: `pay-component/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "PayComponent", id },
      ],
    }),
    deletePayComponent: builder.mutation<void, number>({
      query: (id) => ({
        url: `pay-component/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PayComponent"],
    }),
  }),
});

export const {
  useGetPayComponentsQuery,
  useGetPayComponentQuery,
  useCreatePayComponentMutation,
  useUpdatePayComponentMutation,
  useDeletePayComponentMutation,
} = payComponentApi;
