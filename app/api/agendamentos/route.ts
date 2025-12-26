import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- helpers ---------------------------------------------------------------

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
        <p style="margin:0 0 14px 0;">Olá ${nome},</p>

        <p style="margin:0 0 14px 0;">
          Obrigado por contactares. Para agendarmos a <strong>avaliação inicial (60–75 min)</strong>,
          indica por favor os teus <strong>3 horários preferidos na próxima semana</strong> e a tua disponibilidade
          <strong>online/presencial</strong>.
        </p>

        <p style="margin:0 0 14px 0;">
          Antes da sessão, envio um breve formulário para perceber melhor a tua situação.
        </p>

        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:16px;padding:14px;margin:18px 0;">
          <div style="font-weight:700;color:#9a3412;margin-bottom:6px;">Responde com:</div>
          <ul style="margin:0;padding-left:18px;color:#7c2d12;">
            <li>3 horários preferidos (na próxima semana)</li>
            <li>Online / Presencial</li>
          </ul>
        </div>

        <a href="${whatsappLink}"
           style="display:inline-block;background:#ea580c;color:#ffffff;text-decoration:none;
                  padding:12px 16px;border-radius:14px;font-weight:700;">
          Responder pelo WhatsApp
        </a>

        <p style="margin:18px 0 0 0;">Abraço,<br/>
        <strong>Ricardo Prim Melo</strong><br/>
        Mentor de Recuperação e Desenvolvimento Humano</p>
      </div>

      <div style="padding:14px 22px;border-top:1px solid #f0f0f0;color:#6b7280;font-size:12px;">
        Se recebeste este email por engano, podes ignorá-lo.
      </div>
    </div>
  </div>
  `;

  const text = `Olá ${nome},

Obrigado por contactares. Para agendarmos a avaliação inicial (60–75 min), indica por favor os teus 3 horários preferidos na próxima semana e a tua disponibilidade online/presencial.

Antes da sessão, envio um breve formulário para perceber melhor a tua situação.

Abraço,
Ricardo Prim Melo — Mentor de Recuperação e Desenvolvimento Humano
${whatsappLink}
`;

  return { subject, html, text };
}

// --- handler ---------------------------------------------------------------

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
    } = body as {
      email?: string;
      nome: string;
      telefone: string;
      servico: string;
      dataHora?: string | Date | null;
      status?: string;
      nota?: string;
      preferencias?: string | null;
      modalidade?: string | null;
    };

    if (!nome || !telefone || !servico) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando (nome, telefone, servico)." },
        { status: 400 }
      );
    }

    // normaliza telefone (unique no banco)
    const telefoneLimpo = String(telefone).replace(/\D/g, "");

    // upsert Lead
    const lead = await prisma.lead.upsert({
      where: { telefone: telefoneLimpo },
      update: { nome, email },
      create: { telefone: telefoneLimpo, email, nome },
    });

    // dataHora opcional
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataHoraDate = dataHora ? new Date(dataHora as any) : null;

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

    // --- WhatsApp link (com preferências reais) ---------------------------
    const whatsappBase =
      stripQuotes(process.env.WHATSAPP_LINK) || "https://wa.me/351967246075";

    const prefs = (preferencias ?? "").trim();
    const mod = (modalidade ?? "").trim();

    const message = `Olá Ricardo, sou ${nome}.

Meus 3 horários preferidos na próxima semana:
${prefs || "1) __/__/__ às __:__\n2) __/__/__ às __:__\n3) __/__/__ às __:__"}

Disponibilidade: ${mod || "online/presencial"}`;

    const whatsappLink = buildWhatsAppLink(whatsappBase, message);

    // --- Email config ------------------------------------------------------
    const from =
      stripQuotes(process.env.MAIL_FROM) ||
      "Ricardo Prim Melo <onboarding@resend.dev>";

    const replyTo =
      stripQuotes(process.env.REPLY_TO) || "ricardoprimmelo@gmail.com";

    const ricardoInbox =
      stripQuotes(process.env.RICARDO_INBOX) || "ricardoprimmelo@gmail.com";

    // --- Email para o cliente (follow-up principal) ------------------------
    if (email) {
      const { subject, html, text } = renderPedidoAgendamentoEmail({
        nome,
        whatsappLink,
      });

      const sendClient = await resend.emails.send({
        from,
        to: email,
        subject,
        html,
        text,
        replyTo,
      });

      if (sendClient.error) {
        console.error("Resend error (cliente):", sendClient.error);
        return NextResponse.json(
          {
            ok: false,
            error: "Falha ao enviar email ao cliente.",
            details: sendClient.error,
          },
          { status: 500 }
        );
      }

      console.log("Resend ok (cliente). id:", sendClient.data?.id);
    } else {
      console.log("Sem email do cliente — não foi enviado follow-up por email.");
    }

    // --- Email interno para o Ricardo (não bloqueia fluxo) -----------------
    const sendInternal = await resend.emails.send({
      from,
      to: ricardoInbox,
      subject: `Novo pedido — ${nome}`,
      text: `Novo pedido recebido:

Nome: ${nome}
Email: ${email ?? "-"}
Telefone: ${telefoneLimpo}
Serviço: ${servico}
Modalidade: ${modalidade ?? "-"}
Preferências: ${preferencias ?? "-"}
DataHora (se informada): ${dataHoraDate ? dataHoraDate.toISOString() : "-"}
Status: ${agendamento.status}
Agendamento ID: ${agendamento.id}
`,
      replyTo: email ?? replyTo,
    });

    if (sendInternal.error) {
      console.error("Resend error (interno):", sendInternal.error);
    } else {
      console.log("Resend ok (interno). id:", sendInternal.data?.id);
    }

    return NextResponse.json({ ok: true, agendamento }, { status: 201 });
  } catch (error) {
    console.log("Erro no POST api/agendamentos", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar agendamento" },
      { status: 500 }
    );
  }
}
