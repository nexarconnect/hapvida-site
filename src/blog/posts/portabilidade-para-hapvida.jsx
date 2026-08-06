import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Trocar de operadora sem perder o que você já cumpriu de carência é um direito garantido pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr> — não uma cortesia da operadora de
        destino. Isso muda a forma de pensar a decisão: em vez de "vale a pena recomeçar", a pergunta
        certa costuma ser "os requisitos de portabilidade estão cumpridos".
      </p>

      <h2>O que é a portabilidade de carências</h2>
      <p>
        É o direito de migrar de um plano de saúde para outro — no caso, para um plano Hapvida —
        aproveitando os prazos de carência já cumpridos no plano atual. Sem portabilidade, qualquer
        contratação nova reinicia a contagem de carência do zero; com ela, o histórico é preservado
        conforme as regras da ANS.
      </p>

      <h2>Requisitos básicos</h2>
      <p>
        Em linhas gerais, a portabilidade exige tempo mínimo de permanência no plano atual e
        compatibilidade entre a cobertura de origem e a de destino (por exemplo, migrar de um plano
        hospitalar para outro hospitalar). Cada caso tem particularidades — número de trocas anteriores,
        tipo de contratação, situação cadastral do plano atual — que valem confirmação individual antes
        de iniciar o processo.
      </p>

      <h2>Quando costuma compensar</h2>
      <p>
        Faz mais sentido avaliar portabilidade quando você já está satisfeito com carências cumpridas há
        tempo — período de doenças preexistentes já vencido, por exemplo — e o que pesa na decisão é
        outro fator: rede de atendimento, mensalidade ou modelo de coparticipação. Nesses casos, a
        portabilidade evita perder esse histórico só porque a operadora mudou.
      </p>

      <h2>Como confirmar se você se qualifica</h2>
      <p>
        Como os requisitos dependem do seu plano atual especificamente, o caminho mais direto é levar os
        dados do seu contrato vigente para um consultor validar a elegibilidade antes de qualquer
        cancelamento — cancelar o plano de origem antes de confirmar a portabilidade é o erro mais comum
        nesse processo, e o que mais frequentemente causa reinício de carência sem necessidade.
      </p>

      <p>
        Veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes sobre o plano Hapvida</Link> para outras
        dúvidas comuns antes de contratar, ou confira{' '}
        <Link to="/rede-de-atendimento">a rede de atendimento</Link> disponível na sua cidade.
      </p>
    </>
  );
}
