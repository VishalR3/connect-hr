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
    getPayrollRecords: builder.query<PayrollRecord[], void>({
      query: () => "payroll",
      providesTags: ["Payroll"],
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
  }),
});

export const {
  useGetPayrollRecordsQuery,
  useGetPayrollRecordQuery,
  useCreatePayrollRecordMutation,
  useUpdatePayrollRecordMutation,
  useDeletePayrollRecordMutation,
} = payrollApi;
