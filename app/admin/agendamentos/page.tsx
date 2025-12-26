// app/admin/agendamentos/page.tsx

import { prisma } from "@/lib/prisma";
import formatLisbonDateTime from "@/lib/time";
import { Calendar, Phone, User2 } from "lucide-react";
import type { Agendamento, Lead } from "@prisma/client";

export const dynamic = "force-dynamic";

// Tipo Agendamento com o lead vinculado
type AgendaItem = Agendamento & {
  lead: Lead | null;
};

export default async function AgendaPage() {
  const agendamentos = await prisma.agendamento.findMany({
    include: { lead: true },
    orderBy: { dataHora: "asc" },
  });

  const grouped: {
    [key: string]: {
      dateLabel: string;
      items: AgendaItem[];
    };
  } = {};

  for (const ag of agendamentos) {
    const { dateLabel, dateKey } = formatLisbonDateTime(ag.dataHora);

    // cria grupo se não existir
    if (!grouped[dateKey]) {
      grouped[dateKey] = { dateLabel, items: [] };
    }

    grouped[dateKey].items.push(ag as AgendaItem);
  }

  const days = Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));

  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#1a1a1a]">
      <section className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-600" />
              Agendamentos
            </h1>
            <p className="text-sm text-neutral-700 mt-1">
              Horários convertidos para o fuso de Lisboa.
            </p>
          </div>
        </header>

        {days.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-600">
            Nenhum agendamento encontrado.
          </div>
        )}

        <div className="space-y-6">
          {days.map(([key, day]) => (
            <DayBlock key={key} dateLabel={day.dateLabel} items={day.items} />
          ))}
        </div>
      </section>
    </main>
  );
}

function DayBlock({
  dateLabel,
  items,
}: {
  dateLabel: string;
  items: AgendaItem[];
}) {
  return (
    <section className="rounded-3xl bg-white/80 border border-neutral-200 shadow-sm">
      <div className="border-b border-neutral-200 px-5 py-3 flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold capitalize">
          {dateLabel}
        </h2>
        <span className="text-xs text-neutral-500">
          {items.length} {items.length === 1 ? "agendamento" : "agendamentos"}
        </span>
      </div>

      <div className="divide-y divide-neutral-100">
        {items.map((ag) => {
          const { timeLabel } = formatLisbonDateTime(ag.dataHora);

          const statusColor =
            ag.status === "confirmado"
              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
              : ag.status === "cancelado"
              ? "bg-red-100 text-red-700 border-red-200"
              : "bg-amber-50 text-amber-700 border-amber-200";

          return (
            <div
              key={ag.id}
              className="px-5 py-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="text-sm font-semibold text-orange-700">
                  {timeLabel}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <User2 className="w-4 h-4 text-neutral-500" />
                    <span className="font-semibold text-sm">
                      {ag.lead?.nome ?? "Sem nome"}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-neutral-600">
                    {ag.servico}
                  </div>
                  {ag.nota && (
                    <p className="mt-1 text-xs text-neutral-500">
                      Nota: {ag.nota}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 text-xs">
                {ag.lead?.telefone && (
                  <div className="inline-flex items-center gap-1 text-neutral-600">
                    <Phone className="w-3 h-3" />{" "}
                    <span>{ag.lead.telefone}</span>
                  </div>
                )}

                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-medium ${statusColor}`}
                >
                  {ag.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
