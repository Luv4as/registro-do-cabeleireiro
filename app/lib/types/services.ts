export const SERVICES = {
    CORTE: "Corte",
    COLORACAO: "Coloração",
    PINTURA: "Pintura",
    ALISAMENTO: "Alisamento",
    TRATAMENTO: "Tratamento",
} as const;

export type Service = typeof SERVICES[keyof typeof SERVICES];

export const serviceOptions: Service[] = Object.values(SERVICES);