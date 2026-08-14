import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        São Carlos tem um perfil de busca próprio quando o assunto é plano de saúde Hapvida: quem pesquisa a
        cidade costuma priorizar cobertura robusta. Antes de decidir, vale entender o que define o preço
        final.
      </p>

      <h2>Quanto custa o plano Hapvida em São Carlos</h2>
      <p>
        R$ 157,29 é o valor nacional mais baixo divulgado pela operadora, mas São Carlos nem sempre segue
        essa mesma tabela de entrada: os planos disponíveis por aqui podem ser outros. O valor final depende
        da sua idade, da modalidade contratada e da disponibilidade comercial da região; o valor exato para
        o seu perfil é confirmado por um consultor na cotação. Veja as opções na{' '}
        <Link to="/plano-hapvida/sao-carlos">página do plano Hapvida em São Carlos</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor. Confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência em 24 horas;
        consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em São Carlos?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano disponível em São Carlos costuma ser
            outro, com valor de entrada diferente. Um consultor confirma o número exato na cotação.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em São Carlos?</h3>
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
          <h3 className="!mt-0 font-black text-slate-900">Dá para reduzir a carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Em alguns casos, sim, por portabilidade. Veja o post sobre{' '}
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
        Em São Carlos, o valor real depende do seu perfil. Solicite uma cotação sem compromisso e confirme o
        valor da sua idade. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
