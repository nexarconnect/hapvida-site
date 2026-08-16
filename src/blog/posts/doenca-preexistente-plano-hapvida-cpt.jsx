import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Doença preexistente no plano Hapvida não é motivo para recusa de contratação, mas muda a forma
        como a cobertura funciona nos primeiros meses. Quem declara errado, ou não declara, é quem
        acaba tendo dor de cabeça depois. Vale entender a regra antes de preencher a proposta.
      </p>

      <h2>O que a ANS considera doença ou lesão preexistente</h2>
      <p>
        Segundo a ANS, doença ou lesão preexistente (a sigla usada pelo mercado é DLP) é qualquer
        condição de saúde que o beneficiário já sabia ter no momento da contratação do plano, seja por
        diagnóstico médico anterior, seja por tratamento em andamento. Isso é declarado no formulário de
        saúde, um documento que faz parte da proposta de adesão.
      </p>
      <p>
        Como já explicamos no post sobre <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>,
        omitir uma condição preexistente não elimina nenhum prazo. Só cria risco de a operadora negar
        cobertura depois, quando identificar a condição em algum atendimento. Declarar corretamente é o
        que garante que você está protegido.
      </p>

      <h2>Cobertura Parcial Temporária: o que fica restrito e por quanto tempo</h2>
      <p>
        Quando existe doença preexistente declarada, a operadora pode oferecer Cobertura Parcial
        Temporária (CPT), em vez de negar a contratação. De acordo com a ANS (Resolução Normativa
        558/2022), a CPT pode suspender por até 24 meses apenas os procedimentos de alta complexidade,
        leitos de alta tecnologia (CTI e UTI) e cirurgias relacionadas diretamente àquela doença
        preexistente. Passado esse prazo, a cobertura para esses procedimentos passa a ser integral, sem
        restrição.
      </p>
      <p>
        O que costuma gerar confusão: consultas, exames e internações não cirúrgicas relacionadas à
        condição preexistente continuam cobertos normalmente durante a CPT, mesmo antes dos 24 meses.
        A restrição vale só para os procedimentos de maior complexidade ligados àquela doença específica,
        não para o restante do plano.
      </p>
      <p>
        Como cada condição declarada gera uma análise própria, o jeito certo de saber o que se aplica ao
        seu caso é pedir a cotação já levando o histórico de saúde para a conversa: o consultor confirma
        pelo WhatsApp se haverá CPT e para quais procedimentos, antes de qualquer assinatura. Vale para
        quem está pesquisando em{' '}
        <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/ribeirao-preto">Ribeirão Preto</Link> ou qualquer uma das{' '}
        <Link to="/planos-hapvida-por-cidade">cidades atendidas pela Nexar</Link>.
      </p>

      <h2>Isso é diferente da carência comum</h2>
      <p>
        A CPT não substitui os prazos gerais de carência (urgência e emergência em 24 horas, consultas e
        exames simples em 30 dias, como detalhamos no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência do plano Hapvida</Link>). São duas coisas que
        rodam em paralelo: a carência comum vale para todo mundo, e a CPT vale só para quem declarou
        alguma condição preexistente, e só para os procedimentos ligados a ela.
      </p>

      <h2>Como isso aparece na contratação</h2>
      <p>
        O formulário de saúde é preenchido no momento da proposta, junto com os documentos pessoais.
        Se houver alguma condição a declarar, o consultor explica se a operadora vai aplicar CPT, e para
        quais procedimentos, antes de você assinar. Essa confirmação é individual: não existe uma lista
        fixa de doenças com prazo padrão, porque depende do procedimento associado à condição declarada.
      </p>
      <p>
        Quem já tem plano de saúde ativo e já passou pelo período de CPT na operadora atual pode avaliar
        a <Link to="/blog/portabilidade-para-hapvida">portabilidade para o plano Hapvida</Link>. A
        portabilidade pode aproveitar prazos de carência e de cobertura já cumpridos, o que evita
        recomeçar essa espera de novo. Um consultor confirma se o seu caso se qualifica antes de
        cancelar o plano atual.
      </p>

      <h2>Perguntas frequentes</h2>

      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Ter doença preexistente impede contratar o plano Hapvida?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não impede. A condição precisa ser declarada corretamente no formulário de saúde; a
            operadora pode aplicar Cobertura Parcial Temporária (CPT) para os procedimentos de alta
            complexidade ligados a ela, mas isso não é motivo de recusa da contratação.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O que é Cobertura Parcial Temporária (CPT)?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Segundo a ANS, é a suspensão temporária, por até 24 meses, da cobertura de procedimentos de
            alta complexidade, leitos de CTI/UTI e cirurgias relacionados a uma doença ou lesão que o
            beneficiário já tinha antes de contratar o plano.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Durante a CPT, fico sem nenhum atendimento para a condição?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. Consultas, exames e internações não cirúrgicas relacionados à condição continuam
            cobertos normalmente. A restrição vale só para os procedimentos de alta complexidade e
            cirurgias ligados diretamente àquela doença.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O que acontece se eu omitir uma doença preexistente?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A carência ou a CPT não deixam de valer por causa da omissão. O risco é a operadora negar
            cobertura mais adiante, quando identificar a condição em algum atendimento. Declarar
            corretamente é o que garante a proteção do contrato.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A CPT é a mesma coisa que carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. A carência é um prazo geral que vale para todo mundo, contado a partir da contratação.
            A CPT é específica de quem declarou alguma doença preexistente e vale só para os
            procedimentos de alta complexidade relacionados a ela.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Portabilidade evita a CPT de novo?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Se você já cumpriu o período de CPT no plano de origem, a portabilidade pode aproveitar esse
            histórico, dependendo dos requisitos do seu contrato atual. Um consultor confirma se o seu
            caso se qualifica antes de qualquer cancelamento.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Preciso levar exames ou laudos para declarar a condição?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A lista de documentos pode variar conforme a condição declarada. O consultor confirma
            exatamente o que é necessário para o seu caso antes de formalizar a proposta.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Doença preexistente muda a cobertura de alguns procedimentos por um período, não a possibilidade
        de contratar. O erro mais comum é omitir a condição achando que isso evita a CPT: na prática, só
        troca um prazo conhecido por um risco de negativa depois. Declare corretamente e peça ao
        consultor a confirmação por escrito de como a CPT se aplica ao seu caso antes de assinar.
      </p>
      <p>
        Solicite uma cotação sem compromisso e leve seu histórico de saúde para essa conversa. Veja
        também as <Link to="/perguntas-frequentes">perguntas frequentes</Link> ou o post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>
    </>
  );
}
