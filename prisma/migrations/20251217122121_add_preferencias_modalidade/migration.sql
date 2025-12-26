-- AlterTable
ALTER TABLE "Agendamento" ADD COLUMN     "modalidade" TEXT,
ADD COLUMN     "preferencias" TEXT,
ALTER COLUMN "dataHora" DROP NOT NULL;
