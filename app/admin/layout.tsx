// app/admin/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import { Calendar, Users, Quote, MessageCircle } from "lucide-react";
import {Toaster} from 'sonner'
export const metadata = {
  title: "Admin • Ricardo Prim Melo",
};

const navItems = [
  {
    href: "/admin/leads",
    label: "Pessoas",
    icon: Users,
  },
  {
    href: "/admin/agendamentos",
    label: "Agenda",
    icon: Calendar,
  },
  {
    href: "/admin/reflexoes",
    label: "Reflexões",
    icon: Quote,
  },
  {
    href: "/admin/depoimentos",
    label: "Depoimentos",
    icon: MessageCircle,
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#faf7f3] text-[#1a1a1a]">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-64 border-r border-neutral-200 bg-white/90">
            <div className="h-20 flex items-center px-6 border-b border-neutral-200">
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  Painel do Ricardo
                </div>
                <div className="text-xs text-neutral-500">
                  Administração básica
                </div>
              </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => (
                <SidebarLink key={item.href} {...item} />
              ))}
            </nav>

            <div className="px-4 py-3 text-[11px] text-neutral-500 border-t border-neutral-200">
              v0.1 • uso interno
            </div>
          </aside>

          {/* Versão mobile: topo simples */}
          <div className="md:hidden w-full border-b border-neutral-200 bg-white/90">
            <div className="h-14 flex items-center justify-between px-4">
              <span className="text-sm font-semibold">Painel do Ricardo</span>
              {/* Poderia virar um menu hamburger no futuro */}
              <span className="text-[11px] text-neutral-500">Admin</span>
            </div>
          </div>

          {/* Conteúdo */}
          <main className="flex-1">
            {children}
            <Toaster richColors position="top-center" />
          </main>
        </div>
      </body>
    </html>
  );
}

type SidebarItemProps = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

function SidebarLink({ href, label, icon: Icon }: SidebarItemProps) {
  // por enquanto, sem active state real (daria pra usar usePathname)
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-neutral-700 hover:bg-orange-50 hover:text-orange-700 transition"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
}
