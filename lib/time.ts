



//Aceita Date ou String (ex.: vindo do Prisma/JSON)

export default function formatLisbonDateTime(date: Date | string) {

    const d = typeof date === 'string' ? new Date(date) : date;

    // data no fuso horario de Lisboa
    const dateLabel = new Intl.DateTimeFormat("pt-PT", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Europe/Lisbon"

    }).format(d)

    // hora no fuso horario de Lisboa
    const timeLabel = new Intl.DateTimeFormat("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Lisbon"
    }).format(d)

    // chave útil p/ agrupar por dia (yyyy-mm-dd em Lisboa)
    const dateKey = new Intl.DateTimeFormat("en-CA", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: "Europe/Lisbon"
    }).format(d).replace(/\//g, "-") // vira tipo 2026-12-23

    return {dateLabel,timeLabel,dateKey}
}