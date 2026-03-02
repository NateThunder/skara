export type AvailabilityData = {
  timezone?: string;
  booked: string[];
  notes?: Record<string, string>;
};

export type BookingFormState = {
  name: string;
  email: string;
  eventType: string;
  location: string;
  message: string;
};

export type FormInputKey = "name" | "email" | "eventType" | "location";

export type FormFieldConfig = {
  key: FormInputKey;
  label: string;
  placeholder: string;
  type?: "text" | "email";
  autoComplete?: string;
  required?: boolean;
};

export type MonthView = {
  month: Date;
  cells: Array<Date | null>;
};
