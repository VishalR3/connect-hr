import { PayrollRun } from "@prisma/client";
import { apiService } from "./apiService";

export interface PayrollRecord {
  id: number;
  employeeId: number;
  salary: number;
  bonus: number;
  deductions: number;
  paymentDate: string;
  status: "paid" | "pending" | "failed";
}

export const payrollApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getLatestPayrollRun: builder.query({
      query: () => "payrun",
      providesTags: ["Payrun"],
    }),
    getPayrollRuns: builder.query<PayrollRun[], void>({
      query: () => "payrun/all",
      providesTags: ["Payrun"],
    }),
    getPayrollRun: builder.query<PayrollRun, number>({
      query: (id) => `payrun/${id}`,
      providesTags: (result, error, id) => [{ type: "Payrun", id }],
    }),
    getPayrollRecord: builder.query<PayrollRecord, number>({
      query: (id) => `payroll/${id}`,
      providesTags: (result, error, id) => [{ type: "Payroll", id }],
    }),
    createPayrollRecord: builder.mutation<
      PayrollRecord,
      Partial<PayrollRecord>
    >({
      query: (body) => ({
        url: "payroll",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payroll"],
    }),
    createPayrollEntry: builder.mutation({
      query: (body) => ({
        url: "payroll-entry",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payrun"],
    }),
    updatePayrollRecord: builder.mutation<
      PayrollRecord,
      Partial<PayrollRecord>
    >({
      query: ({ id, ...patch }) => ({
        url: `payroll/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Payroll", id }],
    }),
    deletePayrollRecord: builder.mutation<void, number>({
      query: (id) => ({
        url: `payroll/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payroll"],
    }),
    deletePayrollEntry: builder.mutation<void, number>({
      query: (id) => ({
        url: `payroll-entry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payrun"],
    }),
    createPayrollRun: builder.mutation({
      query: (body) => ({
        url: "payrun",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payrun"],
    }),
  }),
});

export const {
  useGetLatestPayrollRunQuery,
  useGetPayrollRunsQuery,
  useGetPayrollRunQuery,
  useGetPayrollRecordQuery,
  useCreatePayrollRecordMutation,
  useCreatePayrollEntryMutation,
  useUpdatePayrollRecordMutation,
  useDeletePayrollRecordMutation,
  useDeletePayrollEntryMutation,
  useCreatePayrollRunMutation,
} = payrollApi;
