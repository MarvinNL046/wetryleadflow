// CRM Settings types and constants
// Separated from server actions to allow client-side imports

export type CallbackPeriod = {
  days: number;
  label: string;
  enabled: boolean;
};

export type CrmSettingsData = {
  id: number;
  workspaceId: number;
  autoFollowUpEnabled: boolean;
  followUpDays: number;
  maxCallAttempts: number;
  sendEmailOnLost: boolean;
  callbackPeriods: CallbackPeriod[];
  createdAt: Date;
  updatedAt: Date;
};

// Default callback periods that users can enable/disable
export const DEFAULT_CALLBACK_PERIODS: CallbackPeriod[] = [
  { days: 7, label: "1 Week", enabled: false },
  { days: 30, label: "1 Maand", enabled: false },
  { days: 90, label: "3 Maanden", enabled: false },
  { days: 180, label: "6 Maanden", enabled: false },
];
