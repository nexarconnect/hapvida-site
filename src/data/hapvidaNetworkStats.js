import { Hospital, Activity, Stethoscope, HeartPulse } from 'lucide-react';

export const hapvidaStats = {
  badge: 'Rede Própria de Atendimento',
  title: 'A maior operadora do Brasil',
  items: [
    {
      label: 'Hospitais',
      value: 87,
      suffix: '+',
      icon: Hospital,
      desc: 'Unidades hospitalares modernas e equipadas.'
    },
    {
      label: 'Clínicas',
      value: 75,
      suffix: '+',
      icon: Stethoscope,
      desc: 'Consultórios médicos em diversas especialidades.'
    },
    {
      label: 'Pronto Atendimentos',
      value: 22,
      suffix: '+',
      icon: Activity,
      desc: 'Atendimento de urgência e emergência 24h.'
    },
    {
      label: 'Diagnóstico',
      value: 15,
      suffix: '+',
      icon: HeartPulse,
      desc: 'Laboratórios e centros de imagem avançados.'
    }
  ]
};