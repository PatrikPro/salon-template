"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/cms/types";
import { Modal } from "@/components/ui/Modal";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = images.find((i) => i.id === openId);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setOpenId(img.id)}
            className="relative text-left w-full overflow-hidden rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-luna-rose"
            aria-label={`Zvětšit: ${img.alt}`}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-luna-ink/0 group-hover:bg-luna-ink/10 transition-colors duration-300" />
            </div>
          </button>
        ))}
      </div>

      <Modal
        open={!!active}
        onClose={() => setOpenId(null)}
        title={active?.alt ?? "Náhled"}
        className="max-w-3xl"
      >
        {active && (
          <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain bg-luna-ivory"
              sizes="100vw"
            />
          </div>
        )}
      </Modal>
    </>
  );
}
