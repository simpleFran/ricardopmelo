/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { pt } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";

registerLocale("pt", pt);

type FormValues = {
  nome: string;
  email?: string;
  telefone: string;
  servico: string;
  dataHora: Date;
};



export default function AppointmentForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const dataHora = watch("dataHora");
  const servicos = [
    "Avaliação Inicial (60–75 min)",
    "Pacote Mensal (4 Sessões)",
    "Programa Intensivo – 8 Semanas",
    "Sessão de Apoio em Crise",
    "Acompanhamento Familiar (Sessão Conjunta)",
    "Workshop / Grupo Temático",
    "Retorno",
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

 function formatPhone(value: string) {
   const hasPlus = value.trim().startsWith("+");
   const digits = value.replace(/\D/g, "").slice(0, 15); // limita um pouco

   if (!digits) return hasPlus ? "+" : "";

   // 🇧🇷 Brasil (+55)
   if (digits.startsWith("55")) {
     const country = "+55";
     const rest = digits.slice(2);

     if (!rest) return country + " ";
     if (rest.length <= 2) return `${country} ${rest}`; // +55 11
     if (rest.length <= 7)
       return `${country} ${rest.slice(0, 2)} ${rest.slice(2)}`; // +55 11 9xxxx
     return `${country} ${rest.slice(0, 2)} ${rest.slice(2, 7)}-${rest.slice(
       7,
       11
     )}`; // +55 11 9xxxx-xxxx
   }

   // 🇵🇹 Portugal (+351)
   if (digits.startsWith("351")) {
     const country = "+351";
     const rest = digits.slice(3);

     if (!rest) return country + " ";
     if (rest.length <= 3) return `${country} ${rest}`; // +351 9xx
     if (rest.length <= 6)
       return `${country} ${rest.slice(0, 3)} ${rest.slice(3)}`; // +351 9xx xxx
     return `${country} ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(
       6,
       9
     )}`; // +351 9xx xxx xxx
   }

   // 🌍 genérico com DDI (+XX...)
   if (hasPlus) {
     if (digits.length <= 3) return `+${digits}`;
     if (digits.length <= 7) return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
     return `+${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(
       7,
       11
     )}`;
   }

   // sem +, formato mais solto (pode ser número local)
   if (digits.length <= 3) return digits;
   if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
   return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)}`;
 }
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, status: "pendente" }),
      });

      if (!res.ok) throw new Error("Erro no agendamento");

      reset();
      onSuccess?.();

      toast.success("✅ Agendamento confirmado!", {
        description: "Entraremos em contato em breve.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar agendamento.", {
        description: "Tente novamente em instantes.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nome completo"
        {...register("nome", { required: "Nome é obrigatório" })}
        className="border p-3 rounded-md"
      />
      {errors.nome && (
        <p className="text-sm text-red-600">{errors.nome.message}</p>
      )}
      <input
        type="email"
        placeholder="E-mail"
        {...register("email")}
        className="border p-3 rounded-md"
      />
      <input
        type="tel"
        placeholder="Ex: +351 9xx xxx xxx ou +55 11 9xxxx-xxx"
        {...register("telefone", {
          required: "Telefone é obrigatório",
          onChange: (e) => setValue("telefone", formatPhone(e.target.value)),
        })}
        className="border p-3 rounded-md"
      />
      {errors.telefone && (
        <p className="text-sm text-red-600">{errors.telefone.message}</p>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="border p-3 rounded-md bg-white text-black w-full text-left flex justify-between items-center"
        >
          {watch("servico") || "Selecione o serviço"}
          <span className="text-gray-500">▼</span>
        </button>

        {dropdownOpen && (
          <ul className="absolute mt-1 w-full border rounded-md bg-white shadow-md max-h-48 overflow-auto z-50">
            {servicos.map((s) => (
              <li
                key={s}
                onClick={() => {
                  setValue("servico", s);
                  setDropdownOpen(false);
                }}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      {errors.servico && (
        <p className="text-sm text-orange-600">{errors.servico.message}</p>
      )}
      <DatePicker
        selected={dataHora}
        onChange={(d) => setValue("dataHora", d as Date)}
        showTimeSelect
        timeIntervals={30}
        dateFormat="Pp"
        locale="pt"
        placeholderText="Selecione data e hora"
        className="border p-3 rounded-md w-full"
        timeCaption="Horário"
        popperPlacement="bottom-start"
        popperClassName="datepicker-popper"
      />
      {errors.dataHora && (
        <p className="text-sm text-orange-600">Selecione uma data e hora</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-orange-600 text-white rounded-md py-3 font-semibold hover:bg-brand-orange/80 transition border-none"
      >
        {loading ? "Salvando..." : "Agendar"}
      </button>
    </form>
  );
}
