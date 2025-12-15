// app/privacidade/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade | Ricardo Prim Melo",
  description: "Como os seus dados são tratados e protegidos.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#1a1a1a]">
      <Header />

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold">
            Política de Privacidade
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Última atualização: {new Date().toLocaleDateString("pt-PT")}
          </p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-800">
            <Section title="1. Quais dados podem ser recolhidos">
              <ul className="list-disc pl-5 space-y-2">
                <li>Nome</li>
                <li>E-mail (quando fornecido)</li>
                <li>Telefone/WhatsApp</li>
                <li>Serviço selecionado</li>
                <li>Data e hora do agendamento</li>
                <li>Observações/nota (quando preenchida)</li>
              </ul>
            </Section>

            <Section title="2. Para que usamos os dados">
              <ul className="list-disc pl-5 space-y-2">
                <li>Responder pedidos de contato e agendamentos</li>
                <li>Organizar agenda e atender o serviço solicitado</li>
                <li>
                  Comunicação operacional (confirmações, alterações e suporte)
                </li>
                <li>Cumprimento de obrigações legais quando aplicável</li>
              </ul>
            </Section>

            <Section title="3. Base legal (contexto UE / Portugal)">
              <p>
                Os dados são tratados com base no consentimento do titular
                (quando aplicável) e/ou na necessidade de execução de
                diligências pré-contratuais/contratuais relacionadas ao
                agendamento e prestação do serviço.
              </p>
            </Section>

            <Section title="4. Partilha de dados">
              <p>
                Não vendemos dados. A partilha pode ocorrer apenas quando
                necessária para prestação do serviço (ex.: ferramentas de
                agenda/comunicação) ou por obrigação legal.
              </p>
            </Section>

            <Section title="5. Retenção">
              <p>
                Mantemos os dados apenas pelo tempo necessário para as
                finalidades acima, ou por exigência legal.
              </p>
            </Section>

            <Section title="6. Segurança">
              <p>
                Adotamos medidas técnicas e organizacionais razoáveis para
                proteger os dados. Ainda assim, nenhum sistema é 100% imune a
                incidentes.
              </p>
            </Section>

            <Section title="7. Direitos do titular">
              <ul className="list-disc pl-5 space-y-2">
                <li>Acesso, retificação e atualização</li>
                <li>Eliminação (quando aplicável)</li>
                <li>Limitação/oposição ao tratamento (quando aplicável)</li>
                <li>Portabilidade (quando aplicável)</li>
              </ul>
              <p className="mt-2">
                Para exercer direitos, entre em contato pelo canal principal
                informado no site.
              </p>
            </Section>

            <Section title="8. Cookies">
              <p>
                O site pode utilizar cookies/tecnologias similares para
                funcionamento e experiência. Se você adicionar analytics no
                futuro, podemos atualizar esta política.
              </p>
            </Section>

            <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Link
                href="/termos"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Ver Termos de Uso
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 text-white px-4 py-2 text-sm font-semibold hover:opacity-95"
              >
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FooterNote />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-sm text-neutral-800">
          Ricardo Prim Melo
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/termos" className="hover:opacity-70">
            Termos
          </Link>
          <Link href="/privacidade" className="hover:opacity-70">
            Privacidade
          </Link>
        </div>
      </div>
    </header>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base md:text-lg font-bold text-neutral-900">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function FooterNote() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="max-w-6xl mx-auto px-4 text-xs text-neutral-600">
        Aviso: Mentoria não é terapia psicológica e não substitui acompanhamento
        médico/psiquiátrico. Em caso de emergência, procure serviços competentes
        na sua região.
      </div>
    </footer>
  );
}
