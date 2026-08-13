// src/data/content.js
import { Users, Building2, History, Activity } from 'lucide-react';

export const hapvidaStats = {
  badge: "Autoridade Comprovada",
  title: "Nossa infraestrutura a seu serviço",
  items: [
    { label: "Beneficiários", value: "15.7", suffix: "Mi", icon: Users, desc: "Maior operadora do país" },
    { label: "Hospitais", value: "87", suffix: "", icon: Building2, desc: "Estrutura própria completa" },
    { label: "História", value: "45", suffix: "Anos", icon: History, desc: "Tradição e confiança" },
    { label: "Rede Própria e Credenciada", value: "300", suffix: "+", icon: Activity, desc: "Unidades em todos os estados" }
  ]
};