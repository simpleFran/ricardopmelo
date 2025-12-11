// app/admin/depoimentos/DepoimentosForm.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function DepoimentosForm() {
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [origem, setOrigem] = useState("");
  const [destaque, setDestaque] = useState(false);
  const [ordem, setOrdem] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/depoimentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          texto,
          origem: origem || null,
          destaque,
          ordem: ordem ? Number(ordem) : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao salvar depoimento");
      }

      toast.success("Depoimento criado com sucesso");

      setNome("");
      setTexto("");
      setOrigem("");
      setDestaque(false);
      setOrdem("");

      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao criar depoimento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-neutral-200 bg-white/90 p-4 shadow-sm space-y-3"
    >
      <h2 className="text-sm font-semibold mb-1">Novo depoimento</h2>

      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome da pessoa"
        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
      />

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Texto do depoimento..."
        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm min-h-[80px]"
      />

      <input
        type="text"
        value={origem}
        onChange={(e) => setOrigem(e.target.value)}
        placeholder="Origem (cidade, online, Instagram, etc.)"
        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
      />

      <div className="flex flex-wrap items-center gap-3 text-xs">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={destaque}
            onChange={(e) => setDestaque(e.target.checked)}
          />
          Marcar como destaque
        </label>

        <label className="inline-flex items-center gap-2">
          <span>Ordem:</span>
          <input
            type="number"
            value={ordem}
            onChange={(e) => setOrdem(e.target.value)}
            className="w-20 border border-neutral-200 rounded px-2 py-1 text-xs"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl bg-orange-600 text-white text-sm font-medium px-4 py-2 hover:bg-orange-500 disabled:opacity-60"
      >
        {loading ? "Salvando..." : "Salvar depoimento"}
      </button>
    </form>
  );
}
