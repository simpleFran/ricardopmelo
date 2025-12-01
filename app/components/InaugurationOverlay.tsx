"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ConfettiBurst } from "./ConfettiBurst";

type Step = "closed" | "breaking" | "open";
type BreakVariant = 1 | 2 | 3;

const STORAGE_KEY = "ricardo_inauguracao_v1";
const INAUG_MODE: "off" | "test" | "live" = "test";


function getVariantFromUrl(): BreakVariant {
  if (typeof window === "undefined") return 1;
  const params = new URLSearchParams(window.location.search);
  const v = params.get("variant");
  if (v === "2") return 2;
  if (v === "3") return 3;
  return 1;
}

function isTestMode() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("testInaug") === "1";
}

export function InaugurationOverlay() {
  const [step, setStep] = useState<Step>("closed");
  const [variant] = useState<BreakVariant>(() => {
    if (typeof window === "undefined") return 1;
    return getVariantFromUrl();
  });


const [visible, setVisible] = useState<boolean>(() => {
  if (typeof window === "undefined") {
    // no SSR, só renderiza se não estiver OFF
    return INAUG_MODE !== "off";
  }

  if (INAUG_MODE === "off") return false;

  if (INAUG_MODE === "test") {
    // só mostra se tiver ?testInaug=1
    return isTestMode();
  }

  // INAUG_MODE === "live"
  const already = localStorage.getItem(STORAGE_KEY);
  return already !== "done";
});


  // useEffect(() => {
  //   // define a variant de quebra baseada na URL (?variant=2 etc)
  //   if (typeof window === "undefined") return;
  //   setVariant(getVariantFromUrl());
  // }, []);

  // quando abre de verdade, marca como done (exceto em modo teste)
  useEffect(() => {
    if (step === "open") {
      if (typeof window !== "undefined" && !isTestMode()) {
        localStorage.setItem(STORAGE_KEY, "done");
      }
      const t = setTimeout(() => setVisible(false), 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (!visible) return null;

  const handleClickBottle = () => {
    if (step !== "closed") return;
    setStep("breaking");
    setTimeout(() => {
      setStep("open");
    }, 900);
  };

  // animações diferentes pra quebra da garrafa
  const breakingAnim =
    variant === 1
      ? {
          rotate: [0, -25, 18, -40],
          y: [0, -10, 0, -18],
          opacity: [1, 1, 0.7, 0],
        }
      : variant === 2
      ? {
          rotate: [0, -10, -35, -80],
          y: [0, -5, -15, -30],
          opacity: [1, 1, 0.8, 0],
        }
      : {
          rotate: [0, 15, -20, 60],
          y: [0, 0, -5, -25],
          opacity: [1, 1, 0.6, 0],
        };

  const idleAnim = {
    rotate: [-18],
    y: [0, -4, 0],
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[80] bg-[#060606]/90 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: step === "open" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* palco central */}
          <div className="relative w-full max-w-4xl h-[420px] overflow-hidden rounded-3xl border border-[#2a2a2a] bg-gradient-to-b from-[#171717] via-[#111111] to-[#050505] shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
            {/* faixa vermelha */}
            <motion.div
              className="absolute inset-x-10 top-1/2 -translate-y-1/2 h-10 rounded-full bg-gradient-to-r from-[#8a1010] via-[#c71f1f] to-[#8a1010] border border-[#3f0000] shadow-lg flex items-center justify-center"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: step === "open" ? 0 : 1 }}
              transition={{
                duration: 0.7,
                delay: step === "open" ? 0.1 : 0,
              }}
            >
              <span className="text-sm md:text-base font-semibold text-[#ffecec] tracking-[0.25em] uppercase">
                Inauguração
              </span>
            </motion.div>

            {/* cortina esquerda */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-[#f6d0c2] via-[#f0a98e] to-[#c0674b] shadow-[15px_0_40px_rgba(0,0,0,0.5)]"
              initial={{ x: 0 }}
              animate={{ x: step === "open" ? "-110%" : 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <CurtainPattern side="left" />
            </motion.div>

            {/* cortina direita */}
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#f6d0c2] via-[#f0a98e] to-[#c0674b] shadow-[-15px_0_40px_rgba(0,0,0,0.5)]"
              initial={{ x: 0 }}
              animate={{ x: step === "open" ? "110%" : 0 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
              <CurtainPattern side="right" />
            </motion.div>

            {/* conteúdo central */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step === "open" ? 0 : 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-md font-extrabold uppercase tracking-[0.3em] text-[#f5f5f5]/70 mb-2">
                  Prepare-se
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#f5f5f5] mb-2">
                  Um novo espaço está prestes a ser inaugurado
                </h2>
                <p className="text-md md:text-base font-bold text-[#f5f5f5]/80 max-w-xl mx-auto">
                  Clique na garrafa para brindar este começo e revelar o site.
                </p>
              </motion.div>

              {/* botão-garrafa */}
              <motion.button
                type="button"
                onClick={handleClickBottle}
                whileHover={{ scale: step === "closed" ? 1.05 : 1 }}
                whileTap={{ scale: step === "closed" ? 0.97 : 1 }}
                className="relative mt-4 inline-flex items-center justify-center"
                disabled={step !== "closed"}
              >
                {/* base círculo */}
                <div className="h-24 w-24 rounded-full bg-[#1b1b1b] border border-[#f08a3b]/60 shadow-[0_0_35px_rgba(240,138,59,0.45)] flex items-center justify-center">
                  {/* garrafa animada */}
                  <motion.div
                    animate={step === "breaking" ? breakingAnim : idleAnim}
                    transition={
                      step === "breaking"
                        ? { duration: 0.9, ease: "easeOut" }
                        : {
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 1.3,
                          }
                    }
                    className="origin-bottom"
                  >
                    <BottleIcon />
                  </motion.div>
                </div>

                {/* brilhinhos */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: step === "breaking" ? 1 : 0.5,
                    scale: step === "breaking" ? 1.15 : 1,
                  }}
                  className="absolute -top-3 -right-3 text-[#f9d48c]"
                >
                  <Sparkles className="h-6 w-6" />
                </motion.div>
              </motion.button>

              <p className="text-[14px] text-[#fff] mt-3">
                * Desta vez é só o começo. Respira fundo e vamos entrar juntos.
              </p>
            </div>
          </div>

          {/* confete quando abre */}
          <ConfettiBurst active={step === "open"} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CurtainPattern({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`h-full w-full opacity-40 ${
        side === "left"
          ? "bg-[radial-gradient(circle_at_0_0,#ffffff33,transparent_60%)]"
          : "bg-[radial-gradient(circle_at_100%_0,#ffffff33,transparent_60%)]"
      }`}
    />
  );
}
// function BottleIcon() {
//   return (
//     <div className="relative">
//       {/* garrafa — cor maracujá */}
//       <div className="w-7 h-12 bg-[#f7d54a] rounded-t-full rounded-b-lg border border-[#d6b233] relative shadow-md">
//         {/* Tampa dourada */}
//         <div
//           className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-4 
//           bg-gradient-to-b from-[#f9e7b1] to-[#c9a758]
//           rounded-t-sm border border-[#b08e3c] shadow-sm"
//         />

//         {/* Zona mais escura da garrafa (base) */}
//         <div
//           className="absolute inset-x-1 bottom-1 h-5 
//           bg-[#e8c63a] 
//           rounded-b-md"
//         />
//       </div>

//       {/* Etiqueta com “Suco de Maracujá” */}
//       <div
//         className="absolute inset-x-0 top-3 h-4 
//         bg-[#fff4cc] 
//         border border-[#d6b56a] 
//         rounded-md flex items-center justify-center px-1"
//       >
//         <span className="text-[6.5px] font-semibold text-[#8a6b20] tracking-tight">
//           Suco de Maracujá
//         </span>
//       </div>
//     </div>
//   );
// }

function BottleIcon() {
  return (
    <div className="relative">
      {/* gotinhas decorativas */}
      <div className="absolute -top-2 -left-1 w-2 h-3 rounded-full bg-[#f9e27a] opacity-80 rotate-[-20deg]" />
      <div className="absolute -top-1 right-0 w-1.5 h-2.5 rounded-full bg-[#f9e27a] opacity-70 rotate-[15deg]" />

      {/* garrafa maracujá */}
      <div className="w-7 h-12 rounded-t-full rounded-b-lg border border-[#d6b233] bg-[#f7d54a] relative shadow-md overflow-hidden">
        {/* brilho lateral */}
        <div className="absolute inset-y-1 left-1 w-1 rounded-full bg-white/30 blur-[2px] opacity-80" />

        {/* camada de líquido mais intensa na base */}
        <div className="absolute inset-x-0 bottom-0 h-5 bg-[#e8c63a]" />

        {/* tampa dourada */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-4 
          bg-gradient-to-b from-[#f9e7b1] to-[#c9a758]
          rounded-t-sm border border-[#b08e3c] shadow-sm"
        />
      </div>

      {/* rótulo */}
      <div
        className="absolute inset-x-0 top-3 h-4 
        bg-[#fff4cc] 
        border border-[#d6b56a] 
        rounded-md flex items-center justify-center px-1 shadow-sm"
      >
        <span className="text-[6.3px] font-semibold text-[#8a6b20] tracking-tight whitespace-nowrap">
          Suco de Maracujá
        </span>
      </div>
    </div>
  );
}
