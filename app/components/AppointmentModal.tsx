"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, MailCheck } from "lucide-react";
import { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";

export default function AppointmentModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Bloqueia o scroll do body enquanto o modal está aberto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // reset ao fechar
  // useEffect(() => {
  //   if (!open) setSubmitted(false);
  // }, [open]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSubmitted(false); // ✅ reseta ao fechar, sem useEffect
      }}
    >
      <Dialog.Trigger asChild>
        <button className="cursor-pointer px-6 py-3 bg-orange-400 text-white rounded-xl hover:bg-brand-orange/80 transition active:scale-[0.98]">
          Agendar Sessão
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-6 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-xl outline-none
                             overflow-y-auto overflow-x-hidden max-h-[95dvh] sm:max-h-[90dvh]
                             pb-[env(safe-area-inset-bottom)]"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Dialog.Close asChild>
                    <button
                      aria-label="Fechar"
                      className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white active:scale-95 transition"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </Dialog.Close>

                  <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 pt-6 pb-3 rounded-t-3xl sm:rounded-t-2xl">
                    <Dialog.Title className="text-lg sm:text-xl font-semibold text-gray-900 text-center">
                      {submitted ? "Pedido recebido" : "Agendar Atendimento"}
                    </Dialog.Title>
                  </div>

                  <div className="px-6 pb-8 pt-4">
                    {submitted ? (
                      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 text-orange-900">
                        <div className="flex items-start gap-3">
                          <MailCheck className="h-6 w-6 text-orange-700 mt-0.5" />
                          <div>
                            <div className="font-bold">
                              Enviámos um email com os próximos passos.
                            </div>
                            <p className="text-sm mt-2 leading-relaxed text-orange-800">
                              Verifica a tua caixa de entrada e também o
                              spam/promoções. O Ricardo vai pedir os teus{" "}
                              <strong>3 horários preferidos</strong> e a
                              disponibilidade
                              <strong> online/presencial</strong>.
                            </p>

                            <button
                              type="button"
                              className="mt-4 w-full rounded-xl bg-orange-600 text-white py-3 font-semibold hover:opacity-95"
                              onClick={() => setOpen(false)}
                            >
                              Fechar
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <AppointmentForm
                        onSuccess={() => {
                          setSubmitted(true);
                        }}
                      />
                    )}
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
