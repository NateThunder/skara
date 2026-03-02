import { monthLabel, formatISODateLocal } from "./dateUtils";
import type { MonthView } from "./types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

type BookingsCalendarProps = {
  monthViews: MonthView[];
  timezone?: string;
  notes: Record<string, string>;
  bookedSet: Set<string>;
  selectedISO: string;
  today: Date;
  onShiftMonth: (delta: -1 | 1) => void;
  onChooseDate: (iso: string) => void;
};

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export default function BookingsCalendar({
  monthViews,
  timezone,
  notes,
  bookedSet,
  selectedISO,
  today,
  onShiftMonth,
  onChooseDate,
}: BookingsCalendarProps) {
  return (
    <div className="calendarShell" aria-label="Availability calendar">
      <div className="calendarTop">
        <div className="legend" aria-label="Legend">
          <span className="legendItem">
            <span className="legendSwatch legendAvailable" aria-hidden="true" />
            Available
          </span>
          <span className="legendItem">
            <span className="legendSwatch legendBooked" aria-hidden="true" />
            Booked
          </span>
        </div>

        <div className="calNav" aria-label="Month navigation">
          <button
            type="button"
            className="calNavBtn"
            onClick={() => onShiftMonth(-1)}
            aria-label="Previous month"
          >
            Prev
          </button>
          <button
            type="button"
            className="calNavBtn"
            onClick={() => onShiftMonth(1)}
            aria-label="Next month"
          >
            Next
          </button>
        </div>
      </div>

      <div className="months">
        {monthViews.map(({ month, cells }) => (
          <div key={`${month.getFullYear()}-${month.getMonth()}`} className="month">
            <div className="monthHeader">
              <p className="monthTitle">{monthLabel(month)}</p>
              <p className="monthHint">{timezone ? `Times: ${timezone}` : ""}</p>
            </div>

            <div className="weekdayRow" aria-hidden="true">
              {WEEKDAYS.map((day) => (
                <div key={day} className="weekdayCell">
                  {day}
                </div>
              ))}
            </div>

            <div className="calGrid" role="grid">
              {cells.map((cell, idx) => {
                if (!cell) {
                  return <div key={`empty-${idx}`} className="calCell empty" />;
                }

                const iso = formatISODateLocal(cell);
                const isBooked = bookedSet.has(iso);
                const isPast = cell.getTime() < today.getTime();
                const isSelected = iso === selectedISO;
                const note = notes[iso];

                return (
                  <button
                    key={iso}
                    type="button"
                    className={cx(
                      "calCell",
                      isBooked ? "booked" : "available",
                      isSelected && "selected",
                    )}
                    onClick={() => onChooseDate(iso)}
                    disabled={isBooked || isPast}
                    aria-pressed={isSelected}
                    aria-label={
                      note
                        ? `${iso} (${isBooked ? "Booked" : "Available"}: ${note})`
                        : `${iso} (${isBooked ? "Booked" : "Available"})`
                    }
                    title={note || undefined}
                  >
                    <span className="dayNum">{cell.getDate()}</span>
                    {isBooked ? <span className="dot" aria-hidden="true" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
