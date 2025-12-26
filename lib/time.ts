// lib/time.ts

// Agora aceita Date | string | null e evita erro no build
export default function formatLisbonDateTime(date: Date | string | null) {
    if (!date) {
        return {
            dateLabel: "Sem data",
            timeLabel: "--:--",
            dateKey: "sem-data",
        };
    }

    const d = typeof date === "string" ? new Date(date) : date;

    const dateLabel = new Intl.DateTimeFormat("pt-PT", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Europe/Lisbon",
    }).format(d);

    const timeLabel = new Intl.DateTimeFormat("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Lisbon",
    }).format(d);

    // Formato YYYY-MM-DD para agrupamento
    const dateKey = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Europe/Lisbon",
    })
        .format(d)
        .replace(/\//g, "-");

    return { dateLabel, timeLabel, dateKey };
}
