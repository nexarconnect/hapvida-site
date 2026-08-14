import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Pesquisar plano de saúde Hapvida em Ribeirão Preto costuma esbarrar em tabelas nacionais que não
        dizem nada sobre a sua cidade. A resposta certa nunca é um número genérico: é o valor calculado
        para a sua idade, na sua modalidade. Veja como chegar nele sem chute.
      </p>

      <h2>Quanto custa o plano Hapvida em Ribeirão Preto</h2>
      <p>
        O site divulga uma referência inicial de R$ 157,29, ponto de partida da tabela, não o preço fechado
        para todo mundo. O valor final muda conforme a sua idade, a cidade e a modalidade contratada
        (individual, familiar ou empresarial), e dois moradores de Ribeirão Preto da mesma idade podem
        receber números diferentes se a contratação for diferente.
      </p>
      <p>
        Para saber o que se aplica ao seu caso, veja a{' '}
        <Link to="/plano-hapvida/ribeirao-preto">página do plano Hapvida em Ribeirão Preto</Link> e peça a
        cotação com os seus dados pelo WhatsApp.
      </p>

      <h2>Rede de atendimento e carência</h2>
      <p>
        A operadora combina rede própria (estrutura administrada pela própria Hapvida) com rede credenciada,
        que completa a cobertura onde a rede própria não chega. O consultor valida quais unidades estão
        disponíveis em Ribeirão Preto antes de qualquer decisão. Confira também a nossa página de{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade.
      </p>
      <p>
        Pelas regras da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência
        entram em até 24 horas e consultas e exames simples em até 30 dias após a contratação. Detalhamos os
        prazos completos no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Ribeirão Preto?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A referência inicial divulgada é de R$ 157,29, mas o valor real depende da sua idade e modalidade. Um
            consultor confirma o número exato na cotação para Ribeirão Preto.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende bem em Ribeirão Preto?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A operadora trabalha com rede própria e credenciada na região. O consultor confirma quais hospitais,
            clínicas e laboratórios estão disponíveis antes de qualquer assinatura.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quanto tempo até poder usar o plano?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência liberam em 24 horas; consultas e exames simples, em 30 dias. Os demais
            procedimentos seguem a tabela completa da ANS.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para reduzir a carência em Ribeirão Preto?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, em alguns casos. Quem já tem plano ativo em outra operadora pode avaliar a portabilidade, que
            aproveita carências já cumpridas. Confira o post sobre{' '}
            <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O plano odontológico está incluso?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
            região. O consultor mostra as alternativas no momento da cotação.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Em Ribeirão Preto, o número que vale é o da sua idade, não a média divulgada no site. Solicite uma
        cotação sem compromisso e receba valores e rede da sua cidade pelo WhatsApp, com um consultor
        autorizado. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
