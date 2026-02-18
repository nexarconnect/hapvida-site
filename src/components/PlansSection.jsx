import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Info, ShieldCheck, Star, Heart, ArrowRight } from 'lucide-react';

const PlansSection = ({ onOpenForm }) => {
  const plans = [
    {
      name: "Nosso Plano",
      price: "105,30",
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
      icon: Heart,
      color: "blue"
    },
    {
      name: "Mix",
      price: "145,90",
      description: "O melhor dos dois mundos: a segurança da rede própria com a flexibilidade da rede credenciada.",
      features: [
        "Tudo do Nosso Plano",
        "Hospitais parceiros selecionados",
        "Maior flexibilidade de agenda",
        "Cobertura Nacional (Urgência)",
        "Opção de Acomodação Privativa"
      ],
      notIncluded: ["Reembolso livre"],
      highlight: false,
      badge: "Mais Flexibilidade",
      icon: ShieldCheck,
      color: "orange"
    },
    {
      name: "Pleno",
      price: "189,90",
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
      badge: "Premium",
      icon: Star,
      color: "blue"
    }
  ];

  return (
    <section id="planos" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-[#0054a6] text-sm font-bold mb-4">
            NOSSOS PLANOS
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-[#0054a6]">
            Planos que cabem no seu bolso
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Qualidade, tecnologia e acolhimento. Escolha a opção ideal para você e sua família.
            <br/>
            <span className="text-sm text-gray-500 mt-2 block">*Valores referentes à faixa etária 0-18 anos com coparticipação.</span>
          </p>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border flex flex-col h-full ${plan.highlight ? 'border-[#0054a6] ring-4 ring-blue-50 shadow-2xl scale-105 z-10' : 'border-gray-100'}`}
            >
              {/* Badge de Destaque */}
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 bg-[#0054a6] text-white text-center py-1 text-sm font-bold uppercase tracking-wide z-20">
                  {plan.badge}
                </div>
              )}

              <div className={`p-8 flex-grow ${plan.highlight ? 'pt-10' : ''}`}>
                
                {/* Ícone e Nome */}
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
                  <div className={`p-3 rounded-xl ${plan.color === 'orange' ? 'bg-orange-100 text-[#f7941d]' : 'bg-blue-100 text-[#0054a6]'}`}>
                    <plan.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-gray-500 text-sm mb-6 min-h-[60px] leading-relaxed">
                  {plan.description}
                </p>

                {/* Preço */}
                <div className="flex items-baseline mb-8 pb-8 border-b border-gray-100">
                  <span className="text-sm text-gray-500 font-medium">A partir de</span>
                  <span className="text-4xl font-extrabold text-[#0054a6] ml-2">R$ {plan.price}</span>
                  <span className="text-gray-400 ml-1">/mês</span>
                </div>

                {/* Lista de Benefícios */}
                <div className="space-y-4 mb-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">O que está incluso:</p>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 min-w-[16px]">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <>
                      <div className="h-px bg-gray-50 my-4" />
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

              {/* Botões de Ação (Rodapé Fixo) */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto space-y-3">
                <button
                  onClick={onOpenForm}
                  className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 group
                    ${plan.highlight 
                      ? 'bg-[#f7941d] hover:bg-[#e08315] hover:shadow-orange-500/30' 
                      : 'bg-[#0054a6] hover:bg-[#003366] hover:shadow-blue-500/30'
                    }`}
                >
                  Simular {plan.name}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <a 
                  href={`https://wa.me/5514991886868?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20${plan.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl font-semibold text-center text-gray-500 hover:text-[#0054a6] hover:bg-white border border-transparent hover:border-gray-200 transition-all text-sm"
                >
                  Tirar dúvidas no WhatsApp
                </a>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Nota de Rodapé */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm inline-flex items-center justify-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
            <Info className="w-4 h-4 text-[#0054a6]" />
            <span>Consulte condições de carência e abrangência geográfica com nossos consultores.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default PlansSection;