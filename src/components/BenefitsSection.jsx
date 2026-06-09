import React from 'react';
import { ShieldCheck, Stethoscope, Smile, Clock } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: "Sem espera para usar*",
    desc: "Carência reduzida para você aproveitar seu plano com muito mais agilidade."
  },
  {
    icon: Stethoscope,
    title: "Hospitais Exclusivos",
    desc: "Acesso à maior rede própria do Brasil com atendimento médico integrado."
  },
  {
    icon: Smile,
    title: "Odonto Incluso",
    desc: "Cuidado completo com sua saúde bucal sem nenhum custo adicional."
  },
  {
    icon: Clock,
    title: "Urgência 24h",
    desc: "Segurança total com suporte e emergência disponíveis a qualquer momento."
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gray-50" id="benefits">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002b5c] mb-4">
            Vantagens de ser Hapvida
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mais economia e segurança para você e sua família com a maior operadora de saúde do Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => (
            <div 
              key={item.title} 
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[#002b5c] transition-colors">
                <item.icon className="w-7 h-7 text-[#002b5c] group-hover:text-white transition-colors" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-10 italic">
          *Carência sujeita a análise técnica e condições contratuais da operadora.
        </p>
      </div>
    </section>
  );
}