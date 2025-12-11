-- CreateTable
CREATE TABLE "Reflexao" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reflexao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Depoimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "origem" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Depoimento_pkey" PRIMARY KEY ("id")
);
