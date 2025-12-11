// app/admin/reflexoes/page.tsx
import { prisma } from "@/lib/prisma";
import { Quote } from "lucide-react";
import ReflexoesForm from "./ReflexoesForm";

export const dynamic = "force-dynamic";

export default async function ReflexoesPage() {
  const reflexoes = await prisma.reflexao.findMany({
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Quote className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold">Reflexões</h1>
        </div>
        <span className="text-xs text-neutral-600">
          {reflexoes.length} {reflexoes.length === 1 ? "registro" : "registros"}
        </span>
      </header>

      {/* Form de criação */}
      <section className="mb-8">
        <ReflexoesForm />
      </section>

      {/* Lista */}
      <section className="space-y-3">
        {reflexoes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-600">
            Nenhuma reflexão cadastrada ainda.
          </div>
        ) : (
          reflexoes.map((r) => (
            <article
              key={r.id}
              className="rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm"
            >
              <div className="flex justify-between gap-4 mb-1">
                <h2 className="text-sm font-semibold">{r.titulo}</h2>
                <span className="text-[10px] text-neutral-500">
                  {r.publicado ? "Publicado" : "Rascunho"}
                  {typeof r.ordem === "number" && ` • ordem ${r.ordem}`}
                </span>
              </div>
              <p className="text-xs text-neutral-700 whitespace-pre-line">
                {r.texto}
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
