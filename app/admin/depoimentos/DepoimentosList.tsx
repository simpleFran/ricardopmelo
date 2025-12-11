// app/admin/depoimentos/DepoimentosList.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";

export type DepoimentoItem = {
  id: number;
  nome: string;
  texto: string;
  origem: string | null;
  destaque: boolean;
  ordem: number | null;
  publicado: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export default function DepoimentosList({
  items,
}: {
  items: DepoimentoItem[];
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<DepoimentoItem>>({});
  const [loadingId, setLoadingId] = useState<number | null>(null);

  function startEdit(item: DepoimentoItem) {
    setEditingId(item.id);
    setForm({
      nome: item.nome,
      texto: item.texto,
      origem: item.origem ?? "",
      destaque: item.destaque,
      ordem: item.ordem ?? undefined,
      publicado: item.publicado,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({});
  }

  async function handleSave(id: number) {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/depoimentos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          texto: form.texto,
          origem: form.origem ?? null,
          destaque: form.destaque,
          ordem:
            form.ordem === undefined || form.ordem === null
              ? null
              : Number(form.ordem),
          publicado: form.publicado,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar depoimento");

      toast.success("Depoimento atualizado");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar depoimento");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: number) {
    const ok = window.confirm(
      "Tem certeza que deseja excluir este depoimento?"
    );
    if (!ok) return;

    setLoadingId(id);
    try {
      const res = await fetch(`/api/depoimentos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir depoimento");

      toast.success("Depoimento excluído");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir depoimento");
    } finally {
      setLoadingId(null);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-600">
        Nenhum depoimento cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((d) => {
        const isEditing = editingId === d.id;
        const isBusy = loadingId === d.id;

        if (isEditing) {
          return (
            <article
              key={d.id}
              className="rounded-2xl border border-orange-200 bg-white/90 p-4 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center gap-4">
                <input
                  type="text"
                  value={form.nome ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, nome: e.target.value }))
                  }
                  className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Nome"
                />
                <label className="flex items-center gap-2 text-xs text-neutral-700">
                  <input
                    type="checkbox"
                    checked={!!form.publicado}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        publicado: e.target.checked,
                      }))
                    }
                  />
                  Publicado
                </label>
              </div>

              <textarea
                value={form.texto ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, texto: e.target.value }))
                }
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm min-h-[80px]"
                placeholder="Texto do depoimento"
              />

              <input
                type="text"
                value={form.origem ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, origem: e.target.value }))
                }
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Origem (cidade, online, Instagram, etc.)"
              />

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!form.destaque}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        destaque: e.target.checked,
                      }))
                    }
                  />
                  Destaque
                </label>

                <label className="inline-flex items-center gap-2">
                  <span>Ordem:</span>
                  <input
                    type="number"
                    value={
                      form.ordem === undefined || form.ordem === null
                        ? ""
                        : String(form.ordem)
                    }
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        ordem:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      }))
                    }
                    className="w-20 border border-neutral-200 rounded px-2 py-1 text-xs"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-3 py-1 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(d.id)}
                  disabled={isBusy}
                  className="px-3 py-1 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-500 disabled:opacity-60"
                >
                  {isBusy ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </article>
          );
        }

        return (
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
                {d.destaque && " • destaque"}
              </span>
            </div>
            <p className="text-xs text-neutral-700">“{d.texto}”</p>

            <div className="mt-3 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => startEdit(d)}
                className="px-3 py-1 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(d.id)}
                disabled={isBusy}
                className="px-3 py-1 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
              >
                Excluir
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
