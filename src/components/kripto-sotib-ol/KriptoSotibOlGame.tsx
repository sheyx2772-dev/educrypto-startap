"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useSotibOlStore, WIN_PURCHASE_COUNT } from "@/lib/kripto-sotib-ol/store";
import { STALL_PRODUCTS } from "@/lib/kripto-sotib-ol/products";
import { ASSET_META } from "@/lib/kripto-sotib-ol/market";
import { LiveRatesFeed } from "./LiveRatesFeed";
import { StallGrid } from "./StallGrid";
import { PaymentCenter } from "./PaymentCenter";
import { ConversionModal } from "./ConversionModal";
import { IntroPanel } from "./IntroPanel";
import "./kripto-sotib-ol-theme.css";

interface Props {
  onComplete?: () => void;
  allowReplay?: boolean;
}

export function KriptoSotibOlGame({ onComplete, allowReplay = false }: Props) {
  const store = useSotibOlStore();
  const paymentRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (allowReplay) store.setRewarded(true);
    return () => store.resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (store.phase !== "playing") return;
    const id = setInterval(() => store.tickMarket(), 3000);
    return () => clearInterval(id);
  }, [store.phase, store]);

  useEffect(() => {
    if (store.phase === "won" && !store.pathCompleteFired && onComplete && !store.rewarded) {
      store.setRewarded(true);
      store.markPathComplete();
      setTimeout(onComplete, 2000);
    }
  }, [store.phase, store.pathCompleteFired, store.rewarded, onComplete, store]);

  useEffect(() => {
    if (store.selectedProduct) setShowModal(true);
  }, [store.selectedProduct]);

  const handleSelect = (p: typeof STALL_PRODUCTS[0]) => {
    store.selectProduct(p);
    setShowModal(true);
  };

  const handleDragToCenter = (p: typeof STALL_PRODUCTS[0]) => {
    store.selectProduct(p);
    setShowModal(true);
  };

  const handleSubmit = (amount: number) => {
    const ok = store.submitPayment(amount);
    if (ok) {
      setShowModal(false);
      store.dismissModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    store.dismissModal();
  };

  if (store.phase === "intro") {
    return (
      <div className="kso-root">
        <IntroPanel onStart={() => store.startGame()} />
      </div>
    );
  }

  if (store.phase === "won") {
    return (
      <div className="kso-root">
        <div className="kso-won">
          <p className="text-5xl mb-3">🏆</p>
          <p className="kso-won-title">HISOB-KITOB USTASI</p>
          <p className="text-sm text-[var(--kso-muted)] mt-2">
            {store.purchased.length} ta aktiv portfelga qo&apos;shildi!
          </p>
          <p className="text-xs mt-3 text-[var(--kso-gold)] font-bold">
            ✓ {store.successStreak} muvaffaqiyat · ✗ {store.failedAttempts} rad etilgan
          </p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-sm">
            {store.purchased.map((item) => {
              const prod = STALL_PRODUCTS.find((p) => p.id === item.productId);
              return (
                <span
                  key={item.productId}
                  className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5"
                >
                  {prod && (
                    <Image src={prod.image} alt="" width={18} height={18} className="object-contain" unoptimized />
                  )}
                  {prod?.nameUz}
                </span>
              );
            })}
          </div>
          {(allowReplay || store.rewarded) && (
            <button
              type="button"
              className="gplay-btn mt-8"
              onClick={() => { store.resetGame(); store.setRewarded(true); }}
            >
              Qayta o&apos;ynash →
            </button>
          )}
        </div>
      </div>
    );
  }

  const olaaWarn = store.failedAttempts >= 2;

  return (
    <div className="kso-root">
      <div className="kso-hud">
        <div className="kso-hud-stat">
          <span>🛒</span>
          <span>
            {store.purchased.length}/{WIN_PURCHASE_COUNT} xarid
          </span>
        </div>
        <div className="kso-hud-stat">
          <span>✓</span>
          <span>{store.successStreak}</span>
        </div>
        <div className="kso-hud-stat">
          <span>✗</span>
          <span className={store.failedAttempts >= 3 ? "text-[var(--kso-red)]" : ""}>
            {store.failedAttempts}
          </span>
        </div>
        <div className="kso-hud-stat text-[var(--kso-cyan)]">
          <span>⏱</span>
          <span>Live kurs</span>
        </div>
      </div>

      <LiveRatesFeed rates={store.rates} />

      {store.olaaMessage && (
        <div className={`kso-olaa ${olaaWarn ? "warn" : ""}`}>
          🎩 Shlyapa-Coin: {store.olaaMessage}
        </div>
      )}

      <div className="kso-layout">
        <div className="kso-center-block">
          <PaymentCenter
            ref={paymentRef}
            selected={store.selectedProduct}
            shake={store.txShake}
            onOpenCheckout={() => setShowModal(true)}
          />

          <div className="kso-inventory">
            <p className="kso-inventory-title">Sotib olinganlar</p>
            {store.purchased.length === 0 ? (
              <p className="text-[10px] text-[var(--kso-muted)]">Hali xarid yo&apos;q</p>
            ) : (
              store.purchased.map((item) => {
                const prod = STALL_PRODUCTS.find((p) => p.id === item.productId);
                const sym = ASSET_META[item.asset].symbol;
                return (
                  <div key={item.productId} className="kso-inv-item">
                    {prod && (
                      <Image
                        src={prod.image}
                        alt={prod.nameUz}
                        width={28}
                        height={28}
                        className="kso-inv-thumb"
                        unoptimized
                      />
                    )}
                    <span className="flex-1 font-bold">{prod?.nameUz}</span>
                    <span className="text-[var(--kso-gold)]">
                      {item.paidCrypto.toFixed(ASSET_META[item.asset].decimals)} {sym}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <StallGrid
          products={STALL_PRODUCTS}
          purchasedIds={store.purchasedIds}
          selectedId={store.selectedProduct?.id ?? null}
          onSelect={handleSelect}
          onDragToCenter={handleDragToCenter}
          paymentCenterRef={paymentRef}
        />
      </div>

      <AnimatePresence>
        {showModal && store.selectedProduct && (
          <ConversionModal
            product={store.selectedProduct}
            rates={store.rates}
            lastMessage={store.lastTxMessage}
            onSubmit={handleSubmit}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
