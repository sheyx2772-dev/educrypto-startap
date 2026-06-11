#!/usr/bin/env python3
"""Remove black/checkerboard backgrounds → true transparent PNGs for Kripto Shahar."""

from __future__ import annotations

import os
from PIL import Image

ASSETS = "/Users/macbookpro/.cursor/projects/Users-macbookpro-Desktop-educrypto/assets"
OUT = "/Users/macbookpro/Desktop/educrypto/public/game/kripto-shahar/v2"

MAPPING = {
    "school.png": "image-dfdb41da-653e-4ea5-befb-07793a64ba9c.png",
    "bank-orange.png": "image-7c1910af-5517-43e6-860c-0132bea4cb17.png",
    "bank-dark.png": "image-bb14f605-a910-400a-a491-66b8575a4e0c.png",
    "bank-coins.png": "image-0d1843bf-b735-40e4-a693-d25c094dc3b7.png",
    "shop-bitcoin.png": "image-387af71d-393d-4443-a346-c54a8dbca175.png",
    "shop-purple.png": "image-26f1af1a-d848-49da-81f9-c02a33104604.png",
    "shop-store.png": "image-ad7e0ed7-5d34-44f4-9737-c4930221927a.png",
    "shop-crypto.png": "image-6d53f4a2-4fb1-444e-ba9e-4188c521c260.png",
    "shop-btc-roof.png": "image-2e0742c4-1b6d-4c5f-aabe-41500e36db72.png",
    "vault.png": "image-324207c4-6aa2-43a5-8099-e61b43a2179a.png",
    "office.png": "image-595c1ad1-5313-41f5-bbf9-6d4881b5f338.png",
    "tree-green.png": "image-bc01181d-7242-43d2-9fbb-beb3ccd005a6.png",
    "house.png": "image-d9fc33a6-ce35-42e4-8e1a-1aec0d7771c9.png",
    "tree-gold.png": "image-931b2e14-b75b-4cfe-b54d-9ab50e86b48d.png",
}

# Maydonlar — to'liq fon, shaffoflik kerak emas
FIELD_MAPPING = {
    "field-plaza.png": "image-963c4f30-76d3-4caf-bb8c-4f3f51b3ce40.png",
    "field-pixel.png": "image-8b1f66ee-8d4f-44d2-a01a-f4e46da2bbee.png",
    "field-city.png": "image-8a09268b-7a06-4219-b5f8-b04b29422507.png",
}


def is_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 25:
        return True
    m = max(r, g, b)
    if m < 48:
        return True
    if abs(r - g) <= 14 and abs(g - b) <= 14:
        avg = (r + g + b) / 3
        if 88 <= avg <= 255:
            return True
    return False


def process_image(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    px = im.load()
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_background(r, g, b, a):
                continue
            m = max(r, g, b)
            fade = max(0.0, 1.0 - m / 65.0) if m < 65 else 0.0
            alpha = int(min(255, a * (1.0 - fade * 0.95)))
            if alpha < 12:
                continue
            out.putpixel((x, y), (r, g, b, alpha))

    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)

    os.makedirs(os.path.dirname(dst), exist_ok=True)
    out.save(dst, "PNG", optimize=True)
    tw, th = out.size
    trans = sum(1 for p in out.getdata() if p[3] < 20) / (tw * th) * 100
    print(f"  ✓ {os.path.basename(dst)} ({tw}x{th}, {trans:.0f}% shaffof)")


def copy_field(src: str, dst: str) -> None:
    import shutil

    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copy2(src, dst)
    print(f"  ✓ {os.path.basename(dst)} (maydon fon)")


def main() -> None:
    print("Processing Kripto Shahar v2 assets...")
    for out_name, src_name in MAPPING.items():
        src = os.path.join(ASSETS, src_name)
        dst = os.path.join(OUT, out_name)
        if not os.path.exists(src):
            print(f"  ✗ missing {src_name}")
            continue
        process_image(src, dst)
    for out_name, src_name in FIELD_MAPPING.items():
        src = os.path.join(ASSETS, src_name)
        dst = os.path.join(OUT, out_name)
        if os.path.exists(src):
            copy_field(src, dst)
    print("Done.")


if __name__ == "__main__":
    main()
