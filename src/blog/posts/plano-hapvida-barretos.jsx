import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Quem mora em Barretos e pesquisa plano de saúde Hapvida encontra na internet tabelas nacionais que
        não refletem a realidade da cidade. O caminho mais direto é falar com quem valida a região, e é
        exatamente isso que o consultor faz.
      </p>

      <h2>Quanto custa o plano Hapvida em Barretos</h2>
      <p>
        O valor varia por idade, cidade e modalidade (individual, familiar ou empresarial). R$ 157,29 é o
        valor nacional mais baixo divulgado pela operadora, mas Barretos nem sempre segue essa mesma tabela
        de entrada: os planos disponíveis por aqui podem ser outros. Veja os planos disponíveis na{' '}
        <Link to="/plano-hapvida/barretos">página do plano Hapvida em Barretos</Link> e peça a cotação.
      </p>

      <h2>Rede e carência</h2>
      <p>
        A operadora combina rede própria e credenciada. O consultor valida quais hospitais, clínicas e
        laboratórios estão disponíveis para Barretos antes de qualquer decisão. Confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência entram em 24
        horas e consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Barretos?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não há um número único: o valor depende da sua idade e modalidade. Um consultor confirma o valor
            exato para o seu caso.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em Barretos?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis na cidade antes de
            qualquer decisão.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quanto tempo até poder usar o plano?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, conforme a ANS.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para reduzir a carência com portabilidade?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, em alguns casos. Veja como funciona no post sobre{' '}
            <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para contratar como MEI em Barretos?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Com CNPJ ativo, incluindo MEI, é possível avaliar a modalidade empresarial com condições
            próprias.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Para saber o preço do Hapvida em Barretos, a cotação com os seus dados é o caminho. Solicite uma
        cotação sem compromisso pelo WhatsApp. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
