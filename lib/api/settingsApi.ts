import { apiService } from "./apiService";

export interface CompanySettings {
  name: string;
  address: string;
  contact: string;
  taxId: string;
}

export interface PayrollSettings {
  currency: string;
  payday: number;
  overtimeRate: number;
}

export interface LeaveSettings {
  annualLeaveDays: number;
  sickLeaveDays: number;
  carryForward: boolean;
}

export interface Settings {
  company: CompanySettings;
  payroll: PayrollSettings;
  leave: LeaveSettings;
}

export const settingsApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<Settings, void>({
      query: () => "settings",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation<
      Settings,
      { section: keyof Settings; data: Partial<Settings[keyof Settings]> }
    >({
      query: ({ section, data }) => ({
        url: "settings",
        method: "PUT",
        body: { section, data },
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
