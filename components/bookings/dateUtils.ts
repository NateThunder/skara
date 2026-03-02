function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatISODateLocal(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function parseISODateLocal(iso: string): Date | null {
  const [y, m, d] = iso.split("-").map((value) => Number(value));
  if (!y || !m || !d) {
    return null;
  }

  return new Date(y, m - 1, d);
}

export function startOfTodayLocal(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addMonthsLocal(base: Date, months: number): Date {
  return new Date(base.getFullYear(), base.getMonth() + months, 1);
}

export function monthLabel(date: Date): string {
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function getMonthGrid(date: Date): Array<Date | null> {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const firstOfMonth = new Date(year, monthIndex, 1);
  const firstWeekdayMonday0 = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstWeekdayMonday0; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, monthIndex, day));
  }

  const remainder = cells.length % 7;
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i += 1) {
      cells.push(null);
    }
  }

  return cells;
}
