import type { Locale } from "../config";
import { uzMessages } from "./uz";
import { ruMessages } from "./ru";
import { enMessages } from "./en";
import { kkMessages } from "./kk";
import { kyMessages } from "./ky";
import { tgMessages } from "./tg";
import type { Messages } from "./uz";

export type { Messages };

const all: Record<Locale, Messages> = {
  uz: uzMessages,
  ru: ruMessages,
  en: enMessages,
  kk: kkMessages,
  ky: kyMessages,
  tg: tgMessages,
};

export function getMessages(locale: Locale): Messages {
  return all[locale] ?? uzMessages;
}
