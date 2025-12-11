// app/api/reflexoes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reflexoes -> lista todas as reflexões
export async function GET() {
    try {
        const reflexoes = await prisma.reflexao.findMany({
            orderBy: [
                { ordem: "asc" },      // primeiro ordem manual
                { createdAt: "desc" }, // depois mais recentes
            ],
        });

        return NextResponse.json(reflexoes);
    } catch (err) {
        console.error("Erro ao listar reflexões", err);
        return NextResponse.json(
            { error: "Erro ao listar reflexões" },
            { status: 500 }
        );
    }
}

// POST /api/reflexoes -> cria nova reflexão
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { titulo, texto, destaque, ordem, publicado } = body;

        if (!titulo || !texto) {
            return NextResponse.json(
                { error: "Título e texto são obrigatórios" },
                { status: 400 }
            );
        }

        const reflexao = await prisma.reflexao.create({
            data: {
                titulo,
                texto,
                destaque: Boolean(destaque),
                ordem: ordem ?? null,
                publicado: publicado ?? true,
            },
        });

        return NextResponse.json(reflexao, { status: 201 });
    } catch (err) {
        console.error("Erro ao criar reflexão", err);
        return NextResponse.json(
            { error: "Erro ao criar reflexão" },
            { status: 500 }
        );
    }
}
