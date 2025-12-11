// app/admin/leads/page.tsx
import { prisma } from "@/lib/prisma";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold">Pessoas (Leads)</h1>
        </div>
        <span className="text-xs text-neutral-600">
          {leads.length} {leads.length === 1 ? "registro" : "registros"}
        </span>
      </header>

      {leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-600">
          Nenhum lead cadastrado ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <div className="text-sm font-semibold">
                  {lead.nome || "Sem nome"}
                </div>
                <div className="text-xs text-neutral-600">
                  {lead.email || "Sem e-mail"}
                </div>
                <div className="text-xs text-neutral-600">{lead.telefone}</div>
              </div>
              <div className="text-[11px] text-neutral-500">
                Criado em{" "}
                {new Intl.DateTimeFormat("pt-PT", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(lead.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
