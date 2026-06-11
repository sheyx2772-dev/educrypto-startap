"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./wallet-lab-theme.css";

interface Props {
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

const WALLETS = [
  { id: "trust", name: "Trust Wallet", site: "trustwallet.com", status: "good" as const, icon: "🛡️", note: "NAPP ro'yxatida · mobil hamyon" },
  { id: "metamask", name: "MetaMask", site: "metamask.io", status: "good" as const, icon: "🦊", note: "Rasmiy sayt · Ethereum & Web3" },
  { id: "ledger", name: "Ledger", site: "ledger.com", status: "good" as const, icon: "🔐", note: "Cold wallet · eng xavfsiz" },
  { id: "binance", name: "Binance Wallet", site: "binance.com", status: "good" as const, icon: "💛", note: "Litsenziyali birja hamyoni" },
  { id: "telegram", name: "Telegram-bot hamyon", site: "t.me/free_crypto_bot", status: "illegal" as const, icon: "⚠️", note: "NOQONUNIY — firibgarlik xavfi!" },
  { id: "apk", name: "Noma'lum APK", site: "free-crypto.apk", status: "illegal" as const, icon: "🚫", note: "Hech qachon yuklamang!" },
];

const SEED_WORDS = [
  "witch", "collapse", "practice", "feed", "shame", "open",
  "despair", "creek", "road", "again", "ice", "least",
];

const VERIFY_INDICES = [2, 6, 10];

const VERIFY_OPTIONS: Record<number, string[]> = {
  2: ["practice", "collapse", "shame"],
  6: ["despair", "witch", "feed"],
  10: ["ice", "open", "least"],
};
const WALLET_ADDRESS = "0xRX7k9a2F...8b4cE1";
const SEND_TARGET = "0xTX8k2mP4...4f9aB7";
const DEMO_PASSWORD_MIN = 8;

type Step =
  | "splash"
  | "research"
  | "terms"
  | "password"
  | "seed-reveal"
  | "seed-verify"
  | "dashboard"
  | "receive"
  | "send-form"
  | "send-review"
  | "send-auth"
  | "success";

const STEPS_ORDER: Step[] = [
  "splash", "research", "terms", "password", "seed-reveal", "seed-verify",
  "dashboard", "receive", "send-form", "send-review", "send-auth", "success",
];

function stepIndex(s: Step) {
  return STEPS_ORDER.indexOf(s);
}

function QrMock() {
  const cells = useMemo(() =>
    Array.from({ length: 49 }, (_, i) => ((i * 7 + 13) % 11) > 4), []);
  return (
    <div className="wl-qr">
      {cells.map((dark, i) => (
        <div key={i} className={`wl-qr-cell ${dark ? "" : "light"}`} />
      ))}
    </div>
  );
}

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="wl-browser-bar">
      <div className="wl-dot" style={{ background: "#ef4444" }} />
      <div className="wl-dot" style={{ background: "#f59e0b" }} />
      <div className="wl-dot" style={{ background: "#22c55e" }} />
      <div className="wl-url-bar">
        <span className="wl-lock">🔒</span>
        <span>{url}</span>
      </div>
    </div>
  );
}

function Stepper({ current }: { current: Step }) {
  const idx = stepIndex(current);
  const labels = ["Tanlash", "Shartlar", "Parol", "Seed", "Tasdiq", "Hamyon", "Qabul", "Yuborish"];
  const mapped = [1, 2, 3, 4, 5, 6, 7, 9];
  return (
    <div className="wl-stepper">
      {labels.map((_, i) => {
        const threshold = mapped[i];
        const done = idx >= threshold;
        const active = idx === threshold || (idx === threshold - 1 && i === 0);
        return (
          <div
            key={labels[i]}
            className={`wl-step-dot ${done ? "done" : ""} ${active ? "active" : ""}`}
            title={labels[i]}
          />
        );
      })}
    </div>
  );
}

function createInitialWalletState() {
  return {
    step: "splash" as Step,
    selectedWallet: null as string | null,
    termsOk: false,
    password: "",
    password2: "",
    seedRevealed: false,
    seedSaved: false,
    verifyAnswers: {} as Record<number, string>,
    balance: 0,
    sendTo: "",
    amount: "",
    authPass: "",
    error: "",
    copied: false,
    txPending: false,
  };
}

export function WalletLab({ title, onComplete, allowReplay = false }: Props) {
  const [rewarded, setRewarded] = useState(allowReplay);
  const [step, setStep] = useState<Step>("splash");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [termsOk, setTermsOk] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [seedRevealed, setSeedRevealed] = useState(false);
  const [seedSaved, setSeedSaved] = useState(false);
  const [verifyAnswers, setVerifyAnswers] = useState<Record<number, string>>({});
  const [balance, setBalance] = useState(0);
  const [sendTo, setSendTo] = useState("");
  const [amount, setAmount] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [txPending, setTxPending] = useState(false);

  const chosenWallet = WALLETS.find((w) => w.id === selectedWallet);
  const passwordStrength = Math.min(100, password.length * 12 + (/\d/.test(password) ? 15 : 0) + (/[A-Z]/.test(password) ? 15 : 0));

  const pickWallet = (id: string, status: string) => {
    if (status === "illegal") {
      setError("⚠️ Bu hamyon xavfli! Faqat yashil (rasmiy) hamyonni tanlang.");
      setSelectedWallet(null);
      return;
    }
    setSelectedWallet(id);
    setError("");
  };

  const goResearch = () => {
    if (!selectedWallet) {
      setError("Davom etish uchun bitta rasmiy hamyon tanlang.");
      return;
    }
    setStep("terms");
  };

  const goPassword = () => {
    if (!termsOk) {
      setError("Davom etish uchun shartlarni qabul qiling.");
      return;
    }
    setError("");
    setStep("password");
  };

  const goSeedReveal = () => {
    if (password.length < DEMO_PASSWORD_MIN) {
      setError(`Parol kamida ${DEMO_PASSWORD_MIN} belgi bo'lishi kerak.`);
      return;
    }
    if (password !== password2) {
      setError("Parollar mos kelmayapti.");
      return;
    }
    setError("");
    setStep("seed-reveal");
  };

  const goSeedVerify = () => {
    if (!seedSaved) {
      setError("Seed iborani yozib oldim deb belgilang.");
      return;
    }
    setError("");
    setStep("seed-verify");
  };

  const goDashboard = () => {
    const allCorrect = VERIFY_INDICES.every((i) => verifyAnswers[i] === SEED_WORDS[i]);
    if (!allCorrect) {
      setError("Noto'g'ri so'z tanlandi. Seed iborani qayta tekshiring.");
      return;
    }
    setError("");
    setStep("dashboard");
  };

  const simulateReceive = () => {
    setBalance(25);
    setStep("receive");
  };

  const goSendForm = () => setStep("send-form");

  const goSendReview = () => {
    if (sendTo.trim() !== SEND_TARGET) {
      setError(`Manzil: ${SEND_TARGET}`);
      return;
    }
    if (amount.trim() !== "10") {
      setError("Summa: 10 USDT kiriting");
      return;
    }
    if (parseFloat(amount) > balance) {
      setError("Balans yetarli emas");
      return;
    }
    setError("");
    setStep("send-review");
  };

  const goSendAuth = () => setStep("send-auth");

  const resetWallet = () => {
    const init = createInitialWalletState();
    setStep(init.step);
    setSelectedWallet(init.selectedWallet);
    setTermsOk(init.termsOk);
    setPassword(init.password);
    setPassword2(init.password2);
    setSeedRevealed(init.seedRevealed);
    setSeedSaved(init.seedSaved);
    setVerifyAnswers(init.verifyAnswers);
    setBalance(init.balance);
    setSendTo(init.sendTo);
    setAmount(init.amount);
    setAuthPass(init.authPass);
    setError(init.error);
    setCopied(init.copied);
    setTxPending(init.txPending);
  };

  const confirmSend = () => {
    if (authPass !== password) {
      setError("Parol noto'g'ri");
      return;
    }
    setError("");
    setTxPending(true);
    setTimeout(() => {
      setTxPending(false);
      setBalance((b) => b - 10);
      setStep("success");
      if (!rewarded) {
        setRewarded(true);
        setTimeout(onComplete, 2200);
      }
    }, 1800);
  };

  const copyAddress = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const url = step === "research"
    ? "https://www.coingecko.com/learn/crypto-wallets"
    : chosenWallet
      ? `https://${chosenWallet.site}/download`
      : "https://wallet.demo";

  return (
    <div className="wl-app">
      <BrowserChrome url={url} />
      {step !== "splash" && step !== "success" && <Stepper current={step} />}

      <div className="wl-body">
        <AnimatePresence mode="wait">
          {step === "splash" && (
            <motion.div key="splash" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center py-6">
              <div className="wl-logo-ring mx-auto mb-5">🦊</div>
              <h3 className="text-lg font-extrabold mb-1">{title}</h3>
              <p className="text-xs text-[var(--wl-muted)] mb-6 max-w-xs mx-auto">
                Haqiqiy hamyon kabi: tanlash → parol → seed → qabul → yuborish
              </p>
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={() => setStep("research")}>
                Hamyon o&apos;rnatishni boshlash
              </button>
              <p className="text-[10px] text-[var(--wl-muted)] mt-4">Demo rejim — haqiqiy pul ishlatilmaydi</p>
            </motion.div>
          )}

          {step === "research" && (
            <motion.div key="research" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-xs font-bold mb-1">1-qadam: Hamyon tanlash</p>
              <p className="text-[11px] text-[var(--wl-muted)] mb-4">
                Rasmiy (yashil) bitta hamyon tanlang. Qizil — xavfli, tanlamang!
              </p>
              <div className="space-y-2 max-h-[240px] overflow-y-auto mb-3">
                {WALLETS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => pickWallet(w.id, w.status)}
                    className={`wl-wallet-row flex gap-3 items-start ${
                      selectedWallet === w.id
                        ? w.status === "good" ? "selected-safe" : "selected-danger"
                        : ""
                    }`}
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-sm font-bold">{w.name}</p>
                        <span className={w.status === "good" ? "wl-badge-safe" : "wl-badge-danger"}>
                          {w.status === "good" ? "RASMIY" : "XAVFLI"}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--wl-purple)] mt-0.5">{w.site}</p>
                      <p className="text-[10px] text-[var(--wl-muted)] mt-1">{w.note}</p>
                    </div>
                  </button>
                ))}
              </div>
              {error && <p className="wl-error">{error}</p>}
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full mt-2" onClick={goResearch}>
                O&apos;rnatishni davom ettirish →
              </button>
            </motion.div>
          )}

          {step === "terms" && chosenWallet && (
            <motion.div key="terms" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{chosenWallet.icon}</span>
                <div>
                  <p className="text-sm font-bold">{chosenWallet.name}</p>
                  <p className="text-[10px] text-[var(--wl-muted)]">Yangi hamyon yaratish</p>
                </div>
              </div>
              <div className="wl-card mb-4 text-[11px] text-[var(--wl-muted)] leading-relaxed max-h-32 overflow-y-auto">
                <p className="mb-2 font-semibold text-[var(--wl-text)]">Foydalanish shartlari</p>
                <p>Siz o&apos;z seed iborangiz va private keyingiz uchun to&apos;liq javobgarsiz. EduCrypto demo rejimida haqiqiy aktivlar saqlanmaydi.</p>
                <p className="mt-2">Seed iborani hech kimga bermang. Biz hech qachon so&apos;ramaymiz.</p>
              </div>
              <label className="wl-checkbox mb-4">
                <input type="checkbox" checked={termsOk} onChange={(e) => setTermsOk(e.target.checked)} />
                <span>Men xavfsizlik qoidalarini o&apos;qidim va qabul qilaman</span>
              </label>
              {error && <p className="wl-error">{error}</p>}
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={goPassword}>
                Yangi hamyon yaratish →
              </button>
            </motion.div>
          )}

          {step === "password" && (
            <motion.div key="password" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-bold mb-1">🔒 Parol yarating</p>
              <p className="text-[11px] text-[var(--wl-muted)] mb-4">
                Har safar tranzaksiya tasdiqlash uchun ishlatiladi (demo).
              </p>
              <input
                type="password"
                className="wl-input mb-2"
                placeholder="Parol (min 8 belgi)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="wl-strength">
                <div
                  className="wl-strength-fill"
                  style={{
                    width: `${passwordStrength}%`,
                    background: passwordStrength > 70 ? "var(--wl-green)" : passwordStrength > 40 ? "var(--wl-accent)" : "var(--wl-red)",
                  }}
                />
              </div>
              <input
                type="password"
                className="wl-input mt-3 mb-3"
                placeholder="Parolni tasdiqlang"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {error && <p className="wl-error">{error}</p>}
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={goSeedReveal}>
                Keyingi: Seed ibora →
              </button>
            </motion.div>
          )}

          {step === "seed-reveal" && (
            <motion.div key="seed-reveal" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-bold mb-1">📝 Maxfiy tiklash iborasi</p>
              <div className="wl-warning mb-3">
                ⚠️ 12 ta so&apos;zni qog&apos;ozga yozing. Screenshots oling! Internetga yubormang!
              </div>
              {!seedRevealed ? (
                <button type="button" className="wl-btn-secondary mb-3" onClick={() => setSeedRevealed(true)}>
                  👁 So&apos;zlarni ko&apos;rsatish
                </button>
              ) : (
                <div className="wl-seed-grid mb-3">
                  {SEED_WORDS.map((word, i) => (
                    <div key={word} className="wl-seed-word">
                      <span className="text-[var(--wl-muted)] text-[9px] block">{i + 1}</span>
                      {word}
                    </div>
                  ))}
                </div>
              )}
              <label className="wl-checkbox mb-3">
                <input type="checkbox" checked={seedSaved} onChange={(e) => setSeedSaved(e.target.checked)} disabled={!seedRevealed} />
                <span>Men seed iborani xavfsiz joyga yozib oldim</span>
              </label>
              {error && <p className="wl-error">{error}</p>}
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" disabled={!seedRevealed} onClick={goSeedVerify}>
                Seed iborani tasdiqlash →
              </button>
            </motion.div>
          )}

          {step === "seed-verify" && (
            <motion.div key="seed-verify" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-bold mb-1">Seed iborani tasdiqlang</p>
              <p className="text-[11px] text-[var(--wl-muted)] mb-4">Ko&apos;rsatilgan tartibdagi so&apos;zlarni tanlang:</p>
              {VERIFY_INDICES.map((idx) => (
                <div key={idx} className="mb-4">
                  <p className="text-[11px] font-semibold mb-2">#{idx + 1}-so&apos;z:</p>
                  <div className="flex flex-wrap gap-2">
                    {(VERIFY_OPTIONS[idx] ?? []).map((word) => (
                      <button
                        key={`${idx}-${word}`}
                        type="button"
                        className={`wl-word-pick ${verifyAnswers[idx] === word ? "picked" : ""}`}
                        onClick={() => setVerifyAnswers((a) => ({ ...a, [idx]: word }))}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {error && <p className="wl-error">{error}</p>}
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={goDashboard}>
                Hamyonni ochish ✓
              </button>
            </motion.div>
          )}

          {step === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="wl-dashboard mb-4">
                <p className="text-[10px] text-[var(--wl-muted)] mb-1">Ethereum Mainnet · Demo</p>
                <p className="wl-balance">{balance.toFixed(2)} <span className="text-base font-semibold text-[var(--wl-muted)]">USDT</span></p>
                <p className="text-[10px] font-mono text-[var(--wl-muted)] mt-1 truncate">{WALLET_ADDRESS}</p>
              </div>
              <div className="flex gap-2 mb-4">
                <button type="button" className="wl-action-btn" onClick={simulateReceive}>
                  <span className="text-lg">↓</span>
                  Qabul qilish
                </button>
                <button type="button" className="wl-action-btn" onClick={goSendForm} disabled={balance < 10}>
                  <span className="text-lg">↑</span>
                  Yuborish
                </button>
              </div>
              <p className="text-[10px] text-center text-[var(--wl-muted)]">
                Vazifa: avval 25 USDT qabul qiling, keyin 10 USDT yuboring
              </p>
            </motion.div>
          )}

          {step === "receive" && (
            <motion.div key="receive" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
              <p className="text-sm font-bold mb-3">Qabul qilish</p>
              <QrMock />
              <p className="text-[11px] font-mono mt-3 mb-1">{WALLET_ADDRESS}</p>
              <button type="button" className="text-[10px] text-[var(--wl-purple)] mb-3" onClick={copyAddress}>
                {copied ? "✓ Nusxa olindi" : "Manzilni nusxalash"}
              </button>
              <div className="wl-card text-left mb-3">
                <div className="wl-tx-row">
                  <span className="text-[var(--wl-muted)]">Holat</span>
                  <span className="text-[var(--wl-green)] font-semibold">+25 USDT qabul qilindi ✓</span>
                </div>
                <div className="wl-tx-row">
                  <span className="text-[var(--wl-muted)]">Balans</span>
                  <span className="font-bold">{balance} USDT</span>
                </div>
              </div>
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={goSendForm}>
                Endi 10 USDT yuborish →
              </button>
            </motion.div>
          )}

          {step === "send-form" && (
            <motion.div key="send-form" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-bold mb-1">↑ Yuborish</p>
              <p className="text-[11px] text-[var(--wl-muted)] mb-3">
                Demo vazifa: <span className="font-mono text-[var(--wl-text)]">{SEND_TARGET}</span> ga 10 USDT
              </p>
              <label className="text-[10px] text-[var(--wl-muted)] block mb-1">Qabul qiluvchi manzil</label>
              <input
                className="wl-input mono mb-3"
                placeholder="0x..."
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
              />
              <label className="text-[10px] text-[var(--wl-muted)] block mb-1">Summa (USDT)</label>
              <input
                className="wl-input mb-3"
                placeholder="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-[10px] text-[var(--wl-muted)] mb-3">Balans: {balance} USDT · Taxminiy komissiya: 0.42 USDT</p>
              {error && <p className="wl-error">{error}</p>}
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={goSendReview}>
                Ko&apos;rib chiqish →
              </button>
            </motion.div>
          )}

          {step === "send-review" && (
            <motion.div key="send-review" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-bold mb-3">Tranzaksiyani tasdiqlang</p>
              <div className="wl-card mb-4 space-y-0">
                <div className="wl-tx-row"><span className="text-[var(--wl-muted)]">Kimdan</span><span className="font-mono text-[10px]">{WALLET_ADDRESS}</span></div>
                <div className="wl-tx-row"><span className="text-[var(--wl-muted)]">Kimga</span><span className="font-mono text-[10px]">{sendTo || SEND_TARGET}</span></div>
                <div className="wl-tx-row"><span className="text-[var(--wl-muted)]">Summa</span><span className="font-bold">{amount} USDT</span></div>
                <div className="wl-tx-row"><span className="text-[var(--wl-muted)]">Gas fee</span><span>0.42 USDT</span></div>
                <div className="wl-tx-row"><span className="text-[var(--wl-muted)]">Jami</span><span className="font-bold text-[var(--wl-accent)]">{(parseFloat(amount || "0") + 0.42).toFixed(2)} USDT</span></div>
              </div>
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={goSendAuth}>
                Parol bilan tasdiqlash →
              </button>
            </motion.div>
          )}

          {step === "send-auth" && (
            <motion.div key="send-auth" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-sm font-bold mb-1">🔐 Parolni kiriting</p>
              <p className="text-[11px] text-[var(--wl-muted)] mb-4">Haqiqiy hamyonlarda biometrika yoki parol talab qilinadi.</p>
              <input
                type="password"
                className="wl-input mb-3"
                placeholder="Hamyon paroli"
                value={authPass}
                onChange={(e) => setAuthPass(e.target.value)}
              />
              {error && <p className="wl-error">{error}</p>}
              <button type="button" className="gplay-btn gplay-btn-sm !max-w-full" onClick={confirmSend} disabled={txPending}>
                {txPending ? "Tarmoqda tasdiqlanmoqda..." : "Tranzaksiyani yuborish"}
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
              <div className="wl-success-icon mb-4">✓</div>
              <p className="text-lg font-extrabold text-[var(--wl-green)] mb-1">Tranzaksiya muvaffaqiyatli!</p>
              <p className="text-[11px] font-mono text-[var(--wl-muted)] mb-2">Tx: 0x8a3f...c91e2b</p>
              <p className="text-xs text-[var(--wl-muted)]">Qolgan balans: {balance} USDT</p>
              {rewarded ? (
                <>
                  <p className="text-[10px] text-[var(--wl-muted)] mt-4">Mukofot olingan — qayta o&apos;ynash mumkin</p>
                  <button type="button" className="gplay-btn gplay-btn-sm !max-w-full mt-4" onClick={resetWallet}>
                    Qayta o&apos;ynash →
                  </button>
                </>
              ) : (
                <p className="text-[10px] text-[var(--wl-muted)] mt-4">Bosqich yakunlanmoqda...</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
