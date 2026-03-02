type SectionDividerProps = {
  count?: number;
  mobileCount?: number;
  className?: string;
};

function clampCount(value: number | undefined, fallback: number) {
  const resolved = value ?? fallback;
  return Number.isFinite(resolved) ? Math.max(1, Math.floor(resolved)) : fallback;
}

function DividerSvg() {
  return (
    <div
      className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(200,163,91,0.58)] to-transparent"
      aria-hidden
    />
  );
}

export default function SectionDivider({
  count = 2,
  mobileCount = 1,
  className,
}: SectionDividerProps) {
  const desktopTotal = clampCount(count, 2);
  const mobileTotal = clampCount(mobileCount, 1);
  const rootClassName = className ?? "";

  return (
    <div aria-hidden="true" className={rootClassName}>
      <div className="flex flex-wrap items-center justify-center gap-4 px-2 md:hidden">
        {Array.from({ length: mobileTotal }).map((_, index) => (
          <div key={`mobile-${index}`} className="w-full max-w-[320px] min-w-0">
            <DividerSvg />
          </div>
        ))}
      </div>

      <div className="hidden md:flex md:flex-nowrap md:items-center md:justify-center md:gap-8">
        {Array.from({ length: desktopTotal }).map((_, index) => (
          <div key={`desktop-${index}`} className="w-full max-w-[380px] min-w-0 flex-1">
            <DividerSvg />
          </div>
        ))}
      </div>
    </div>
  );
}
