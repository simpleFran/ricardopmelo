import Link from "next/link";

// app/aviso-legal/page.tsx
export const metadata = {
  title: "Aviso Legal e Termos de Responsabilidade | Ricardo Prim Melo",
  description:
    "Aviso legal sobre a natureza do serviço de mentoria e termos de responsabilidade.",
};

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#1a1a1a]">
      <section className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        <p className="text-sm text-neutral-600 mb-6">
          <Link href="/" className="underline hover:text-neutral-800">
            ← Voltar ao site
          </Link>
        </p>

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Aviso Legal e Termos de Responsabilidade
        </h1>

        <div className="space-y-6 text-sm md:text-base leading-relaxed text-neutral-800">
          <section>
            <h2 className="font-semibold mb-2">1. Natureza dos Serviços</h2>
            <p>
              Os serviços prestados por Ricardo Prim Melo na qualidade de{" "}
              <strong>Mentor de Recuperação e Desenvolvimento Humano</strong>{" "}
              têm caráter educacional, motivacional e de apoio ao
              desenvolvimento pessoal. Não se tratam de serviços de
              psicoterapia, nem de qualquer forma de atendimento médico,
              psiquiátrico ou psicológico.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              2. Ausência de Relação Terapêutica
            </h2>
            <p>
              Embora possam ser abordados temas emocionais, comportamentais ou
              relacionados a hábitos e bem-estar, o acompanhamento oferecido{" "}
              <strong>não configura</strong> diagnóstico clínico, tratamento de
              transtornos mentais ou prescrição de medicamentos. Qualquer
              necessidade desse tipo deve ser acompanhada por profissionais
              devidamente credenciados (psicólogos, psiquiatras, médicos ou
              serviços de saúde).
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              3. Situações de Urgência e Risco
            </h2>
            <p>
              Em casos de crise aguda, risco à integridade física, ideação
              suicida ou qualquer situação de emergência, o cliente deve{" "}
              <strong>procurar imediatamente</strong>:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Serviços de emergência (112 em Portugal, 192 no Brasil);</li>
              <li>Linhas de apoio emocional ou prevenção ao suicídio;</li>
              <li>
                Atendimento em hospitais, CAPS, centros de saúde ou
                profissionais de saúde mental.
              </li>
            </ul>
            <p className="mt-2">
              A mentoria não se destina a gerir crises clínicas ou substituir
              serviços especializados em saúde.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              4. Responsabilidade do Cliente
            </h2>
            <p>
              O cliente permanece responsável por suas escolhas, decisões e
              ações ao longo do processo de mentoria. O papel do mentor é
              oferecer orientação, reflexão, ferramentas práticas e suporte, mas
              a implementação das sugestões e o uso das informações fornecidas
              são de responsabilidade exclusiva do cliente.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">5. Encaminhamentos</h2>
            <p>
              Sempre que identificado que a situação do cliente exige
              acompanhamento psicológico, psiquiátrico ou médico, o mentor
              poderá sugerir, de forma clara, que o cliente busque profissionais
              ou serviços adequados. A decisão de seguir ou não essa sugestão
              cabe ao cliente.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">6. Confidencialidade</h2>
            <p>
              As informações compartilhadas durante as sessões são tratadas com
              sigilo e respeito. No entanto, em situações de risco iminente à
              vida ou integridade do próprio cliente ou de terceiros, o mentor
              poderá, dentro de suas possibilidades, incentivar e orientar a
              busca de apoio emergencial, podendo também indicar a necessidade
              de envolvimento de terceiros ou serviços competentes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">
              7. Atualizações deste Aviso Legal
            </h2>
            <p>
              Este aviso legal e termos de responsabilidade podem ser
              atualizados periodicamente para refletir ajustes na forma de
              atuação ou nas exigências legais aplicáveis. A versão mais recente
              estará sempre disponível nesta página.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">8. Concordância</h2>
            <p>
              Ao agendar uma sessão ou participar de qualquer forma de
              acompanhamento oferecido por Ricardo Prim Melo, o cliente declara
              estar ciente e de acordo com os termos aqui apresentados.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
