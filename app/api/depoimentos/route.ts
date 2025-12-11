// app/api/depoimentos/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/depoimentos -> lista depoimentos
export async function GET() {
    try {
        const depoimentos = await prisma.depoimento.findMany({
            orderBy: [
                { ordem: "asc" },
                { createdAt: "desc" },
            ],
        });

        return NextResponse.json(depoimentos);
    } catch (err) {
        console.error("Erro ao listar depoimentos", err);
        return NextResponse.json(
            { error: "Erro ao listar depoimentos" },
            { status: 500 }
        );
    }
}

// POST /api/depoimentos -> cria um novo depoimento
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { nome, texto, origem, destaque, ordem, publicado } = body;

        if (!nome || !texto) {
            return NextResponse.json(
                { error: "Nome e texto são obrigatórios" },
                { status: 400 }
            );
        }

        const depoimento = await prisma.depoimento.create({
            data: {
                nome,
                texto,
                origem: origem ?? null,
                destaque: Boolean(destaque),
                ordem: ordem ?? null,
                publicado: publicado ?? true,
            },
        });

        return NextResponse.json(depoimento, { status: 201 });
    } catch (err) {
        console.error("Erro ao criar depoimento", err);
        return NextResponse.json(
            { error: "Erro ao criar depoimento" },
            { status: 500 }
        );
    }
}
