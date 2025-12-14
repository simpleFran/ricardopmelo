// app/admin/layout.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf7f3] text-[#1a1a1a]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-4 h-fit md:sticky md:top-6">
            <div className="mb-4">
              <div className="text-sm text-neutral-500">Painel</div>
              <div className="text-lg font-bold">Admin</div>
            </div>

            <nav className="space-y-2">
              <AdminNavItem href="/admin/leads" label="Pessoas (Leads)" />
              <AdminNavItem href="/admin/agendamentos" label="Agenda" />
              <AdminNavItem href="/admin/reflexoes" label="Reflexões" />
              <AdminNavItem href="/admin/depoimentos" label="Depoimentos" />
            </nav>

            <div className="mt-6 pt-4 border-t border-neutral-200">
              <Link
                href="/"
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                ← Voltar ao site
              </Link>
            </div>
          </aside>

          {/* Content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

function AdminNavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium hover:bg-neutral-50 transition"
    >
      {label}
    </Link>
  );
}
