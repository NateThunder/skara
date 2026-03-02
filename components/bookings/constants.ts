import type { BookingFormState, FormFieldConfig } from "./types";

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const MONTH_OFFSET_MIN = -1;
export const MONTH_OFFSET_MAX = 12;

export const INITIAL_FORM_STATE: BookingFormState = {
  name: "",
  email: "",
  eventType: "",
  location: "",
  message: "",
};

export const FIELD_CONFIG: ReadonlyArray<FormFieldConfig> = [
  {
    key: "name",
    label: "Name",
    placeholder: "Your name",
    autoComplete: "name",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    placeholder: "you@email.com",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    key: "eventType",
    label: "Event type",
    placeholder: "Wedding / party / corporate...",
  },
  {
    key: "location",
    label: "Location",
    placeholder: "Town / venue",
  },
];
