export type Benefit = {
  title: string;
  description: string;
};

export type Mention = {
  quote: string;
  label: string;
  href: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export const BENEFITS: Benefit[] = [
  {
    title: "Dancefloor energy",
    description:
      "Lively sets that keep people moving from first circle to last chorus.",
  },
  {
    title: "Crisp sound, any room",
    description:
      "A clean mix and confident delivery that fits both intimate spaces and big venues.",
  },
  {
    title: "Easy to book",
    description:
      "Check availability, share your details, and we will confirm the plan quickly.",
  },
];

export const MENTIONS: Mention[] = [
  {
    quote: '"Kept them up and dancing for hours!"',
    label: "Siobhan Amy Photography",
    href: "https://www.siobhanamyphotography.com/christina-iain-glenapp-castle-wedding/",
  },
  {
    quote: '"A really good ceilidh dance band."',
    label: "Cluarantonn (Scottish Digest)",
    href: "https://www.cluarantonn.com/scottish-digest/campbeltown/",
  },
  {
    quote: '"Live ceilidh music ... to keep you dancing all night."',
    label: "Perth Racecourse (Hogmanay Hoolie)",
    href: "https://www.perth-races.co.uk/fixture-Hogmanay-Hoolie-2025-id274",
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/skaraceilidhband/?locale=en_GB",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@skaraceilidhband2929",
  },
  {
    label: "Back to top",
    href: "#top",
  },
];
