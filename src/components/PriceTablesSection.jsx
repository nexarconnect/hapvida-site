import React from 'react';
import { Check, X, Info, ShieldCheck, Star, Heart } from 'lucide-react';

const PriceTablesSection = () => {
  const plans = [
    {
      name: "Nosso Plano",
      price: "105,30",
      // COPY NOVA: Foco em acolhimento e rede própria
      description: "O plano preferido em Bauru. Acesso total à nossa rede exclusiva com acolhimento e agilidade.",
      features: [
        "Consultas em todas as especialidades",
        "Exames simples e complexos",
        "Internação e Cirurgias (Sem surpresas)",
        "Parto humanizado (com carência)",
        "Odontologia inclusa (Promoção)",
        "Rede Própria Integrada"
      ],
      notIncluded: ["Reembolso", "Livre escolha de médicos"],
      highlight: true,
      badge: "Melhor Custo-Benefício",
      icon: Heart, // Ícone de cuidado
      color: "blue"
    },
    {
      name: "Mix",
      price: "145,90",
      // COPY NOVA: Foco em flexibilidade
      description: "O melhor dos dois mundos: a segurança da rede própria com a flexibilidade da rede credenciada.",
      features: [
        "Tudo do Nosso Plano",
        "Hospitais parceiros selecionados",
        "Maior flexibilidade de agenda",
        "Cobertura Nacional (Urgência/Emergência)",
        "Opção de Acomodação Privativa (Apto)"
      ],
      notIncluded: ["Reembolso livre"],
      highlight: false,
      icon: ShieldCheck, // Ícone de segurança
      color: "orange"
    },
    {
      name: "Pleno",
      price: "189,90",
      // COPY NOVA: Foco em liberdade total
      description: "Liberdade total para cuidar da sua saúde. Escolha seu médico e conte com reembolso.",
      features: [
        "Rede Credenciada Ampla",
        "Reembolso de consultas",
        "Atendimento em todo o Brasil",
        "Acomodação em Apartamento",
        "Coleta domiciliar de exames"
      ],
      notIncluded: [],
      highlight: false,
      icon: Star, // Ícone premium
      color: "blue"
    }
  ];        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm inline-flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
            <Info className="w-4 h-4 text-[#0054a6]" />
            <span>Consulte condições de carência e abrangência geográfica com nossos consultores.</span>
          </p>
        </div>


  return (
    <section id="precos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-[#0054a6] text-sm font-bold mb-4">
            INVESTIMENTO INTELIGENTE
          </span>
          <h2 className="text-4xl font-bold text-[#0054a6] mb-4">
            Planos que cabem no seu bolso
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Qualidade, tecnologia e acolhimento. Escolha a opção ideal para você e sua família.
            <br/>
            <span className="text-sm text-gray-500 mt-2 block">*Valores referentes à faixa etária 0-18 anos com coparticipação.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border ${plan.highlight ? 'border-[#0054a6] ring-4 ring-blue-50' : 'border-gray-100'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 bg-[#0054a6] text-white text-center py-1 text-sm font-bold uppercase tracking-wide">
                  {plan.badge}
                </div>
              )}

              <div className={`p-8 ${plan.highlight ? 'pt-10' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                  <div className={`p-2 rounded-lg ${plan.color === 'orange' ? 'bg-orange-100 text-[#f7941d]' : 'bg-blue-100 text-[#0054a6]'}`}>
                    <plan.icon className="w-6 h-6" />
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm mb-6 min-h-[60px] leading-relaxed">
                  {plan.description}
                </p>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-sm text-gray-500 font-medium">A partir de</span>
                  <span className="text-4xl font-extrabold text-[#0054a6] ml-2">R$ {plan.price}</span>
                  <span className="text-gray-400 ml-1">/mês</span>
                </div>

                <a 
                  href={`https://wa.me/5514991235094?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20${plan.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 rounded-xl font-bold text-center transition-all mb-8 ${
                    plan.highlight 
                      ? 'bg-[#f7941d] text-white hover:bg-[#e08315] shadow-lg hover:shadow-orange-500/30' 
                      : 'bg-blue-50 text-[#0054a6] hover:bg-blue-100'
                  }`}
                >
                  Simular {plan.name}
                </a>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Destaques do plano:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-green-100 p-1 rounded-full flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <>
                      <div className="h-px bg-gray-100 my-4" />
                      {plan.notIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 opacity-50">
                          <X className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{item}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PriceTablesSection;