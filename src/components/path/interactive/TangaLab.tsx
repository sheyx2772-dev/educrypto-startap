"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import "./tanga-lab.css";

interface Props {
  title: string;
  onComplete: () => void;
  /** Ko'prik bosqichi allaqachon tugagan — qayta o'ynash mumkin */
  allowReplay?: boolean;
}

type CoinCategory = "crypto" | "fiat" | "stable";
type GameStatus = "playing" | "won" | "failed";

interface Coin {
  id: string;
  name: string;
  category: CoinCategory;
  image: string;
}

const POINTS = 5;
const TARGET = 100;

const COINS: Coin[] = [
  { id: "uzs", name: "O'zbekiston so'mi", category: "fiat", image: "/game/tanga/coins/uzs-gold.png" },
  { id: "rub", name: "Rossiya rubli", category: "fiat", image: "/game/tanga/coins/rub.png" },
  { id: "usd", name: "AQSh dollari", category: "fiat", image: "/game/tanga/coins/usd-coin.png" },
  { id: "fifa", name: "FIFA Qatar 2022", category: "fiat", image: "/game/tanga/coins/fifa-qatar.png" },
  { id: "lady", name: "Oltin tanga", category: "fiat", image: "/game/tanga/coins/gold-lady.png" },
  { id: "kzt", name: "Qozog'iston tengesi", category: "fiat", image: "/game/tanga/coins/kzt.png" },
  { id: "btc", name: "Bitcoin", category: "crypto", image: "/game/tanga/coins/btc.png" },
  { id: "eth", name: "Ethereum", category: "crypto", image: "/game/tanga/coins/eth.png" },
  { id: "ton-b", name: "Toncoin", category: "crypto", image: "/game/tanga/coins/ton-blue.png" },
  { id: "ton-g", name: "Toncoin Gold", category: "crypto", image: "/game/tanga/coins/ton-gold.png" },
  { id: "xrp", name: "XRP", category: "crypto", image: "/game/tanga/coins/xrp.png" },
  { id: "ftm", name: "Fantom", category: "crypto", image: "/game/tanga/coins/ftm.png" },
  { id: "matic", name: "Polygon", category: "crypto", image: "/game/tanga/coins/matic.png" },
  { id: "fil", name: "Filecoin", category: "crypto", image: "/game/tanga/coins/fil.png" },
  { id: "usdt", name: "Tether USDT", category: "stable", image: "/game/tanga/coins/usdt.png" },
  { id: "dai", name: "Dai", category: "stable", image: "/game/tanga/coins/dai.png" },
  { id: "usdc-d", name: "USDC", category: "stable", image: "/game/tanga/coins/usdc-dark.png" },
  { id: "usdc-g", name: "USDC Gold", category: "stable", image: "/game/tanga/coins/usdc-gold.png" },
  { id: "usdc-b", name: "USDC Blue", category: "stable", image: "/game/tanga/coins/usdc-blue.png" },
  { id: "tusd", name: "TrueUSD", category: "stable", image: "/game/tanga/coins/tusd.png" },
];

const WALLETS: { id: CoinCategory; label: string; sub: string; ring: string }[] = [
  { id: "fiat", label: "Hukumat tangasi", sub: "Fiat valyuta", ring: "ring-blue-400" },
  { id: "crypto", label: "Kripto tanga", sub: "Bitcoin hamyoni", ring: "ring-orange-400" },
  { id: "stable", label: "Stablecoin", sub: "Barqaror tanga", ring: "ring-emerald-400" },
];

interface BurnEffect {
  id: string;
  x: number;
  y: number;
}

function StableWalletIcon({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 120 90" fill="none" aria-hidden>
      <rect x="8" y="12" width="96" height="68" rx="10" fill="#111" stroke="#fff" strokeWidth="3" />
      <path d="M8 28H104" stroke="#fff" strokeWidth="2" />
      <rect x="78" y="38" width="28" height="32" rx="6" fill="#111" stroke="#fff" strokeWidth="2.5" />
      <circle cx="92" cy="54" r="5" fill="#fff" />
      <text x="42" y="58" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="900" fontFamily="system-ui">S</text>
    </svg>
  );
}

function WalletVisual({ type, open }: { type: CoinCategory; open: boolean }) {
  if (type === "stable") {
    return (
      <div className={`transition-transform duration-300 ${open ? "scale-110 -translate-y-1" : ""}`}>
        <StableWalletIcon size={60} />
      </div>
    );
  }
  const src = type === "crypto" ? "/game/tanga/wallets/crypto.png" : "/game/tanga/wallets/fiat.png";
  return (
    <div className={`relative transition-transform duration-300 ${open ? "scale-110 -translate-y-2" : ""}`}>
      <Image src={src} alt="" width={72} height={54} className="drop-shadow-lg tanga-lab-wallet-img" unoptimized />
      {open && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-amber-900/30 rounded-t-lg border border-amber-700/40" />
      )}
    </div>
  );
}

function createInitialState() {
  return {
    sorted: {} as Record<string, CoinCategory>,
    burned: new Set<string>(),
    score: 0,
    mistakes: 0,
    status: "playing" as GameStatus,
    burnFx: [] as BurnEffect[],
    msg: "",
  };
}

export function TangaLab({ title, onComplete, allowReplay = false }: Props) {
  const [sorted, setSorted] = useState<Record<string, CoinCategory>>({});
  const [burned, setBurned] = useState<Set<string>>(new Set());
  const [burnFx, setBurnFx] = useState<BurnEffect[]>([]);
  const [dragCoinId, setDragCoinId] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [hoverWallet, setHoverWallet] = useState<CoinCategory | null>(null);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [status, setStatus] = useState<GameStatus>(allowReplay ? "won" : "playing");
  const [msg, setMsg] = useState("");
  const [rewarded, setRewarded] = useState(allowReplay);

  const walletRefs = useRef<Record<CoinCategory, HTMLDivElement | null>>({ crypto: null, fiat: null, stable: null });
  const msgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const remaining = COINS.filter((c) => !sorted[c.id] && !burned.has(c.id));
  const done = Object.keys(sorted).length;

  const resetGame = () => {
    const init = createInitialState();
    setSorted(init.sorted);
    setBurned(init.burned);
    setBurnFx(init.burnFx);
    setScore(init.score);
    setMistakes(init.mistakes);
    setStatus("playing");
    setMsg("");
    setDragCoinId(null);
    setHoverWallet(null);
  };

  const showMsg = useCallback((text: string) => {
    if (msgTimer.current) clearTimeout(msgTimer.current);
    setMsg(text);
    msgTimer.current = setTimeout(() => setMsg(""), 2000);
  }, []);

  /** Tangalar tugaganda (joylandi + yondi) natijani tekshirish */
  const evaluateEndGame = useCallback((currentScore: number, sortedCount: number, burnedCount: number) => {
    if (sortedCount + burnedCount < COINS.length) return;

    if (currentScore >= TARGET) {
      setStatus("won");
      if (!rewarded) {
        setRewarded(true);
        setTimeout(onComplete, 500);
      }
    } else {
      setStatus("failed");
    }
  }, [rewarded, onComplete]);

  const getWalletAt = useCallback((x: number, y: number): CoinCategory | null => {
    for (const w of WALLETS) {
      const el = walletRefs.current[w.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return w.id;
    }
    return null;
  }, []);

  const handleDrop = useCallback((coinId: string, clientX: number, clientY: number) => {
    if (status !== "playing") return;

    const coin = COINS.find((c) => c.id === coinId);
    if (!coin) return;

    const target = getWalletAt(clientX, clientY);
    if (!target) {
      showMsg("Hamyon ustiga tashlang!");
      return;
    }

    if (coin.category === target) {
      const newScore = score + POINTS;
      const newSorted = { ...sorted, [coinId]: target };
      const sortedCount = Object.keys(newSorted).length;
      setSorted(newSorted);
      setScore(newScore);
      showMsg(`✓ +${POINTS} ball — ${coin.name}`);
      evaluateEndGame(newScore, sortedCount, burned.size);
    } else {
      const newBurned = new Set(burned).add(coinId);
      setBurned(newBurned);
      setMistakes((m) => m + 1);
      setBurnFx((fx) => [...fx, { id: `${coinId}-${Date.now()}`, x: clientX, y: clientY }]);
      showMsg(`🔥 ${coin.name} yonib ketdi — davom eting!`);
      evaluateEndGame(score, Object.keys(sorted).length, newBurned.size);
    }
  }, [status, getWalletAt, score, sorted, burned, showMsg, evaluateEndGame]);

  const onPointerDown = (e: React.PointerEvent, coinId: string) => {
    if (status !== "playing" || burned.has(coinId) || sorted[coinId]) return;
    e.preventDefault();
    setDragPos({ x: e.clientX, y: e.clientY });
    setDragCoinId(coinId);
  };

  /** Faqat tortish paytida scrollni to'xtatish — oddiy holatda sahifa suriladi */
  useEffect(() => {
    if (!dragCoinId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dragCoinId]);

  useEffect(() => {
    if (!dragCoinId) return;

    const onMove = (e: PointerEvent) => {
      setDragPos({ x: e.clientX, y: e.clientY });
      setHoverWallet(getWalletAt(e.clientX, e.clientY));
    };

    const onUp = (e: PointerEvent) => {
      handleDrop(dragCoinId, e.clientX, e.clientY);
      setDragCoinId(null);
      setHoverWallet(null);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragCoinId, getWalletAt, handleDrop]);

  const draggedCoin = dragCoinId ? COINS.find((c) => c.id === dragCoinId) : null;

  return (
    <div className={`tanga-lab-root rounded-2xl border-2 border-amber-400/60 shadow-xl select-none overflow-hidden ${dragCoinId ? "is-dragging" : ""}`}>
      <div className="bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 px-4 py-3">
        <p className="text-[10px] text-amber-950/70 font-bold uppercase">Tanga Top — saralash o&apos;yini</p>
        <h3 className="text-sm font-extrabold text-amber-950">{title}</h3>
      </div>

      <div className="tanga-lab-body bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 relative">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs font-extrabold text-duo-yellow bg-black/40 px-3 py-1 rounded-full">
              ⭐ {score}/{TARGET} ball
            </span>
            <span className="text-xs font-bold text-gray-400">{done}/{COINS.length} joylandi</span>
            {burned.size > 0 && (
              <span className="text-[10px] text-red-400 font-bold">🔥 {burned.size} yondi</span>
            )}
            {mistakes > 0 && (
              <span className="text-[10px] text-orange-400 font-bold">✗ {mistakes} xato</span>
            )}
          </div>
        </div>

        {status === "playing" && (
          <p className="text-[11px] text-gray-300 text-center mb-4 leading-relaxed">
            20 ta tanga · har biri +{POINTS} ball · xato = tanga yonadi, lekin o&apos;yin davom etadi
          </p>
        )}

        {status === "won" && (
          <div className="card-neon p-4 mb-4 text-center border-2 border-accent bg-accent/10">
            <p className="text-sm font-extrabold text-accent">🎉 100 ball to&apos;plandi!</p>
            <p className="text-[10px] text-gray-400 mt-1">Xohlagan vaqtda qayta o&apos;ynashingiz mumkin</p>
            <button onClick={resetGame} className="gplay-btn gplay-btn-sm mt-3 !text-xs !py-2">
              Qayta o&apos;ynash →
            </button>
          </div>
        )}

        {status === "failed" && (
          <div className="card-neon p-5 mb-4 text-center border-2 border-red-400/60 bg-gradient-to-b from-red-950/40 to-slate-900">
            <div className="flex justify-center mb-3">
              <Image
                src="/game/tanga/mascot-sad.png"
                alt="Xafa maskot"
                width={140}
                height={140}
                className="drop-shadow-lg"
                unoptimized
              />
            </div>
            <p className="text-base font-extrabold text-red-300">Ball yetmadi!</p>
            <p className="text-sm text-white mt-2">
              Siz <span className="text-duo-yellow font-extrabold">{score} ball</span> to&apos;pladingiz
            </p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Keyingi bosqichga o&apos;tish uchun <span className="text-duo-yellow font-bold">{TARGET} ball</span> kerak.
              {burned.size > 0 && ` ${burned.size} ta tanga yonib ketgan.`}
            </p>
            <button onClick={resetGame} className="gplay-btn mt-4 !text-sm !py-2.5 w-full max-w-xs">
              Qayta o&apos;yna →
            </button>
          </div>
        )}

        {status === "playing" && (
          <>
            <div className="tanga-lab-coins bg-black/30 rounded-2xl border border-white/10 p-3 mb-4">
              <p className="text-[9px] font-bold text-gray-500 uppercase mb-2">Tangalar ({remaining.length})</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {remaining.map((coin) => (
                  <motion.button
                    key={coin.id}
                    type="button"
                    onPointerDown={(e) => onPointerDown(e, coin.id)}
                    whileHover={{ scale: 1.08, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="tanga-lab-coin-btn relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg ring-2 ring-white/20 cursor-grab active:cursor-grabbing overflow-hidden"
                    style={{ touchAction: "none" }}
                  >
                    <Image
                      src={coin.image}
                      alt={coin.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="56px"
                      unoptimized
                      draggable={false}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="tanga-lab-wallets grid grid-cols-3 gap-2">
              {WALLETS.map((w) => {
                const isOpen = hoverWallet === w.id;
                const placed = COINS.filter((c) => sorted[c.id] === w.id);
                return (
                  <div
                    key={w.id}
                    ref={(el) => { walletRefs.current[w.id] = el; }}
                    className={`tanga-lab-wallet-cell rounded-2xl p-2 flex flex-col items-center transition-all duration-200 ${
                      isOpen ? `bg-white/10 ${w.ring} ring-2 scale-105` : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <WalletVisual type={w.id} open={isOpen} />
                    <p className="text-[9px] font-extrabold text-white mt-1 text-center">{w.label}</p>
                    <p className="text-[8px] text-gray-400 text-center">{w.sub}</p>
                    <div className="flex flex-wrap gap-0.5 justify-center mt-2 min-h-[28px]">
                      {placed.slice(-4).map((c) => (
                        <div key={c.id} className="w-6 h-6 relative rounded-full overflow-hidden ring-1 ring-white/30">
                          <Image src={c.image} alt="" fill className="object-cover" sizes="24px" unoptimized />
                        </div>
                      ))}
                      {placed.length > 4 && (
                        <span className="text-[8px] text-gray-400 self-center">+{placed.length - 4}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {dragCoinId && draggedCoin && status === "playing" && (
          <div
            className="fixed z-50 pointer-events-none w-16 h-16 rounded-full shadow-2xl ring-4 ring-duo-yellow/80"
            style={{ left: dragPos.x - 32, top: dragPos.y - 32, transform: "scale(1.15)" }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image src={draggedCoin.image} alt="" fill className="object-cover" sizes="64px" unoptimized />
            </div>
          </div>
        )}

        <AnimatePresence>
          {burnFx.map((fx) => (
            <motion.div
              key={fx.id}
              initial={{ opacity: 1, scale: 0.6 }}
              animate={{ opacity: 0, scale: 1.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 }}
              onAnimationComplete={() => setBurnFx((arr) => arr.filter((b) => b.id !== fx.id))}
              className="fixed z-50 pointer-events-none"
              style={{ left: fx.x - 40, top: fx.y - 60 }}
            >
              <div className="tanga-burn-flame text-5xl">🔥</div>
              <div className="tanga-burn-smoke w-20 h-20 rounded-full bg-orange-500/40 blur-xl -mt-8" />
            </motion.div>
          ))}
        </AnimatePresence>

        {msg && status === "playing" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xs font-bold text-duo-yellow mt-4"
          >
            {msg}
          </motion.p>
        )}
      </div>
    </div>
  );
}
