// app/admin/page.tsx
import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Bem-vindo ao painel, Ricardo
      </h1>
      <p className="text-sm text-neutral-700 mb-8 max-w-xl">
        Aqui você acompanha seus agendamentos, pessoas que passaram por
        atendimento e, em breve, reflexões e depoimentos.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <AdminCard
          title="Agenda"
          description="Veja seus horários organizados por dia, com detalhes de cada pessoa."
          href="/admin/agendamentos"
        />
        <AdminCard
          title="Pessoas (Leads)"
          description="Lista das pessoas que já fizeram contato ou agendamento."
          href="/admin/leads"
        />
      </div>
    </div>
  );
}

function AdminCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition"
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-neutral-700">{description}</p>
    </Link>
  );
}
