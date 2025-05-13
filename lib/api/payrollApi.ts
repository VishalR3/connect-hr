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
  useGetPayrollRecordQuery,
  useCreatePayrollRecordMutation,
  useUpdatePayrollRecordMutation,
  useDeletePayrollRecordMutation,
  useCreatePayrollRunMutation,
} = payrollApi;
