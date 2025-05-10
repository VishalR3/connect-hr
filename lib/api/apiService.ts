import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "Employee",
    "Payroll",
    "Attendance",
    "Leave",
    "Settings",
    "PayComponent",
  ],
  endpoints: () => ({}),
});
