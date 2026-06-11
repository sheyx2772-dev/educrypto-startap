import type { FieldId } from "./types";

const V2 = "/game/kripto-shahar/v2";

export interface FieldDef {
  id: FieldId;
  name: string;
  description: string;
  preview: string;
  bgKey: string;
  bgPath: string;
  bgScale: number;
}

export const FIELDS: FieldDef[] = [
  {
    id: "pixel_park",
    name: "Pixel Park",
    description: "Klassik pixel art — yo'llar va daraxtlar",
    preview: `${V2}/field-pixel.png`,
    bgKey: "field_pixel",
    bgPath: `${V2}/field-pixel.png`,
    bgScale: 1.0,
  },
  {
    id: "green_plaza",
    name: "Yashil Maydon",
    description: "Keng yashil plaza — markaziy o'yin maydoni",
    preview: `${V2}/field-plaza.png`,
    bgKey: "field_plaza",
    bgPath: `${V2}/field-plaza.png`,
    bgScale: 1.0,
  },
];

export function getFieldById(id: FieldId) {
  return FIELDS.find((f) => f.id === id) ?? FIELDS[0];
}
