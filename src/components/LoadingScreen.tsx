"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { isTemplatePath } from "@/lib/template";

export default function LoadingScreen() {
  const pathname = usePathname();
  const template = isTemplatePath(pathname);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      return;
    }
    setProgress(8);
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p;
        return Math.min(92, p + Math.random() * 18 + 6);
      });
    }, 120);
    return () => clearInterval(tick);
  }, [visible]);

  useEffect(() => {
    const t = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 180);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-busy="true"
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`flex flex-col items-center gap-5 ${
              template ? "w-[min(78vw,260px)]" : "w-[min(72vw,220px)]"
            }`}
          >
            <Image
              src={
                template
                  ? "/logo-template-monogram.png"
                  : "/logo-monogram-tight.png"
              }
              alt="AYYN."
              width={template ? 220 : 110}
              height={template ? 220 : 110}
              priority
              className="object-contain"
            />
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-blush"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <motion.div
                className="h-full rounded-full bg-mauve"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
