// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Só protege rotas /admin...
    if (!req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    const secret = process.env.ADMIN_SECRET;

    // Se não tiver secret, bloqueia tudo (especialmente em produção)
    if (!secret) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        url.search = "";
        return NextResponse.redirect(url);
    }

    const key = req.nextUrl.searchParams.get("key");

    if (key !== secret) {
        // Mostra uma página simples de bloqueio dentro do /admin
        const url = req.nextUrl.clone();
        url.pathname = "/admin/bloqueado";
        url.search = "";
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
