import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminBloqueadoPage() {
  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#1a1a1a] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-2">Acesso restrito</h1>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Esta área é privada. Para acessar, utilize a URL com a chave correta.
        </p>

        <div className="mt-4 rounded-2xl bg-neutral-50 border border-neutral-200 p-3 text-xs text-neutral-600">
          Ex.: <span className="font-mono">/admin?key=********</span>
        </div>

        <Link
          href="/"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
        >
          Voltar ao site
        </Link>
      </div>
    </main>
  );
}
