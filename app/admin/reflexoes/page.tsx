// app/admin/reflexoes/page.tsx
import { prisma } from "@/lib/prisma";
import { Quote } from "lucide-react";
import ReflexoesForm from "./ReflexoesForm";
import ReflexoesList, { ReflexaoItem } from "./ReflexoesList";

export const dynamic = "force-dynamic";

export default async function ReflexoesPage() {
  const reflexoes = await prisma.reflexao.findMany({
    orderBy: [{ ordem: "asc" }, { createdAt: "desc" }],
  });

  // pequena adaptação para o tipo do client component
  const items: ReflexaoItem[] = reflexoes.map((r) => ({
    ...r,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Quote className="w-6 h-6 text-orange-600" />
          <h1 className="text-2xl font-bold">Reflexões</h1>
        </div>
        <span className="text-xs text-neutral-600">
          {items.length} {items.length === 1 ? "registro" : "registros"}
        </span>
      </header>

      <section className="mb-8">
        <ReflexoesForm />
      </section>

      <section>
        <ReflexoesList items={items} />
      </section>
    </div>
  );
}
