import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Morar em Lins e pesquisar plano de saúde Hapvida tem uma vantagem: dá para falar com quem conhece a
        região. A consultoria Nexar atende em Lins com suporte local, e a primeira coisa que um bom
        atendimento faz é confirmar o valor real para o seu perfil, em vez de repetir tabela nacional.
      </p>

      <h2>Quanto custa o plano Hapvida em Lins</h2>
      <p>
        Os valores variam por idade, cidade e modalidade de contratação: individual, familiar ou
        empresarial. R$ 157,29 é o valor nacional mais baixo divulgado, mas não é o que se paga em Lins: aqui
        a tabela costuma começar acima disso. Para saber o que se aplica ao seu caso, veja a{' '}
        <Link to="/plano-hapvida/lins">página do plano Hapvida em Lins</Link> e peça a cotação.
      </p>

      <h2>Rede e carência</h2>
      <p>
        A operadora trabalha com rede própria e credenciada, e o consultor valida quais hospitais, clínicas
        e laboratórios estão disponíveis para Lins antes de qualquer decisão. Confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela regra da{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência entram em 24
        horas e consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Lins?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não há um número único: o valor depende da sua idade e da modalidade escolhida. Um consultor
            confirma o valor exato para o seu caso.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em Lins?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, com rede própria e credenciada, e suporte local da consultoria Nexar. O consultor valida as
            unidades disponíveis antes de qualquer decisão.
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
            <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O plano odontológico está incluso?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
            região.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Para saber o preço do Hapvida em Lins, o caminho é a cotação com os seus dados. Solicite uma
        cotação sem compromisso pelo WhatsApp e receba valor e rede da sua cidade. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
