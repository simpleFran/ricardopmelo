
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {

    try {
        const body = await req.json();
        console.log("Payload recebido em /api/agendamentos:", body);
        const { email, nome, telefone, servico, dataHora, status, nota } = body;
        if (!nome || !telefone || !servico || !dataHora) {
            return NextResponse.json({
                error: "Dados obrigatórios faltando.",

            }, {
                status: 400
            })
        }
        // normalizar telefone para só dígitos ( unique no banco)
        const telefoneLimpo = String(telefone).replace(/\D/g, "");

        //cria ou atualiza lead pelo telefone 
        const lead = await prisma.lead.upsert({
            where: { telefone: telefoneLimpo },
            update: {
                nome, email
            },
            create: {
                telefone: telefoneLimpo,
                email,
                nome,
            }
        })
        //cria o agendamento
        const agendamento = await prisma.agendamento.create({
            data: {
                leadId: lead.id,
                servico,
                dataHora: new Date(dataHora), // string ISO -> Date
                status: status ?? "pendente",
                nota: nota ?? null,

            }
        })

        return NextResponse.json(
            {
                ok: true,
                agendamento
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log("Erro no POST api/agendamentos", error)
        return NextResponse.json(
            {
                error: "Erro interno ao salvar agendamento",

            },
            {
                status: 500
            }
        )
    }
}