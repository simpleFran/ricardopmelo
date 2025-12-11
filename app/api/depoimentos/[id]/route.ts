// app/api/depoimentos/[id]/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ id: string }> | { id: string } };

async function getIdFromContext(context: Ctx) {
    const params = await context.params;
    const id = Number(params.id);
    return id;
}

export async function PATCH(req: Request, context: Ctx) {
    const id = await getIdFromContext(context);

    if (Number.isNaN(id) || id <= 0) {
        return NextResponse.json(
            { error: "ID inválido" },
            { status: 400 }
        );
    }

    try {
        const body = await req.json();

        const { nome, texto, origem, destaque, ordem, publicado } = body as {
            nome?: string;
            texto?: string;
            origem?: string | null;
            destaque?: boolean;
            ordem?: number | null;
            publicado?: boolean;
        };

        const data: Record<string, unknown> = {};

        if (nome !== undefined) data.nome = nome;
        if (texto !== undefined) data.texto = texto;
        if (origem !== undefined) data.origem = origem;
        if (destaque !== undefined) data.destaque = Boolean(destaque);
        if (ordem !== undefined) data.ordem = ordem;
        if (publicado !== undefined) data.publicado = Boolean(publicado);

        const updated = await prisma.depoimento.update({
            where: { id },
            data,
        });

        return NextResponse.json(updated);
    } catch (err) {
        console.error("Erro ao atualizar depoimento", err);
        return NextResponse.json(
            { error: "Erro ao atualizar depoimento" },
            { status: 500 }
        );
    }
}

export async function DELETE(_req: Request, context: Ctx) {
    const id = await getIdFromContext(context);

    if (Number.isNaN(id) || id <= 0) {
        return NextResponse.json(
            { error: "ID inválido" },
            { status: 400 }
        );
    }

    try {
        await prisma.depoimento.delete({
            where: { id },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Erro ao excluir depoimento", err);
        return NextResponse.json(
            { error: "Erro ao excluir depoimento" },
            { status: 500 }
        );
    }
}
