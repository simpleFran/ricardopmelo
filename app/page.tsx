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
import AudioPlayer from "./components/AudioPlayer";
import { InaugurationOverlay } from "./components/InaugurationOverlay";

const WHATSAPP_LINK =
  "https://wa.me/XXXXXXXXXX?text=Quero%20agendar%20uma%20sessao";

export default function LandingRicardo() {
  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#1a1a1a]">
      {/* <AudioPlayer /> */}
      <InaugurationOverlay /> {/* AQUI: sobre tudo */}
      <Header />
      <Hero />
      <SectionDivider />
      <Quotes />
      <SectionSoft />
      <InspiracaoBaralho />
      <SectionSoft />
      <Servicos />
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
          <a href="#sobre" className="hover:opacity-70">
            Sobre
          </a>
          <a href="#contato" className="hover:opacity-70">
            Contato
          </a>
        </nav>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          className="hidden md:inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-orange-600 text-white font-medium shadow hover:opacity-90"
        >
          Agendar sessão
        </a>
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
            Mentoria de Recuperação • Desenvolvimento Humano • Motivação
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-900">
            Desbloqueie sua mente, transforme sua vida
          </h1>

          <p className="text-neutral-700 text-lg leading-relaxed max-w-lg">
            Olá, sou <strong>Ricardo Prim Melo</strong>, especialista em
            Mentoria de Recuperação, Desenvolvimento Humano e Motivação. Ajudo pessoas a
            reencontrarem clareza, força interior e propósito. Atendimentos
            online via Zoom.
          </p>

          <a
            href={WHATSAPP_LINK}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-orange-600 text-white font-semibold shadow-lg hover:opacity-95"
          >
            Agendar sessão <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[430px] rounded-3xl shadow-xl overflow-hidden"
        >
          <img
            src="/images/ricardo/ricardo-prim-melo.png"
            alt="Foto de Ricardo Prim Melo"
            className="w-full h-full object-cover"
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
// FRASES MOTIVACIONAIS
// ============================================================================
function Quotes() {
  const fr = [
    "A solução é mais simples do que imaginamos.",
    "Uma fé sem obras é uma fé morta.",
    "A melhor maneira de se encontrar é se perder no serviço aos outros. — Mahatma Gandhi",
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Reflexões</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {fr.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm"
          >
            <p className="text-neutral-700 italic">“{q}”</p>
          </motion.div>
        ))}
      </div>
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
    }
    ,{
      t: "Apoio Familiar",
      d: " Acompanha famílias (quando solicitado) para orientar comunicação e limites saudáveis.",
    },
  ];

  return (
    <section id="servicos" className="max-w-6xl mx-auto px-4 py-16">
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
    <section id="sobre" className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre Ricardo</h2>
          <p className="text-neutral-700 leading-relaxed">
            Sou <strong>Ricardo Prim Melo</strong>, profissional de Coaching e
            Programação Neurolinguística apaixonado por desenvolvimento humano.
            Minha missão é ajudar você a desbloquear seu potencial, superar
            bloqueios internos e reencontrar propósito.
          </p>

          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Atendimentos online via Zoom",
              "Processo humano e empático",
              "Ferramentas práticas para o dia a dia",
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
// DEPOIMENTOS
// ============================================================================
function Depoimentos() {
  const itens = [
    {
      n: "Aline M.",
      t: "Encontrei clareza que eu buscava há anos. Recomendo demais!",
    },
    {
      n: "Jorge R.",
      t: "Mudança profunda nas minhas crenças e objetivos. Gratidão!",
    },
    {
      n: "Patrícia S.",
      t: "Ricardo tem uma energia única. Me ajudou num momento decisivo.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Depoimentos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {itens.map((i) => (
          <motion.div
            key={i.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm"
          >
            <div className="text-orange-600 mb-2">★★★★★</div>
            <p className="text-neutral-700 text-sm mb-4">“{i.t}”</p>
            <div className="font-semibold text-sm">{i.n}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// CTA FINAL
// ============================================================================
function CTA() {
  return (
    <section id="contato" className="max-w-6xl mx-auto px-4 py-20">
      <div className="rounded-3xl bg-white border border-neutral-200 p-10 text-center shadow-sm">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Pronto para sua transformação?
        </h3>
        <p className="text-neutral-700 mb-6">
          Dê o primeiro passo. Agende sua sessão agora mesmo.
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
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-600 gap-3">
        © {new Date().getFullYear()} Ricardo Prim Melo — Todos os direitos
        reservados.
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
    </footer>
  );
}
