// app/termos/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Termos de Uso | Ricardo Prim Melo",
  description: "Termos, condições e aviso legal.",
};

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#1a1a1a]">
      <Header />

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold">Termos de Uso</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Última atualização: {new Date().toLocaleDateString("pt-PT")}
          </p>

          <div className="mt-8 space-y-8 text-sm leading-relaxed text-neutral-800">
            <Section title="1. Objetivo do serviço">
              <p>
                O serviço prestado é de <strong>Mentoria de Recuperação e Desenvolvimento Humano</strong>,
                com foco em apoio prático, orientação, responsabilização e ferramentas aplicáveis ao dia a dia.
              </p>
            </Section>

            <Section title="2. Aviso importante (não é terapia)">
              <div className="rounded-2xl bg-orange-50 border border-orange-200 p-4 text-orange-900">
                <p className="font-semibold">Aviso / Isenção:</p>
                <p className="mt-2">
                  O serviço prestado por um Mentor de Recuperação e Desenvolvimento Humano não é equivalente a
                  terapia psicológica nem substitui acompanhamento médico/psiquiátrico. Em caso de risco imediato,
                  ideação suicida, ou necessidade clínica, por favor procure serviços de emergência ou profissionais
                  de saúde mental qualificados.
                </p>
              </div>
            </Section>

            <Section title="3. Como funcionam as sessões">
              <ul className="list-disc pl-5 space-y-2">
                <li>Sessões online (Microsoft Teams / plataforma combinada) ou presenciais (quando aplicável).</li>
                <li>Duração típica: aproximadamente 50 minutos (salvo indicação diferente no pacote).</li>
                <li>Podem existir tarefas e exercícios entre sessões para consolidar progresso.</li>
              </ul>
            </Section>

            <Section title="4. Responsabilidade do cliente">
              <ul className="list-disc pl-5 space-y-2">
                <li>O cliente é responsável pelas suas decisões e ações.</li>
                <li>Os resultados podem variar conforme compromisso, contexto e rotina individual.</li>
                <li>Em caso de condição clínica, recomenda-se acompanhamento com profissionais habilitados.</li>
              </ul>
            </Section>

            <Section title="5. Pagamentos, remarcações e cancelamentos">
              <p>
                Formas de pagamento podem incluir transferência, MB WAY e/ou outros métodos acordados.
              </p>

              <div className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="font-semibold text-neutral-900">Política sugerida (ajustável):</p>
                <ul className="mt-2 list-disc pl-5 space-y-2">
                  <li>
                    Remarcações/cancelamentos devem ser feitos com antecedência mínima de{" "}
                    <strong>24 horas</strong>.
                  </li>
                  <li>
                    Cancelamentos fora do prazo podem estar sujeitos a taxa ou contagem da sessão.
                  </li>
                </ul>
                <p className="mt-2 text-xs text-neutral-600">
                  Se você preferir, posso deixar esse trecho como “prazo a combinar” até você confirmar com o Ricardo.
                </p>
              </div>
            </Section>

            <Section title="6. Confidencialidade">
              <p>
                O conteúdo das sessões é tratado como confidencial, exceto em situações de risco grave de dano a si
                ou a terceiros, ou quando houver obrigação legal de comunicação.
              </p>
            </Section>

            <Section title="7. Comunicação e suporte entre sessões">
              <p>
                Caso exista suporte por mensagens, ele será <strong>limitado</strong> conforme o pacote contratado e
                com foco em alinhamentos curtos (não substitui atendimento clínico ou emergência).
              </p>
            </Section>

            <Section title="8. Alterações destes termos">
              <p>
                Estes termos podem ser atualizados para refletir mudanças no serviço. Recomenda-se revisão periódica.
              </p>
            </Section>

            <Section title="9. Contato">
              <p>
                Para dúvidas, agendamento ou suporte, utilize o canal principal informado no site (ex.: botão “Agendar sessão”).
              </p>
            </Section>

            <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Link
                href="/privacidade"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
              >
                Ver Política de Privacidade
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base md:text-lg font-bold text-neutral-900">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function FooterNote() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="max-w-6xl mx-auto px-4 text-xs text-neutral-600">
        Aviso: Mentoria não é terapia psicológica e não substitui acompanhamento médico/psiquiátrico.
        Em caso de emergência, procure serviços competentes na sua região.
      </div>
    </footer>
  );
}

