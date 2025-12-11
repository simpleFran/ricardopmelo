// app/admin/depoimentos/page.tsx
import { prisma } from "@/lib/prisma";
import { MessageCircle } from "lucide-react";
import DepoimentosForm from "./DepoimentosForm";

export const dynamic = "force-dynamic";

export default async function DepoimentosPage() {
  const depoimentos = await prisma.depoimento.findMany({
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold">Depoimentos</h1>
        </div>
        <span className="text-xs text-neutral-600">
          {depoimentos.length}{" "}
          {depoimentos.length === 1 ? "registro" : "registros"}
        </span>
      </header>

      <section className="mb-8">
        <DepoimentosForm />
      </section>

      <section className="space-y-3">
        {depoimentos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-600">
            Nenhum depoimento cadastrado ainda.
          </div>
        ) : (
          depoimentos.map((d) => (
            <article
              key={d.id}
              className="rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm"
            >
              <div className="flex justify-between gap-4 mb-1">
                <h2 className="text-sm font-semibold">{d.nome}</h2>
                <span className="text-[10px] text-neutral-500">
                  {d.publicado ? "Publicado" : "Rascunho"}
                  {d.origem && ` • ${d.origem}`}
                  {typeof d.ordem === "number" && ` • ordem ${d.ordem}`}
                </span>
              </div>
              <p className="text-xs text-neutral-700">“{d.texto}”</p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
