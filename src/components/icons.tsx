type IconProps = {
  className?: string;
};

export function FoxMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 6 L26 24 L38 24 L50 6 L46 28 Q56 34 56 46 Q56 58 32 60 Q8 58 8 46 Q8 34 18 28 Z"
        fill="var(--color-brand-orange-500)"
        stroke="var(--color-brand-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 34 L44 46 Q44 56 32 58 Q20 56 20 46 Z"
        fill="#ffffff"
        stroke="var(--color-brand-ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="38" r="2.4" fill="var(--color-brand-ink)" />
      <circle cx="40" cy="38" r="2.4" fill="var(--color-brand-ink)" />
      <path
        d="M28 49 Q32 52 36 49"
        stroke="var(--color-brand-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="45" r="2.2" fill="var(--color-brand-ink)" />
    </svg>
  );
}

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20.4H24v7.2h11.3C33.7 32 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.8l5.1-5.1C33.2 7.9 28.8 6 24 6 14.1 6 6 14.1 6 24s8.1 18 18 18 18-8.1 18-18c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M8.5 14.7l5.9 4.3C16.1 15.7 19.8 13 24 13c2.8 0 5.3 1 7.3 2.8l5.1-5.1C33.2 7.9 28.8 6 24 6c-6.6 0-12.3 3.7-15.5 9.1z"
      />
      <path
        fill="#4CAF50"
        d="M24 42c4.7 0 9-1.8 12.2-4.7l-5.6-4.7c-1.7 1.2-3.9 1.9-6.6 1.9-5.2 0-9.6-3.5-11.2-8.3l-5.9 4.6C10.3 37.3 16.6 42 24 42z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20.4H24v7.2h11.3c-.8 2.3-2.3 4.2-4.3 5.6l5.6 4.7C39.9 35.5 42 30.1 42 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "shield-check":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M3 13l9 5 9-5" />
        </svg>
      );
    case "headset":
      return (
        <svg {...common}>
          <path d="M4 13a8 8 0 0116 0" />
          <rect x="3" y="13" width="4" height="6" rx="1.5" />
          <rect x="17" y="13" width="4" height="6" rx="1.5" />
          <path d="M19 19v1a3 3 0 01-3 3h-3" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M4 20V10M12 20V4M20 20v-7" />
        </svg>
      );
    case "utensils":
      return (
        <svg {...common}>
          <path d="M6 2v8a2 2 0 002 2h0a2 2 0 002-2V2M8 12v10M18 2c-2 1-3 3-3 6s1 4 3 4v10" />
        </svg>
      );
    case "heart-pulse":
      return (
        <svg {...common}>
          <path d="M20.8 8.5c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11a4.5 4.5 0 018-2.8 4.5 4.5 0 019.6 2.8z" />
          <path d="M4 12h3l2-4 3 6 2-3h6" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="10" height="18" rx="1" />
          <rect x="14" y="9" width="6" height="12" rx="1" />
          <path d="M7 7h1M11 7h1M7 11h1M11 11h1M7 15h1M11 15h1" />
        </svg>
      );
    case "graduation-cap":
      return (
        <svg {...common}>
          <path d="M2 9l10-5 10 5-10 5-10-5z" />
          <path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5M22 9v6" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
          <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M3 13l1.5-4.5A2 2 0 016.4 7h11.2a2 2 0 011.9 1.5L21 13" />
          <rect x="3" y="13" width="18" height="5" rx="1.5" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="16.5" cy="18" r="1.5" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );
    case "check-badge":
      return (
        <svg {...common}>
          <path d="M12 2l2.2 1.6 2.6-.4 1 2.5 2.5 1-.4 2.6L21.5 12l-1.6 2.2.4 2.6-2.5 1-1 2.5-2.6-.4L12 22l-2.2-1.6-2.6.4-1-2.5-2.5-1 .4-2.6L2.5 12l1.6-2.2-.4-2.6 2.5-1 1-2.5 2.6.4L12 2z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.2-1.44a9.87 9.87 0 004.84 1.28h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.14c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.13.11-1.82-.12-.42-.13-.96-.32-1.65-.62-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.6.83 2.08.9 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.63-.14.25.1 1.6.76 1.88.9.28.14.46.21.53.33.07.12.07.68-.17 1.36z" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
