import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        O reajuste do plano Hapvida chegou e o boleto veio mais caro. Antes de decidir se troca de
        operadora, vale entender uma coisa: o aumento não é igual para todo mundo. Individual e
        empresarial seguem regras diferentes, e é essa diferença que explica por que o vizinho pagou
        menos (ou mais) que você. Se o valor novo pesou no orçamento, dá para pedir uma{' '}
        <Link to="/perguntas-frequentes">cotação</Link> e comparar antes de renovar sem pensar.
      </p>

      <h2>Por que o plano reajusta todo ano</h2>
      <p>
        Reajuste anual não é exclusividade da Hapvida — é regra do setor, aplicada a qualquer operadora
        de saúde suplementar no Brasil. O motivo é simples: o custo de manter a rede médica sobe (mais
        exames, mais procedimentos, inflação médica em geral), e a mensalidade acompanha essa conta.
        Mas o jeito como esse aumento é calculado muda conforme a modalidade do seu contrato.
      </p>

      <h2>Plano individual: o reajuste segue o teto da ANS</h2>
      <p>
        No plano individual, o reajuste anual segue o teto definido pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>. Isso significa que a operadora
        não pode aplicar um percentual acima do limite fixado pela agência — é um mecanismo pensado
        justamente para dar previsibilidade a quem contrata por CPF, sem CNPJ. A ANS divulga esse teto
        anualmente, e o percentual varia de ano para ano conforme a metodologia de cálculo da agência.
        Um consultor confirma o percentual vigente e como ele foi aplicado no seu contrato específico.
      </p>
      <p>
        Isso está detalhado na página do{' '}
        <Link to="/plano-individual-hapvida">plano individual Hapvida</Link>: é uma das poucas garantias
        regulatórias que separam o individual do empresarial, e costuma pesar na decisão de quem está
        escolhendo entre as duas modalidades.
      </p>

      <h2>Plano empresarial: o reajuste é negociado por sinistralidade</h2>
      <p>
        Já no plano empresarial, não existe teto da ANS. O reajuste é negociado diretamente com a
        operadora e considera a sinistralidade do grupo — ou seja, quanto aquele conjunto de
        beneficiários usou o plano no período anterior. Grupo que usou pouco tende a negociar um
        reajuste menor; grupo com uso alto de internações e procedimentos caros pode ver um aumento bem
        acima do que seria aplicado no individual. Por isso o percentual varia tanto de empresa para
        empresa, mesmo dentro da mesma operadora.
      </p>
      <p>
        Essa diferença está resumida na comparação de{' '}
        <Link to="/tipos-de-planos">tipos de plano</Link>, que também cobre a modalidade adesão — nesse
        caso, o reajuste é definido pelo contrato coletivo firmado entre a entidade de classe (sindicato,
        conselho, associação) e a operadora, seguindo uma lógica própria, diferente tanto do individual
        quanto do empresarial direto.
      </p>

      <h2>O que fazer quando o boleto vem mais caro</h2>
      <p>
        Primeiro passo: identificar a modalidade do seu contrato, porque isso muda o que é esperado. Se
        é individual e o percentual aplicado parece destoar do teto da ANS daquele ano, vale confirmar
        com um consultor se o reajuste foi calculado corretamente. Se é empresarial, o aumento reflete a
        sinistralidade do grupo — nesse caso, às vezes trocar de modalidade ou renegociar as condições
        do contrato coletivo compensa mais do que simplesmente absorver o valor novo.
      </p>
      <p>
        Segundo passo, e talvez o mais importante: comparar. Reajuste alto é o principal motivo que leva
        alguém a pesquisar outra operadora — mas trocar não precisa significar recomeçar carência do
        zero. Se você já cumpriu os prazos no plano atual, a portabilidade prevista pela ANS pode
        aproveitar isso na migração. Detalhamos como funciona no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>O reajuste é o mesmo valor para todo mundo?</h3>
      <p>
        Não. No individual, segue o teto definido pela ANS, igual para todos os contratos dessa
        modalidade. No empresarial, varia conforme a sinistralidade de cada grupo, negociada
        diretamente com a operadora.
      </p>

      <h3>Posso contestar um reajuste que considero abusivo?</h3>
      <p>
        Se o contrato é individual e o percentual aplicado parece superar o teto da ANS para aquele
        ano, um consultor pode ajudar a confirmar os números do seu boleto contra a regra vigente. Para
        contratos empresariais, a negociação de reajuste é feita diretamente com a operadora, conforme
        os termos do contrato coletivo.
      </p>

      <h3>Trocar de plano por causa do reajuste vale a pena?</h3>
      <p>
        Depende do que você encontra na comparação. Vale pedir a cotação atual e olhar preço, rede e
        condições lado a lado antes de decidir — às vezes o reajuste reflete um custo real de mercado, e
        a nova cotação sai parecida.
      </p>

      <h3>Se eu trocar de operadora, perco as carências que já cumpri?</h3>
      <p>
        Não necessariamente. A portabilidade de carências prevista pela ANS permite aproveitar os
        prazos já cumpridos no plano atual ao migrar, desde que os requisitos do contrato de origem
        sejam atendidos.
      </p>

      <h3>O reajuste por faixa etária é a mesma coisa que o reajuste anual?</h3>
      <p>
        Não. São dois mecanismos diferentes: o reajuste anual se aplica ao contrato inteiro, todo ano, e
        segue a regra da modalidade (teto ANS ou negociação por sinistralidade). Já a mudança de faixa
        etária acontece quando o beneficiário completa a idade que muda a tabela, e altera o valor
        individual daquela pessoa dentro do plano familiar ou empresarial.
      </p>

      <h3>Empresa pequena também sofre reajuste por sinistralidade?</h3>
      <p>
        Sim, a lógica se aplica a qualquer contrato empresarial, independente do porte. Grupos menores
        podem ter reajustes mais variáveis justamente porque um único evento de alto custo pesa mais na
        sinistralidade proporcional.
      </p>

      <h2>Conclusão</h2>
      <p>
        Reajuste incomoda, mas entender a regra por trás dele ajuda a decidir o próximo passo com mais
        clareza: renegociar, no caso do empresarial, ou confirmar o cálculo, no caso do individual. Se o
        valor novo pesou demais no orçamento, peça uma cotação sem compromisso e compare com o que você
        paga hoje — o atendimento segue pelo WhatsApp com os valores disponíveis para a sua cidade e
        perfil. Veja também a lista completa de{' '}
        <Link to="/planos-hapvida-por-cidade">cidades atendidas</Link>.
      </p>
    </>
  );
}
