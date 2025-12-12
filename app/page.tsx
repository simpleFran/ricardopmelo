// Next.js + TailwindCSS — Landing Page para Ricardo Prim Melo (Coaching & PNL)
// MVP inicial — totalmente adaptado a partir da landing base da Clínica Dharma
// Estrutura premium, hero com foto, frases motivacionais, seção de inspiração (efeito baralho), serviços, bio, depoimentos, CTA etc.
// OBS: Substitua as imagens reais nos caminhos indicados em cada seção.

"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { InaugurationOverlay } from "./components/InaugurationOverlay";
import AppointmentModal from "@/app/components/AppointmentModal";
import Image from "next/image";
const WHATSAPP_LINK =
  "https://wa.me/+351967246075?text=Quero%20agendar%20uma%20sessao";

export default function LandingRicardo() {
  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#1a1a1a]">
      {/* <AudioPlayer /> */}
      {/* <InaugurationOverlay />  */}
      <Header />
      <Hero />
      <SectionDivider />
      <Quotes />
      <SectionSoft />
      <InspiracaoBaralho />
      <SectionSoft />
      <Servicos />
      <MentorRole />
      <SectionSoft />
      <Sobre />
      <Depoimentos />
      <SectionSoft />
      <CTA />
      <Footer />
    </main>
  );
}

// ============================================================================
// HEADER
// ============================================================================
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo-transparente.png"
            alt="Ricardo Prim Melo Logo"
            className="h-76 w-76 object-contain"
          />
          {/* <span className="font-semibold tracking-tight hidden sm:block">
            Ricardo Prim Melo
          </span> */}
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#servicos" className="hover:opacity-70">
            Serviços
          </a>
          <a href="#mentor" className="hover:opacity-70">
            Acompanhamento
          </a>
          <a href="#sobre" className="hover:opacity-70">
            Sobre
          </a>
          <a href="#contato" className="hover:opacity-70">
            Contato
          </a>
        </nav>

        <div className="hidden md:block">
          <AppointmentModal />
        </div>
      </div>
    </header>
  );
}

// ============================================================================
// HERO
// ============================================================================
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-orange-50" />

      <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="text-xs uppercase tracking-widest text-neutral-600">
            Mentor de Recuperação • Desenvolvimento Humano • Motivação
          </span>

          <h1 className="text-2xl md:text-5xl font-bold leading-tight text-neutral-900">
            Desbloqueie sua mente, transforme sua vida
          </h1>

          <p className="text-neutral-700 text-lg leading-relaxed max-w-lg">
            Olá, sou <strong>Ricardo Prim Melo</strong>, Mentor de Recuperação e
            Desenvolvimento Humano. Acompanho pessoas em fases de recomeço,
            reconstrução e mudança de hábitos, com foco em clareza,
            responsabilidade e propósito. Atendimentos online via Microsoft
            Teams para Brasil, Portugal e comunidade lusófona.
          </p>

          <div className="inline-flex gap-3 flex-wrap">
            <AppointmentModal />
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-white text-orange-700 border border-orange-200 font-semibold shadow-sm hover:bg-orange-50"
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[430px] rounded-3xl shadow-xl overflow-hidden"
        >
          <Image
            src="/images/ricardo/ricardo-prim-melo.png"
            alt="Foto de Ricardo Prim Melo"
            className="w-full h-full object-cover"
            width={200}
            height={200}
          />
        </motion.div>
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <svg
      className="w-full h-16"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,90.7C672,85,768,43,864,42.7C960,43,1056,85,1152,106.7C1248,128,1344,128,1392,128H1440V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
        fill="#faf7f3"
      />
    </svg>
  );
}

function SectionSoft() {
  return (
    <div className="h-10 w-full bg-gradient-to-b from-orange-50 to-white" />
  );
}

// ============================================================================
// O QUE FAZ UM MENTOR – NOVA SEÇÃO
// ============================================================================
function MentorRole() {
  const itens = [
    "Acompanha pessoas em processo de recuperação (álcool, comportamentos aditivos, crises de vida).",
    "Ajuda a definir metas realistas e mensuráveis (curto, médio e longo prazo).",
    "Ensina técnicas práticas para gestão de rotinas, sono, alimentação leve, exercício e redução de gatilhos.",
    "Trabalha ferramentas de responsabilização (checklists, relatórios semanais).",
    "Oferece suporte emocional e escuta estruturada nas fases difíceis.",
    "Facilita transição para emprego/voluntariado, integração social e atividades de propósito.",
    "Reencaminha para serviços clínicos quando necessário (psicologia, psiquiatria, centros locais).",
    "Orienta famílias (quando solicitado) sobre comunicação e limites saudáveis.",
  ];

  return (
    <section id="mentor" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Como funciona o Acompanhamento
      </h2>

      <p className="text-neutral-700 text-lg leading-relaxed mb-8 max-w-3xl">
        A mentoria combina práticas de desenvolvimento humano, gestão pessoal e
        suporte motivacional para ajudar você a retomar equilíbrio, clareza e
        autonomia — sempre com respeito ao seu ritmo e à sua história.
      </p>

      <ul className="grid md:grid-cols-2 gap-6">
        {itens.map((txt, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm"
          >
            <span className="text-orange-600 text-xl mt-1">•</span>
            <p className="text-neutral-700 text-sm leading-relaxed">{txt}</p>
          </li>
        ))}
      </ul>

      {/* Aviso legal */}
      <div className="mt-10 p-5 rounded-2xl bg-orange-50 border border-orange-200 text-sm text-orange-800">
        <strong>Aviso Importante:</strong> Os serviços de mentoria não
        substituem acompanhamento psicológico ou psiquiátrico. Em situações de
        risco, crise emocional severa ou necessidade clínica, procure serviços
        de emergência ou profissionais de saúde mental qualificados.
      </div>
    </section>
  );
}

// ============================================================================
// FRASES MOTIVACIONAIS
// ============================================================================
// ============================================================================
// FRASES / REFLEXÕES VINDAS DO BANCO
// ============================================================================
type ReflexaoPublic = {
  id: number;
  titulo: string;
  texto: string;
  destaque: boolean;
  publicado: boolean;
  ordem: number | null;
};

function Quotes() {
  const [items, setItems] = useState<ReflexaoPublic[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/reflexoes");
        if (!res.ok) throw new Error("Erro ao carregar reflexões");

        const data = (await res.json()) as ReflexaoPublic[];

        if (cancelled) return;

        // só publicadas
        const publicadas = data.filter((r) => r.publicado);

        // ordena: destaque primeiro, depois ordem, depois id
        publicadas.sort((a, b) => {
          if (a.destaque && !b.destaque) return -1;
          if (!a.destaque && b.destaque) return 1;
          if (a.ordem != null && b.ordem != null) return a.ordem - b.ordem;
          if (a.ordem != null) return -1;
          if (b.ordem != null) return 1;
          return a.id - b.id;
        });

        // pega no máximo 3
        setItems(publicadas.slice(0, 3));
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Não foi possível carregar reflexões.");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Reflexões</h2>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {items === null ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm animate-pulse"
            >
              <div className="h-3 w-3/4 bg-neutral-200 rounded mb-3" />
              <div className="h-3 w-full bg-neutral-200 rounded mb-2" />
              <div className="h-3 w-5/6 bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-600">
          Em breve, reflexões do Ricardo aparecerão aqui.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm"
            >
              {q.titulo && (
                <h3 className="text-sm font-semibold mb-2">{q.titulo}</h3>
              )}
              <p className="text-neutral-700 italic text-sm whitespace-pre-line">
                “{q.texto}”
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// SEÇÃO INSPIRAÇÃO — EFEITO "BARALHO"
// ============================================================================
function InspiracaoBaralho() {
  const imgs = [
    "/images/ricardo/insp1.jpg",
    "/images/ricardo/insp2.jpg",
    "/images/ricardo/insp3.jpg",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((p) => (p + 1) % imgs.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        Momentos & Inspiração
      </h2>

      <div className="relative w-full h-[420px] flex items-center justify-center opacity-90">
        <AnimatePresence>
          {imgs.map((src, i) => {
            const offset = (i - index + imgs.length) % imgs.length;
            const active = offset === 0;

            return (
              <motion.div
                key={src}
                className="absolute w-[60%] max-w-md aspect-[3/4] bg-cover bg-center rounded-3xl shadow-xl"
                style={{ backgroundImage: `url(${src})` }}
                animate={{
                  rotate: offset === 0 ? 0 : offset === 1 ? 8 : -8,
                  x: offset === 0 ? 0 : offset === 1 ? 130 : -130,
                  scale: active ? 1 : 0.9,
                  opacity: active ? 1 : 0,
                  zIndex: active ? 3 : 1,
                }}
                transition={{ duration: 1.4 }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// SERVIÇOS
// ============================================================================
function Servicos() {
  const servs = [
    {
      t: "Acompanhamento",
      d: "Acompanha pessoas em processo de recuperação (álcool, comportamentos aditivos, crises de vida).",
    },
    {
      t: "Gestão Pessoal",
      d: "Ensina técnicas práticas para gestão de rotinas, sono, alimentação leve, exercício e redução de gatilhos.",
    },
    {
      t: "Acompanhamento Motivacional",
      d: "Ajuda a definir metas realistas e mensuráveis (curto, médio e longo prazo).",
    },
    {
      t: "Coaching de Vida",
      d: "Trabalha ferramentas de responsabilização (checklists, relatórios semanais).",
    },
    {
      t: "Suporte Emocional",
      d: "Dá suporte emocional e escuta estruturada nas fases difíceis.",
    },
    {
      t: "Integração Social",
      d: "Facilita transição para emprego/voluntariado, integração social e atividades de propósito.",
    },
    {
      t: "Desenvolvimento de Habilidades",
      d: "Reencaminha para serviços clínicos quando necessário (psicologia, psiquiatria, centros locais).",
    },
    {
      t: "Apoio Familiar",
      d: " Acompanha famílias (quando solicitado) para orientar comunicação e limites saudáveis.",
    },
  ];

  return (
    <section
      id="servicos"
      className="max-w-6xl mx-auto px-4 py-16 scroll-mt-24"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Serviços</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {servs.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-6"
          >
            <h3 className="font-semibold text-lg mb-2">{s.t}</h3>
            <p className="text-neutral-700 text-sm">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// SOBRE
// ============================================================================
function Sobre() {
  return (
    <section id="sobre" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-12">
      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre Ricardo</h2>
          <p className="text-neutral-700 leading-relaxed">
            Sou <strong>Ricardo Prim Melo</strong>, habilitado em Programação
            Neurolinguística e apaixonado por desenvolvimento humano. Minha
            missão é acompanhar pessoas em processos de recuperação, mudança de
            hábitos e reorganização de vida, ajudando a ganhar clareza,
            autonomia e sentido no dia a dia.
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Atendimentos online via Microsoft Teams",
              "Abordagem humana, respeitosa e estruturada",
              "Ferramentas práticas para aplicar entre uma sessão e outra",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-600" />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden shadow-xl h-[420px]"
        >
          <img
            src="/images/ricardo/brand-ricardo.jpg"
            className="w-full h-full object-cover rounded-3xl"
            alt="Ricardo"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// DEPOIMENTOS VINDOS DO BANCO
// ============================================================================
type DepoimentoPublic = {
  id: number;
  nome: string;
  texto: string;
  origem: string | null;
  destaque: boolean;
  publicado: boolean;
  ordem: number | null;
};

function Depoimentos() {
  const [items, setItems] = useState<DepoimentoPublic[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/depoimentos");
        if (!res.ok) throw new Error("Erro ao carregar depoimentos");

        const data = (await res.json()) as DepoimentoPublic[];

        if (cancelled) return;

        const publicos = data.filter((d) => d.publicado);

        publicos.sort((a, b) => {
          if (a.destaque && !b.destaque) return -1;
          if (!a.destaque && b.destaque) return 1;
          if (a.ordem != null && b.ordem != null) return a.ordem - b.ordem;
          if (a.ordem != null) return -1;
          if (b.ordem != null) return 1;
          return a.id - b.id;
        });

        setItems(publicos.slice(0, 3));
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Não foi possível carregar depoimentos.");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Depoimentos</h2>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {items === null ? (
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm animate-pulse"
            >
              <div className="h-3 w-1/3 bg-neutral-200 rounded mb-3" />
              <div className="h-3 w-full bg-neutral-200 rounded mb-2" />
              <div className="h-3 w-5/6 bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-neutral-600">
          Assim que os primeiros depoimentos forem cadastrados, aparecerão aqui.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((d) => (
            <div
              key={d.id}
              className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm"
            >
              <div className="text-orange-600 mb-2">★★★★★</div>
              <p className="text-neutral-700 text-sm mb-4">“{d.texto}”</p>
              <div className="text-sm font-semibold">{d.nome}</div>
              {d.origem && (
                <div className="text-xs text-neutral-500">{d.origem}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// CTA FINAL
// ============================================================================
function CTA() {
  return (
    <section id="contato" className="max-w-6xl mx-auto px-4 py-20 scroll-mt-12">
      <div className="rounded-3xl bg-white border border-neutral-200 p-10 text-center shadow-sm">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Quer dar um próximo passo com segurança?
        </h3>
        <p className="text-neutral-700 mb-6">
          Agende uma conversa inicial para entender sua fase, seus desafios e
          ver se a mentoria faz sentido para você neste momento.
        </p>

        <a
          href={WHATSAPP_LINK}
          className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md hover:opacity-90"
        >
          <Phone className="h-5 w-5" /> Agendar sessão
        </a>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER (atualizado com aviso legal resumido)
// ============================================================================
function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        {/* Aviso curto */}
        <p className="text-[11px] leading-relaxed text-neutral-500 text-center md:text-left">
          Aviso: Os serviços prestados por Ricardo Prim Melo como Mentor de
          Recuperação e Desenvolvimento Humano são de natureza educacional e
          motivacional, e não substituem acompanhamento psicológico, médico ou
          psiquiátrico. Em situações de emergência ou risco, procure serviços de
          saúde ou de emergência na sua região.{" "}
          <a href="/aviso-legal" className="underline hover:text-neutral-700">
            Leia o aviso legal completo.
          </a>
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-neutral-600 gap-3">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Ricardo Prim Melo — Todos os direitos
            reservados.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:opacity-70 inline-flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href="#"
              className="hover:opacity-70 inline-flex items-center gap-2"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a
              href="#"
              className="hover:opacity-70 inline-flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" /> Localização
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
