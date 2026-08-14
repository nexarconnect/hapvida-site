import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Pesquisar plano de saúde Hapvida em Limeira costuma começar com uma pergunta simples: quanto custa
        aqui, na minha idade? A resposta certa não é um número genérico: é o valor calculado para o seu
        perfil.
      </p>

      <h2>Quanto custa o plano Hapvida em Limeira</h2>
      <p>
        A referência de R$ 157,29 é o valor nacional mais baixo divulgado, não o preço em Limeira: aqui a
        tabela costuma começar acima da referência nacional. O valor final varia por idade, cidade e
        modalidade de contratação; o número exato do seu caso sai na cotação, disponível na{' '}
        <Link to="/plano-hapvida/limeira">página do plano Hapvida em Limeira</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor. Veja também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência em 24 horas;
        consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Limeira?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano em Limeira costuma começar acima
            disso. Um consultor confirma o número exato na cotação para Limeira.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em Limeira?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis antes de qualquer
            decisão.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quanto tempo até poder usar o plano?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, conforme a regra da ANS.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para reduzir a carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Em alguns casos, sim, por portabilidade. Veja como funciona no post sobre{' '}
            <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O plano odontológico vem junto?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
            região.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        O preço em Limeira depende do seu perfil, e só a cotação revela o valor real. Solicite uma cotação
        sem compromisso pelo WhatsApp. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
