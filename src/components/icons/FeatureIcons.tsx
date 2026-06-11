interface IconProps {
  size?: number;
  active?: boolean;
}

const glow = (on = true) => (on ? "drop-shadow(0 0 6px #FFD700) drop-shadow(0 0 10px #FFD70066)" : "");

export function VideoLessonIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <rect x="4" y="10" width="40" height="28" rx="4" fill="#2C3E50" stroke="#FFD700" strokeWidth="2" />
      <path d="M20 18L32 24L20 30V18Z" fill="#FFD700" />
      <circle cx="38" cy="12" r="5" fill="#48C9A3" stroke="#fff" strokeWidth="1" />
    </svg>
  );
}

export function TaskIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <circle cx="24" cy="24" r="18" fill="#2C3E50" stroke="#48C9A3" strokeWidth="2" />
      <circle cx="24" cy="24" r="10" fill="none" stroke="#FFD700" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="#FFD700" />
    </svg>
  );
}

export function ShieldIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <path d="M24 4L40 12V24C40 34 32 40 24 44C16 40 8 34 8 24V12L24 4Z" fill="#2C3E50" stroke="#48C9A3" strokeWidth="2" />
      <path d="M18 24L22 28L30 18" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MarketIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <path d="M8 18L6 38H42L40 18H8Z" fill="#2C3E50" stroke="#FFD700" strokeWidth="2" />
      <path d="M4 18H44L40 10H8L4 18Z" fill="#48C9A3" stroke="#3ab08c" strokeWidth="1.5" />
      <circle cx="18" cy="28" r="3" fill="#FFD700" />
      <circle cx="30" cy="28" r="3" fill="#FFD700" />
    </svg>
  );
}

export function PhoneIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <rect x="14" y="6" width="20" height="36" rx="4" fill="#2C3E50" stroke="#FFD700" strokeWidth="2" />
      <rect x="18" y="12" width="12" height="20" rx="1" fill="#48C9A3" opacity="0.3" />
      <circle cx="24" cy="38" r="2" fill="#FFD700" />
    </svg>
  );
}

export function KycIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <rect x="8" y="12" width="32" height="24" rx="3" fill="#2C3E50" stroke="#48C9A3" strokeWidth="2" />
      <circle cx="20" cy="22" r="5" fill="#FFD700" />
      <path d="M14 34C14 30 16 28 20 28C24 28 26 30 26 34" stroke="#FFD700" strokeWidth="2" />
      <path d="M30 20H38M30 26H36" stroke="#48C9A3" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function OneIdIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <rect x="6" y="10" width="36" height="28" rx="4" fill="#2C3E50" stroke="#FFD700" strokeWidth="2" />
      <path d="M6 18H42" stroke="#FFD700" strokeWidth="2" />
      <text x="24" y="32" textAnchor="middle" fill="#48C9A3" fontSize="10" fontWeight="bold">OneID</text>
    </svg>
  );
}

export function PaymentIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <rect x="6" y="14" width="36" height="24" rx="4" fill="#2C3E50" stroke="#FFD700" strokeWidth="2" />
      <rect x="6" y="20" width="36" height="6" fill="#48C9A3" />
      <rect x="10" y="30" width="12" height="4" rx="1" fill="#FFD700" />
    </svg>
  );
}

export function InviteIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <circle cx="18" cy="16" r="7" fill="#2C3E50" stroke="#FFD700" strokeWidth="2" />
      <path d="M6 38C6 30 11 26 18 26C25 26 30 30 30 38" fill="#2C3E50" stroke="#48C9A3" strokeWidth="2" />
      <circle cx="34" cy="18" r="6" fill="#FFD700" stroke="#E6C200" strokeWidth="1.5" />
      <path d="M32 18H36M34 16V20" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TrophyIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: glow() }}>
      <path d="M14 8H34V18C34 24 30 28 24 28C18 28 14 24 14 18V8Z" fill="#FFD700" stroke="#E6C200" strokeWidth="2" />
      <path d="M10 10H14V16C10 16 8 14 8 12C8 10 10 10 10 10Z" fill="#2C3E50" stroke="#FFD700" strokeWidth="1.5" />
      <path d="M38 10H34V16C38 16 40 14 40 12C40 10 38 10 38 10Z" fill="#2C3E50" stroke="#FFD700" strokeWidth="1.5" />
      <rect x="20" y="28" width="8" height="6" fill="#2C3E50" />
      <rect x="16" y="34" width="16" height="4" rx="1" fill="#48C9A3" />
    </svg>
  );
}

export function ClickPayIcon({ size = 32, brand }: { size?: number; brand: "click" | "payme" }) {
  const color = brand === "click" ? "#00AFFF" : "#10C8B8";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      <rect x="4" y="10" width="40" height="28" rx="6" fill="#2C3E50" stroke={color} strokeWidth="2" />
      <text x="24" y="30" textAnchor="middle" fill={color} fontSize={brand === "click" ? "9" : "10"} fontWeight="bold">
        {brand === "click" ? "CLICK" : "Payme"}
      </text>
    </svg>
  );
}
