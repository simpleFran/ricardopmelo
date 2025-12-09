"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";

export default function AppointmentModal() {
  const [open, setOpen] = useState(false);

  // Bloqueia o scroll do body enquanto o modal está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Botão principal */}
      <Dialog.Trigger asChild>
        <button className="cursor-pointer px-6 py-3 bg-orange-400 text-white rounded-xl hover:bg-brand-orange/80 transition active:scale-[0.98]">
          Agendar agora
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Fundo escuro */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            {/* Wrapper flex centralizado */}
            <Dialog.Content asChild>
              <motion.div
                className="
                  fixed inset-0 z-50 flex items-end sm:items-center justify-center
                  px-0 sm:px-6
                  overflow-hidden
                "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Painel principal do modal */}
                <motion.div
                  className="
                    relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-xl outline-none
                    overflow-y-auto overflow-x-hidden
                    max-h-[95dvh] sm:max-h-[90dvh]
                    pb-[env(safe-area-inset-bottom)]
                  "
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* Botão flutuante de fechar */}
                  <Dialog.Close asChild>
                    <button
                      aria-label="Fechar"
                      className="
                        absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm 
                        rounded-full shadow hover:bg-white active:scale-95 transition
                      "
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </Dialog.Close>

                  {/* Header fixo */}
                  <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 pt-6 pb-3 rounded-t-3xl sm:rounded-t-2xl">
                    <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900 text-center">
                      Agendar Atendimento
                    </Dialog.Title>
                  </div>

                  {/* Conteúdo (formulário) */}
                  <div className="px-6 pb-8 pt-2">
                    <AppointmentForm
                      onSuccess={() => {
                        setOpen(false);
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
