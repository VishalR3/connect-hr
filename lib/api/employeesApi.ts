import { Employee } from "@prisma/client";
import { apiService } from "./apiService";

export const employeesApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "employees",
      providesTags: ["Employee"],
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id) => `employees/${id}`,
      providesTags: (result, error, id) => [{ type: "Employee", id }],
    }),
    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: "employees",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: ({ id, ...patch }) => ({
        url: `employees/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Employee", id }],
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    getEmployeeCompensations: builder.query({
      query: (id) => `employees/${id}/compensation`,
      providesTags: (result, error, id) => [{ type: "Compensation", id }],
    }),
    createCompensation: builder.mutation({
      query: (body) => ({
        url: `employees/${body.employeeId}/compensation/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Compensation"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetEmployeeCompensationsQuery,
  useCreateCompensationMutation,
} = employeesApi;
