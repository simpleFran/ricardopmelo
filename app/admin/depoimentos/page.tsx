// app/admin/depoimentos/page.tsx
import { prisma } from "@/lib/prisma";
import { MessageCircle } from "lucide-react";
import DepoimentosForm from "./DepoimentosForm";
import DepoimentosList, { DepoimentoItem } from "./DepoimentosList";

export const dynamic = "force-dynamic";

export default async function DepoimentosPage() {
  const depoimentos = await prisma.depoimento.findMany({
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  const items: DepoimentoItem[] = depoimentos.map((d) => ({
    ...d,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold">Depoimentos</h1>
        </div>
        <span className="text-xs text-neutral-600">
          {items.length} {items.length === 1 ? "registro" : "registros"}
        </span>
      </header>

      <section className="mb-8">
        <DepoimentosForm />
      </section>

      <section>
        <DepoimentosList items={items} />
      </section>
    </div>
  );
}
