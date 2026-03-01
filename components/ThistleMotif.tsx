type ThistleMotifProps = {
  className?: string;
  title?: string;
};

export default function ThistleMotif({
  className,
  title = "Decorative thistle motif",
}: ThistleMotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 520"
      role="img"
      aria-label={title}
    >
      <path
        d="M260 90c24 26 32 56 24 90-10 41-45 84-71 112-29 31-57 63-69 103-14 48 6 100 52 124 40 22 92 12 123-23 35-39 31-98 6-143-22-40-58-71-88-102"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M248 168c-46 4-88-14-120-52 28-3 55 4 80 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M272 168c46 4 88-14 120-52-28-3-55 4-80 21"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M220 258c-62 12-110 48-144 110 58-20 106-24 146-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M300 258c62 12 110 48 144 110-58-20-106-24-146-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M260 282c-5 52-8 104 2 154 10 45 30 78 62 98"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M260 282c5 52 8 104-2 154-10 45-30 78-62 98"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

