import type { ReactNode } from "react";

/** Ícones de traço, sempre enfeite: o texto ou o `aria-label` do botão diz o que ele faz. */
const Icon = ({ size = 20, children }: { size?: number; children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0"
  >
    {children}
  </svg>
);

export const ArrowIcon = () => (
  <Icon size={18}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const BackIcon = () => (
  <Icon>
    <path d="M15 5 8 12l7 7" />
  </Icon>
);

export const CopyIcon = () => (
  <Icon size={18}>
    <rect x="8" y="8" width="12" height="12" rx="3" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Icon>
);

export const CheckIcon = () => (
  <Icon size={18}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const ChatIcon = () => (
  <Icon>
    <path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7Z" />
  </Icon>
);

export const ShareIcon = () => (
  <Icon>
    <path d="M12 15V3.5M7.5 8 12 3.5 16.5 8" />
    <path d="M5 12.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5.5" />
  </Icon>
);

export const ReplayIcon = () => (
  <Icon size={18}>
    <path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5" />
    <path d="M4 4v4.5h4.5" />
  </Icon>
);
