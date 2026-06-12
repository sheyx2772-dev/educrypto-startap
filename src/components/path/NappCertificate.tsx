"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkleBurst } from "@/components/lessons/SparkleBurst";
import { useTranslation } from "@/i18n/provider";
import { buildCertLabels, getCertMetaFromMessages, getLocaleTag } from "@/i18n/localize";
import {
  buildCertId,
  buildCertificateDocument,
  formatAwardDate,
  getCertificateBody,
  getCertificateStyles,
  type CertKey,
} from "@/lib/certificateHtml";

interface NappCertificateProps {
  certKey: CertKey;
  username: string;
  inviteCode: string;
  awardDateIso?: string;
  show: boolean;
  onClose: () => void;
}

export function NappCertificate({
  certKey,
  username,
  inviteCode,
  awardDateIso,
  show,
  onClose,
}: NappCertificateProps) {
  const { t, messages, locale } = useTranslation();
  const meta = getCertMetaFromMessages(messages)[certKey];
  const labels = useMemo(() => buildCertLabels(certKey, messages), [certKey, messages]);
  const localeTag = getLocaleTag(locale);

  const certData = useMemo(
    () => ({
      username,
      certKey,
      awardDate: formatAwardDate(awardDateIso, localeTag),
      certId: buildCertId(certKey, inviteCode, awardDateIso),
      labels,
      localeTag,
    }),
    [username, certKey, awardDateIso, inviteCode, labels, localeTag]
  );

  const previewHtml = useMemo(
    () => `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>${getCertificateStyles()}body{background:#fff;padding:12px;min-height:auto;}</style></head><body>${getCertificateBody(certData)}</body></html>`,
    [certData]
  );

  const fullDocument = useMemo(() => buildCertificateDocument(certData), [certData]);

  const handleDownload = () => {
    const blob = new Blob([fullDocument], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduCrypto-${certKey}-sertifikat.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(fullDocument);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 600);
  };

  return (
    <>
      <SparkleBurst show={show} />
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-3xl shadow-2xl border-2 border-duo-yellow max-h-[96vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider">{t("common.nappVerified")}</p>
                  <h3 className="text-sm font-extrabold text-secondary">{meta.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-secondary text-xl leading-none px-2"
                  aria-label={t("common.close")}
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-auto bg-[#f5f5f0] p-2 sm:p-4">
                <iframe
                  title={meta.title}
                  srcDoc={previewHtml}
                  className="w-full border-0 rounded-xl bg-white"
                  style={{ minHeight: 520, height: "min(72vh, 640px)" }}
                  sandbox="allow-same-origin"
                />
              </div>

              <div className="px-4 py-3 border-t border-gray-100 shrink-0">
                <div className="flex gap-2">
                  <button type="button" onClick={handleDownload} className="btn-3d-primary flex-1 !text-xs !py-2.5">
                    {t("common.download")}
                  </button>
                  <button type="button" onClick={handlePrint} className="btn-3d-accent flex-1 !text-xs !py-2.5">
                    {t("common.print")}
                  </button>
                </div>
                <p className="text-[9px] text-gray-400 text-center mt-2">
                  {certData.awardDate} · {certData.certId}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
