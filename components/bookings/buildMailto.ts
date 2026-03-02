import type { BookingFormState } from "./types";

export function buildBookingMailto(
  form: BookingFormState,
  selectedISO: string,
): string {
  const subject = `Skara booking enquiry - ${selectedISO || "Date TBC"}`;
  const lines = [
    `Name: ${form.name || "-"}`,
    `Email: ${form.email || "-"}`,
    `Date: ${selectedISO || "-"}`,
    `Event type: ${form.eventType || "-"}`,
    `Location: ${form.location || "-"}`,
    "",
    "Details:",
    form.message || "-",
  ];

  const body = lines.join("\n");
  return `mailto:info@skaraceilidh.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
