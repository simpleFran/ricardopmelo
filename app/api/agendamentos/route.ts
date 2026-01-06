import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function stripQuotes(v?: string) {
  if (!v) return v;
  return v.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
}

function buildWhatsAppLink(base: string, message: string) {
  const cleanBase = base.split("?")[0].replace(/\/$/, "");
  return `${cleanBase}?text=${encodeURIComponent(message)}`;
}

function renderPedidoAgendamentoEmail({
  nome,
  whatsappLink,
}: {
  nome: string;
  whatsappLink: string;
}) {
  const subject = `Pedido de Avaliação Inicial — ${nome}`;

  const html = `
  <div style="background:#faf7f3;padding:24px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:20px;overflow:hidden;">
      <div style="padding:22px 22px 14px 22px;border-bottom:1px solid #f0f0f0;">
        <div style="font-size:14px;color:#6b7280;">Ricardo Prim Melo</div>
        <div style="font-size:20px;font-weight:700;color:#111827;margin-top:6px;">
          Pedido de Avaliação Inicial
        </div>
      </div>

      <div style="padding:22px;color:#111827;font-size:15px;line-height:1.6;">
        <p>Olá ${nome},</p>

        <p>
          Obrigado por contactares. Para agendarmos a
          <strong>avaliação inicial (60–75 min)</strong>, indica por favor os teus
          <strong>3 horários preferidos na próxima semana</strong> e a tua
          disponibilidade <strong>online/presencial</strong>.
        </p>

        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:16px;padding:14px;margin:18px 0;">
          <strong>Responde com:</strong>
          <ul>
            <li>3 horários preferidos</li>
            <li>Online / Presencial</li>
          </ul>
        </div>

        <a href="${whatsappLink}"
           style="display:inline-block;background:#ea580c;color:#fff;padding:12px 16px;border-radius:14px;font-weight:700;">
          Responder pelo WhatsApp
        </a>

        <p style="margin-top:18px;">
          Abraço,<br/>
          <strong>Ricardo Prim Melo</strong>
        </p>
      </div>
    </div>
  </div>
  `;

  const text = `Olá ${nome},

Para agendarmos a avaliação inicial, envia por favor:
- 3 horários preferidos
- Online ou Presencial

WhatsApp:
${whatsappLink}
`;

  return { subject, html, text };
}

// ---------------------------------------------------------------------------
// handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Payload recebido em /api/agendamentos:", body);

    const {
      email,
      nome,
      telefone,
      servico,
      dataHora,
      status,
      nota,
      preferencias,
      modalidade,
    } = body;

    if (!nome || !telefone || !servico) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando." },
        { status: 400 }
      );
    }

    // normaliza telefone
    const telefoneLimpo = String(telefone).replace(/\D/g, "");

    // upsert lead
    const lead = await prisma.lead.upsert({
      where: { telefone: telefoneLimpo },
      update: { nome, email },
      create: { telefone: telefoneLimpo, nome, email },
    });

    const dataHoraDate = dataHora ? new Date(dataHora) : null;

    // cria agendamento (OPERAÇÃO CRÍTICA)
    const agendamento = await prisma.agendamento.create({
      data: {
        leadId: lead.id,
        servico,
        dataHora: dataHoraDate,
        status: status ?? "pedido",
        nota: nota ?? null,
        preferencias: preferencias ?? null,
        modalidade: modalidade ?? null,
      },
    });

    // -----------------------------------------------------------------------
    // side-effects (emails) — NÃO QUEBRAM O FLUXO
    // -----------------------------------------------------------------------

    const whatsappBase =
      stripQuotes(process.env.WHATSAPP_LINK) || "https://wa.me/351967246075";

    const message = `Olá Ricardo, sou ${nome}.

Meus horários:
${preferencias ?? "-"}

Disponibilidade: ${modalidade ?? "-"}`;

    const whatsappLink = buildWhatsAppLink(whatsappBase, message);

    const from =
      stripQuotes(process.env.MAIL_FROM) ||
      "Ricardo Prim Melo <onboarding@resend.dev>";

    const replyTo =
      stripQuotes(process.env.REPLY_TO) || "ricardoprimmelo@gmail.com";

    const ricardoInbox =
      stripQuotes(process.env.RICARDO_INBOX) || "ricardoprimmelo@gmail.com";

    // email para cliente
    if (email) {
      try {
        const { subject, html, text } = renderPedidoAgendamentoEmail({
          nome,
          whatsappLink,
        });

        const res = await resend.emails.send({
          from,
          to: email,
          subject,
          html,
          text,
          replyTo,
        });

        if (res.error) {
          console.error("Email cliente falhou:", res.error);
        }
      } catch (err) {
        console.error("Erro inesperado email cliente:", err);
      }
    }

    // email interno
    try {
      const res = await resend.emails.send({
        from,
        to: ricardoInbox,
        subject: `Novo pedido — ${nome}`,
        text: `Novo agendamento:

Nome: ${nome}
Email: ${email ?? "-"}
Telefone: ${telefoneLimpo}
Serviço: ${servico}
Modalidade: ${modalidade ?? "-"}
Preferências: ${preferencias ?? "-"}
ID: ${agendamento.id}
`,
        replyTo: email ?? replyTo,
      });

      if (res.error) {
        console.error("Email interno falhou:", res.error);
      }
    } catch (err) {
      console.error("Erro inesperado email interno:", err);
    }

    // SEMPRE SUCESSO SE CHEGOU AQUI
    return NextResponse.json({ ok: true, agendamento }, { status: 201 });
  } catch (error) {
    console.error("Erro no POST /api/agendamentos:", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar agendamento." },
      { status: 500 }
    );
  }
}
