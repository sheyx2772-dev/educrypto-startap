"use client";

interface Props {
  display: string;
  suffix: string;
  onDigit: (d: string) => void;
  onDot: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
}

type KeyDef = { label: string; action: "digit" | "dot" | "clear" | "backspace"; wide?: boolean };

const ROWS: KeyDef[][] = [
  [
    { label: "7", action: "digit" },
    { label: "8", action: "digit" },
    { label: "9", action: "digit" },
    { label: "⌫", action: "backspace" },
  ],
  [
    { label: "4", action: "digit" },
    { label: "5", action: "digit" },
    { label: "6", action: "digit" },
    { label: "AC", action: "clear" },
  ],
  [
    { label: "1", action: "digit" },
    { label: "2", action: "digit" },
    { label: "3", action: "digit" },
    { label: ".", action: "dot" },
  ],
  [{ label: "0", action: "digit", wide: true }],
];

export function CryptoCalculator({
  display,
  suffix,
  onDigit,
  onDot,
  onClear,
  onBackspace,
  onSubmit,
  canSubmit,
}: Props) {
  const handleKey = (key: KeyDef) => {
    switch (key.action) {
      case "digit":
        onDigit(key.label);
        break;
      case "dot":
        onDot();
        break;
      case "clear":
        onClear();
        break;
      case "backspace":
        onBackspace();
        break;
    }
  };

  return (
    <div className="kso-calc">
      <div className="kso-calc-display">
        <span className="kso-calc-display-val">{display || "0"}</span>
        <span className="kso-calc-display-sym">{suffix}</span>
        <div className="kso-calc-display-shine" />
      </div>

      <div className="kso-calc-grid">
        {ROWS.map((row, ri) =>
          row.map((key, ci) => (
            <button
              key={`${ri}-${ci}-${key.label}`}
              type="button"
              className={`kso-calc-key ${key.action !== "digit" ? "kso-calc-key-fn" : ""} ${key.wide ? "kso-calc-key-wide" : ""}`}
              onClick={() => handleKey(key)}
            >
              {key.label}
            </button>
          ))
        )}
      </div>

      <button
        type="button"
        className="gplay-btn gplay-btn-sm kso-calc-submit-btn"
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        = Tasdiqlash
      </button>
    </div>
  );
}
