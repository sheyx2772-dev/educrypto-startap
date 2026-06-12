interface IconProps {
  active?: boolean;
  size?: number;
}

const neonFilter = (active: boolean) =>
  active
    ? "drop-shadow(0 0 6px #FFD700) drop-shadow(0 0 12px #FFD70088)"
    : "drop-shadow(0 0 3px #2C3E5066)";

export function NavHomeIcon({ active = false, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="transition-all duration-300" style={{ filter: neonFilter(active) }}>
      <path d="M4 14L16 4L28 14V26C28 27.1 27.1 28 26 28H6C4.9 28 4 27.1 4 26V14Z" fill={active ? "#FFD700" : "#2C3E50"} stroke={active ? "#E6C200" : "#1a252f"} strokeWidth="1.5" />
      <path d="M12 28V18H20V28" fill={active ? "#FFFDF5" : "#48C9A3"} stroke={active ? "#E6C200" : "#3ab08c"} strokeWidth="1.5" />
    </svg>
  );
}

export function NavLessonsIcon({ active = false, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="transition-all duration-300" style={{ filter: neonFilter(active) }}>
      <rect x="4" y="6" width="24" height="20" rx="3" fill={active ? "#FFD700" : "#2C3E50"} stroke={active ? "#E6C200" : "#1a252f"} strokeWidth="1.5" />
      <path d="M9 12H23M9 16H18M9 20H21" stroke={active ? "#2C3E50" : "#48C9A3"} strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="8" r="4" fill="#48C9A3" stroke="#fff" strokeWidth="1" />
      <path d="M23 8H25M24 7V9" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function NavShopIcon({ active = false, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="transition-all duration-300" style={{ filter: neonFilter(active) }}>
      <path d="M8 12L6 26H26L24 12H8Z" fill={active ? "#FFD700" : "#2C3E50"} stroke={active ? "#E6C200" : "#1a252f"} strokeWidth="1.5" />
      <path d="M4 12H28L26 8H6L4 12Z" fill={active ? "#48C9A3" : "#48C9A3"} stroke={active ? "#3ab08c" : "#3ab08c"} strokeWidth="1.5" />
      <circle cx="13" cy="19" r="2" fill={active ? "#2C3E50" : "#FFD700"} />
      <circle cx="21" cy="19" r="2" fill={active ? "#2C3E50" : "#FFD700"} />
    </svg>
  );
}

export function NavProfileIcon({ active = false, size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="transition-all duration-300" style={{ filter: neonFilter(active) }}>
      <circle cx="16" cy="12" r="6" fill={active ? "#FFD700" : "#2C3E50"} stroke={active ? "#E6C200" : "#1a252f"} strokeWidth="1.5" />
      <path d="M6 28C6 22.5 10.5 18 16 18C21.5 18 26 22.5 26 28" fill={active ? "#48C9A3" : "#48C9A3"} stroke={active ? "#3ab08c" : "#3ab08c"} strokeWidth="1.5" />
    </svg>
  );
}

export function CoinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 0 4px #FFD700)" }}>
      <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#E6C200" strokeWidth="1.5" />
      <text x="12" y="16" textAnchor="middle" fill="#2C3E50" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

export function LockIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="#2C3E50" />
      <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8V11" stroke="#FFD700" strokeWidth="2" fill="none" />
      <circle cx="12" cy="16" r="1.5" fill="#FFD700" />
    </svg>
  );
}
