export const hapvidaNetworkStats = {
  source: {
    title: "Book Rede Própria e Integrada Hapvida",
    dateLabel: "Abr/2025",
    notes: "O material menciona base 4T24 em alguns indicadores.",
  },
  overview: {
    title: "Rede própria e integrada",
    description:
      "A Hapvida opera uma rede própria e integrada, com unidades distribuídas nas cinco regiões do Brasil.",
  },
  totals: [
    { key: "integrated_units", label: "Unidades próprias e integradas", value: 809 },
    { key: "beds", label: "Leitos de internação", value: 5800, format: "int" },
  ],
  unitsByType: [
    { key: "hospitals", label: "Hospitais", value: 88 },
    { key: "emergency", label: "Prontos atendimentos", value: 77 },
    { key: "clinics", label: "Clínicas", value: 352 },
    { key: "diagnostics", label: "Diagnósticos", value: 292 },
  ],
  hospitalsByRegion: [
    { key: "north", label: "Norte", value: 7 },
    { key: "northeast", label: "Nordeste", value: 25 },
    { key: "midwest", label: "Centro-Oeste", value: 5 },
    { key: "southeast", label: "Sudeste", value: 43 },
    { key: "south", label: "Sul", value: 8 },
  ],
  southeastDetail: [
    { key: "sp", label: "SP", value: 29 },
    { key: "mg", label: "MG", value: 10 },
    { key: "rj", label: "RJ", value: 4 },
  ],
  quality: {
    title: "Qualidade Assistencial",
    description: "Indicadores monitorados que garantem segurança e eficiência.",
    items: [
      {
        title: "Agilidade na Emergência",
        value: "77,2%",
        description: "dos clientes atendidos em até 15 minutos nas emergências.",
        highlight: true,
      },
      {
        title: "Segurança na UTI (SMR)",
        value: "0,56",
        description: "Índice de mortalidade padronizada (quanto menor, melhor).",
        comparison: "Média AMIB: 0,76",
        highlight: true,
      },
      {
        title: "Parto Adequado",
        value: "37,5%",
        description: "Taxa de parto normal no programa Nascer Bem.",
        comparison: "Média ANAHAP: 23,4%",
        highlight: false,
      },
    ],
  },
};