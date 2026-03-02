"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import BookingsCalendar from "@/components/bookings/BookingsCalendar";
import BookingsEnquiryForm from "@/components/bookings/BookingsEnquiryForm";
import {
  INITIAL_FORM_STATE,
  MONTH_OFFSET_MAX,
  MONTH_OFFSET_MIN,
} from "@/components/bookings/constants";
import { buildBookingMailto } from "@/components/bookings/buildMailto";
import {
  addMonthsLocal,
  getMonthGrid,
  parseISODateLocal,
  startOfTodayLocal,
} from "@/components/bookings/dateUtils";
import type { AvailabilityData, BookingFormState } from "@/components/bookings/types";

type BookingsWidgetProps = {
  availability: AvailabilityData;
};

export default function BookingsWidget({ availability }: BookingsWidgetProps) {
  const bookedSet = useMemo(
    () => new Set(availability.booked),
    [availability.booked],
  );
  const notes = availability.notes ?? {};
  const today = useMemo(() => startOfTodayLocal(), []);

  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedISO, setSelectedISO] = useState<string>("");
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<BookingFormState>(INITIAL_FORM_STATE);

  const viewMonths = useMemo(() => {
    const first = addMonthsLocal(today, monthOffset);
    return [first, addMonthsLocal(first, 1)];
  }, [today, monthOffset]);

  const monthViews = useMemo(
    () =>
      viewMonths.map((month) => ({
        month,
        cells: getMonthGrid(month),
      })),
    [viewMonths],
  );

  const selectedDate = selectedISO ? parseISODateLocal(selectedISO) : null;

  function chooseDate(iso: string) {
    const date = parseISODateLocal(iso);
    if (!date) {
      return;
    }

    if (bookedSet.has(iso)) {
      setNotice("That date is marked as booked. Please choose another.");
      return;
    }

    if (date.getTime() < today.getTime()) {
      setNotice("Please choose a future date.");
      return;
    }

    setNotice(null);
    setSelectedISO(iso);
  }

  function onDateInput(next: string) {
    if (!next) {
      setSelectedISO("");
      return;
    }

    chooseDate(next);
  }

  function updateField(key: keyof BookingFormState, value: string) {
    setForm((prev) => (prev[key] === value ? prev : { ...prev, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !selectedISO) {
      setNotice("Add your name, email, and pick a date to send an enquiry.");
      return;
    }

    setNotice(null);
    window.location.href = buildBookingMailto(form, selectedISO);
  }

  function shiftMonth(delta: -1 | 1) {
    setMonthOffset((offset) =>
      Math.min(MONTH_OFFSET_MAX, Math.max(MONTH_OFFSET_MIN, offset + delta)),
    );
  }

  return (
    <div className="bookingGrid">
      <BookingsCalendar
        monthViews={monthViews}
        timezone={availability.timezone}
        notes={notes}
        bookedSet={bookedSet}
        selectedISO={selectedISO}
        today={today}
        onShiftMonth={shiftMonth}
        onChooseDate={chooseDate}
      />

      <BookingsEnquiryForm
        form={form}
        notice={notice}
        selectedDate={selectedDate}
        selectedISO={selectedISO}
        onDateInput={onDateInput}
        onSubmit={onSubmit}
        onUpdateField={updateField}
      />
    </div>
  );
}
