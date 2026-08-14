import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Cidade média, dúvida grande: quanto custa o plano de saúde Hapvida em Sertãozinho? Não existe um
        número único que valha para todos os perfis, mas dá para entender o que muda o preço e como
        confirmar o valor certo para o seu caso.
      </p>

      <h2>Quanto custa o plano Hapvida em Sertãozinho</h2>
      <p>
        R$ 157,29 é o valor nacional mais baixo divulgado, não necessariamente o preço em Sertãozinho: o
        valor final varia conforme a idade, a cidade e a modalidade contratada, por isso o número exato do
        seu caso só sai na cotação. Veja os planos disponíveis na{' '}
        <Link to="/plano-hapvida/sertaozinho">página do plano Hapvida em Sertãozinho</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor antes de qualquer contratação. A
        lista completa por cidade fica na página de{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link>. Urgência e emergência entram em 24 horas
        e consultas e exames simples em 30 dias, conforme a{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Sertãozinho?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano em Sertãozinho costuma começar acima
            disso. Um consultor confirma o número exato na cotação.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em Sertãozinho?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis na cidade antes de
            qualquer decisão.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quanto tempo até poder usar o plano?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência em 24 horas; consultas e exames simples em 30 dias, pela regra da ANS.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para reduzir a carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Em alguns casos, sim, por portabilidade. Veja o post sobre{' '}
            <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para contratar como MEI em Sertãozinho?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Com CNPJ ativo, incluindo MEI, é possível avaliar a modalidade empresarial com condições
            próprias.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Em Sertãozinho, o valor real depende do seu perfil. Peça uma cotação sem compromisso e confirme
        valor e rede da sua cidade direto pelo WhatsApp. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
