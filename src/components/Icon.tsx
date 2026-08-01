import type { SVGProps } from "react";

export type IconName =
  | "dashboard" | "bike" | "club" | "gift" | "tool" | "market"
  | "calendar" | "drop" | "bell" | "user" | "settings" | "search"
  | "route" | "star" | "pin" | "shield" | "menu" | "chevron"
  | "file" | "clock" | "mountain" | "flame" | "users" | "trophy"
  | "link" | "close";

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };

  const paths: Record<IconName, React.ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    bike: <><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M5.5 17.5 9 10h5l4.5 7.5M9 10l4 7.5M8 7h3M14 10l2-3h3"/></>,
    club: <><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z"/><path d="m5 15-.8 2.2L2 18l2.2.8L5 21l.8-2.2L8 18l-2.2-.8L5 15Z"/></>,
    gift: <><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z"/><path d="M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z"/></>,
    tool: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L20 16.4 16.4 20l-7.7-7.7"/></>,
    market: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    drop: <path d="M12 2s7 7.2 7 13a7 7 0 1 1-14 0c0-5.8 7-13 7-13Z"/>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.1v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    route: <><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19c8 0 2-14 8-14"/></>,
    star: <path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 8.9 9 8l3-6Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    mountain: <path d="m3 20 7-12 4 7 2-3 5 8Z"/>,
    flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-6-5-9 0 4-2 5-3 3-1-2 0-5 0-7-4 3-7 8-7 13 0 4 3 7 8 7Z"/>,
    users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 21a6 6 0 0 1 12 0M14 16a5 5 0 0 1 7 5"/></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 22h8M9 18h6"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></>,
    close: <path d="M6 6l12 12M18 6 6 18"/>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}
