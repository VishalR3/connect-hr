import { apiService } from "./apiService";

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "absent" | "late";
}

export interface LeaveRequest {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  type: "vacation" | "sick" | "personal";
  status: "pending" | "approved" | "rejected";
  reason: string;
}

export const timeManagementApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    // Attendance endpoints
    getAttendanceRecords: builder.query<AttendanceRecord[], void>({
      query: () => "time-management?type=attendance",
      providesTags: ["Attendance"],
    }),
    createAttendanceRecord: builder.mutation<
      AttendanceRecord,
      Partial<AttendanceRecord>
    >({
      query: (body) => ({
        url: "time-management",
        method: "POST",
        body: { ...body, type: "attendance" },
      }),
      invalidatesTags: ["Attendance"],
    }),
    updateAttendanceRecord: builder.mutation<
      AttendanceRecord,
      Partial<AttendanceRecord>
    >({
      query: ({ id, ...patch }) => ({
        url: `time-management/${id}`,
        method: "PUT",
        body: { ...patch, type: "attendance" },
      }),
      invalidatesTags: ["Attendance"],
    }),
    deleteAttendanceRecord: builder.mutation<void, number>({
      query: (id) => ({
        url: `time-management/${id}?type=attendance`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),

    // Leave endpoints
    getLeaveRequests: builder.query<LeaveRequest[], void>({
      query: () => "time-management?type=leave",
      providesTags: ["Leave"],
    }),
    createLeaveRequest: builder.mutation<LeaveRequest, Partial<LeaveRequest>>({
      query: (body) => ({
        url: "time-management",
        method: "POST",
        body: { ...body, type: "leave" },
      }),
      invalidatesTags: ["Leave"],
    }),
    updateLeaveRequest: builder.mutation<LeaveRequest, Partial<LeaveRequest>>({
      query: ({ id, ...patch }) => ({
        url: `time-management/${id}`,
        method: "PUT",
        body: { ...patch, type: "leave" },
      }),
      invalidatesTags: ["Leave"],
    }),
    deleteLeaveRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: `time-management/${id}?type=leave`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useGetAttendanceRecordsQuery,
  useCreateAttendanceRecordMutation,
  useUpdateAttendanceRecordMutation,
  useDeleteAttendanceRecordMutation,
  useGetLeaveRequestsQuery,
  useCreateLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useDeleteLeaveRequestMutation,
} = timeManagementApi;
