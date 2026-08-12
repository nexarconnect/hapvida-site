import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Cancelamento do plano Hapvida é um pedido feito diretamente com a operadora, mas o jeito como você
        conduz esse processo decide se você fica um dia sem cobertura ou não. Antes de cancelar por
        qualquer motivo (mudança de cidade, reajuste que pesou no orçamento, troca de operadora), vale
        entender a ordem certa dos passos. Se a dúvida for outra, dá para pedir uma{' '}
        <Link to="/plano-individual-hapvida">cotação sem compromisso</Link> e comparar antes de decidir
        qualquer coisa.
      </p>

      <h2>Como funciona o pedido de cancelamento</h2>
      <p>
        O cancelamento é feito diretamente com a operadora, não com a consultoria que vendeu o plano.
        Segundo o que já explicamos nas{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes sobre o plano Hapvida</Link>, se a intenção
        for trocar de plano, o recomendado é confirmar a nova contratação antes de cancelar o atual, para
        não ficar no meio do caminho sem cobertura nenhuma. Parece óbvio, mas é o erro mais comum de quem
        decide trocar de operadora com pressa.
      </p>

      <h2>O cuidado real: não cancelar antes de garantir a portabilidade</h2>
      <p>
        Se o motivo do cancelamento é migrar para outro plano Hapvida ou trocar de modalidade, existe um
        caminho que evita perder o que você já cumpriu de carência: a portabilidade. Como explicamos no
        post sobre <Link to="/blog/portabilidade-para-hapvida">portabilidade para o plano Hapvida</Link>,
        cancelar o plano de origem antes de confirmar a elegibilidade para portabilidade é o erro que mais
        frequentemente causa reinício de carência sem necessidade. Na prática: primeiro confirma, depois
        cancela. Nunca o contrário.
      </p>

      <h2>Cancelar por causa do reajuste pode não ser a melhor saída</h2>
      <p>
        Muita gente pensa em cancelar assim que vê o valor da renovação. Mas o motivo do reajuste muda
        conforme a modalidade contratada, e às vezes a solução não é cancelar, é trocar de modalidade. Veja
        o que detalhamos em{' '}
        <Link to="/blog/reajuste-plano-hapvida-como-funciona">reajuste do plano Hapvida</Link>: quem está no
        individual e tem CNPJ ativo (inclusive MEI) pode ter condição melhor no empresarial, por exemplo. Um
        consultor consegue montar essa comparação com valores reais antes de você decidir cancelar de vez.
      </p>

      <h2>O que verificar antes de cancelar</h2>
      <p>
        Alguns pontos valem checagem antes de formalizar o pedido junto à operadora:
      </p>
      <ul>
        <li>
          <strong>Tem plano novo confirmado?</strong> Só cancele o atual depois de ter a nova contratação
          fechada, principalmente se pretende usar portabilidade de carências.
        </li>
        <li>
          <strong>Tem dependentes no contrato?</strong> Cada beneficiário incluído tem sua própria situação;
          confirme com o consultor como o cancelamento afeta cônjuge e filhos incluídos no mesmo plano, como
          descrevemos em{' '}
          <Link to="/blog/plano-hapvida-familiar-dependentes">plano de saúde familiar Hapvida</Link>.
        </li>
        <li>
          <strong>Está em meio a algum tratamento?</strong> Vale confirmar com o consultor o impacto do
          cancelamento em procedimentos já em andamento antes de formalizar o pedido.
        </li>
      </ul>

      <h2>Perguntas frequentes</h2>

      <h3>Como cancelo o plano Hapvida?</h3>
      <p>
        O cancelamento é feito diretamente com a operadora. Se a intenção for trocar de plano, o
        recomendado é confirmar a nova contratação (e a portabilidade de carências, se aplicável) antes de
        cancelar o atual, para não perder cobertura no meio do processo.
      </p>

      <h3>Cancelar e contratar de novo depois faz eu perder a carência já cumprida?</h3>
      <p>
        Pode fazer, sim, se o cancelamento acontecer antes de confirmar a portabilidade. Por isso o caminho
        mais seguro é validar a elegibilidade com um consultor antes de cancelar qualquer coisa.
      </p>

      <h3>Vale a pena cancelar só porque o plano reajustou?</h3>
      <p>
        Nem sempre. Às vezes o problema não é a operadora, é a modalidade contratada. Comparar o valor em
        outra modalidade (empresarial, por exemplo, para quem tem CNPJ) costuma resolver sem precisar
        cancelar.
      </p>

      <h3>Posso cancelar o plano de um dependente sem cancelar o meu?</h3>
      <p>
        A situação de cada beneficiário incluído no contrato pode ser tratada separadamente; um consultor
        confirma como isso funciona no seu caso específico.
      </p>

      <h3>O cancelamento tem multa?</h3>
      <p>
        As condições contratuais variam conforme o plano e a modalidade. Um consultor confirma as
        condições específicas do seu contrato antes de você formalizar o pedido.
      </p>

      <h3>Quem cancela, a Nexar ou a Hapvida?</h3>
      <p>
        O pedido de cancelamento é processado pela operadora. A Nexar é a consultoria autorizada que
        acompanha o processo e ajuda a confirmar os próximos passos, mas não é a operadora do plano.
      </p>

      <h2>Conclusão</h2>
      <p>
        Cancelar o plano Hapvida sem planejamento é o jeito mais fácil de ficar descoberto por alguns dias
        ou de perder carência já cumprida à toa. Antes de formalizar qualquer pedido, vale conversar com um
        consultor autorizado e confirmar se existe um caminho melhor, seja portabilidade, seja troca de
        modalidade. Peça uma cotação sem compromisso pelo WhatsApp e compare antes de decidir. Veja também
        os posts sobre <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link> e sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>
    </>
  );
}
