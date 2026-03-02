import type { FormEvent } from "react";

import { FIELD_CONFIG } from "./constants";
import type { BookingFormState } from "./types";

type BookingsEnquiryFormProps = {
  form: BookingFormState;
  notice: string | null;
  selectedDate: Date | null;
  selectedISO: string;
  onDateInput: (next: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpdateField: (key: keyof BookingFormState, value: string) => void;
};

export default function BookingsEnquiryForm({
  form,
  notice,
  selectedDate,
  selectedISO,
  onDateInput,
  onSubmit,
  onUpdateField,
}: BookingsEnquiryFormProps) {
  return (
    <form className="bookingForm" onSubmit={onSubmit} aria-label="Booking form">
      <div className="formHeader">
        <p className="formTitle">Request a booking</p>
        <p className="muted formSub">
          Pick a date, add your details, and we will get back to confirm.
        </p>
      </div>

      <div className="formGrid">
        <label className="field">
          <span className="fieldLabel">Date</span>
          <input
            className="input"
            type="date"
            value={selectedISO}
            onChange={(event) => onDateInput(event.target.value)}
          />
          {selectedDate ? (
            <span className="fieldHint">
              Selected:{" "}
              {selectedDate.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          ) : (
            <span className="fieldHint">Choose a date from the calendar.</span>
          )}
        </label>

        {FIELD_CONFIG.map((field) => (
          <label key={field.key} className="field">
            <span className="fieldLabel">{field.label}</span>
            <input
              className="input"
              type={field.type ?? "text"}
              value={form[field.key]}
              onChange={(event) => onUpdateField(field.key, event.target.value)}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              required={field.required}
            />
          </label>
        ))}

        <label className="field fieldFull">
          <span className="fieldLabel">Message</span>
          <textarea
            className="textarea"
            value={form.message}
            onChange={(event) => onUpdateField("message", event.target.value)}
            rows={5}
            placeholder="Tell us about timings, guest count, dancefloor space, and any special requests."
          />
        </label>
      </div>

      {notice ? <p className="formNotice">{notice}</p> : null}

      <div className="formActions">
        <button type="submit" className="btn btnPrimary">
          Send enquiry
        </button>
        <a className="textLink" href="mailto:info@skaraceilidh.com">
          Or email info@skaraceilidh.com
        </a>
      </div>
    </form>
  );
}
