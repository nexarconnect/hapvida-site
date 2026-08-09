import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        O reajuste do plano Hapvida assusta quem abre o boleto e vê o valor maior sem entender de onde
        veio o aumento. A causa muda conforme a modalidade contratada, e é isso que decide se o reajuste
        do seu plano segue uma regra fixa ou é negociado caso a caso.
      </p>

      <p>
        <strong>Reajuste alto e você quer comparar outras opções?</strong> Peça a cotação atualizada e veja
        se compensa manter o plano como está ou migrar, sem perder o que já foi cumprido de carência. Veja
        também a página de <Link to="/tipos-de-planos">tipos de plano Hapvida</Link> para entender qual
        modalidade se aplica ao seu contrato.
      </p>

      <h2>O reajuste não é igual para todo mundo</h2>
      <p>
        Existem três modalidades de contratação, e cada uma segue uma lógica de reajuste diferente,
        como detalhamos na página de{' '}
        <Link to="/tipos-de-planos">tipos de plano Hapvida</Link>:
      </p>
      <ul>
        <li>
          <strong>Individual:</strong> o reajuste anual segue o teto definido pela ANS.
        </li>
        <li>
          <strong>Empresarial:</strong> o reajuste é negociado diretamente com a operadora, conforme a
          sinistralidade do grupo.
        </li>
        <li>
          <strong>Adesão</strong> (para quem é filiado a sindicato, conselho profissional ou associação de
          classe conveniada): o reajuste é definido pelo contrato coletivo entre a entidade e a operadora.
        </li>
      </ul>
      <p>
        Antes de reclamar do valor do boleto, vale confirmar em qual dessas três modalidades o seu contrato
        está enquadrado, porque isso muda completamente o motivo do aumento.
      </p>

      <h2>Por que o plano individual tem teto da ANS</h2>
      <p>
        Segundo a <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, os planos individuais e
        familiares têm um percentual máximo de reajuste definido pela própria agência a cada ciclo anual.
        A operadora não pode cobrar acima desse teto nos planos dessa modalidade — mas o percentual exato
        varia de ano para ano, então não dá para cravar um número sem confirmar o índice vigente no momento
        do seu reajuste.
      </p>
      <p>
        Isso não significa que o valor fica congelado: o teto regula o quanto pode subir, não impede que
        suba. Um consultor confirma o percentual aplicado ao seu contrato e, se fizer sentido, mostra outras
        opções de plano individual disponíveis para a sua idade e cidade.
      </p>

      <h2>Como funciona no plano empresarial</h2>
      <p>
        Aqui a lógica é outra: não existe teto da ANS. O reajuste do plano empresarial é negociado
        diretamente entre a empresa contratante e a operadora, levando em conta a sinistralidade do
        grupo — ou seja, o quanto os beneficiários daquela empresa usaram o plano no período anterior.
        Grupo que usa pouco tende a negociar reajustes menores; grupo com uso alto (muitas internações,
        exames e consultas) tende a sentir mais o aumento.
      </p>
      <p>
        Por isso duas empresas do mesmo porte, com o mesmo plano Hapvida, podem ter reajustes bem
        diferentes de um ano para o outro. Se você tem CNPJ ativo, inclusive MEI, e quer entender como isso
        se aplica ao seu caso, veja o post sobre{' '}
        <Link to="/blog/plano-hapvida-empresarial-mei">plano Hapvida empresarial e MEI</Link>.
      </p>

      <h2>O que fazer quando o reajuste pesa no bolso</h2>
      <p>
        Segundo a ANS, o cancelamento de plano de saúde é feito diretamente com a operadora, mas quem quer
        trocar de plano — e não só cancelar — tem um cuidado importante a tomar antes: confirmar a nova
        contratação, incluindo a portabilidade de carências se aplicável, antes de cancelar o plano atual.
        Cancelar primeiro e negociar depois é o erro mais comum de quem troca de plano por causa do
        reajuste, porque cria um período sem cobertura no meio do processo.
      </p>
      <p>
        Se você já cumpriu boa parte das carências no plano atual, a portabilidade evita perder esse
        histórico na migração. Veja como funciona no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>O reajuste do plano Hapvida é igual em todos os contratos?</h3>
      <p>
        Não. Varia conforme a modalidade: individual segue o teto da ANS, empresarial é negociado com a
        operadora conforme a sinistralidade do grupo, e adesão segue o contrato coletivo firmado entre a
        entidade de classe e a operadora.
      </p>

      <h3>Qual o percentual de reajuste deste ano?</h3>
      <p>
        O percentual varia por modalidade e por ciclo, e não é o mesmo todo ano. Um consultor confirma o
        índice vigente aplicado ao seu contrato específico.
      </p>

      <h3>O que é sinistralidade?</h3>
      <p>
        É a relação entre o quanto os beneficiários de um grupo (no plano empresarial) usaram o plano e o
        quanto a operadora arrecadou com aquele grupo. Quanto maior o uso em relação à arrecadação, maior
        tende a ser o reajuste negociado no ano seguinte.
      </p>

      <h3>Posso trocar de plano por causa do reajuste?</h3>
      <p>
        Sim. O recomendado é confirmar a nova contratação — e a portabilidade de carências, se aplicável —
        antes de cancelar o plano atual, para não ficar sem cobertura durante a transição.
      </p>

      <h3>A portabilidade evita o reajuste alto?</h3>
      <p>
        A portabilidade não muda a regra de reajuste do novo plano, mas evita que você recomece a contagem
        de carência ao migrar. Se o motivo da troca for o valor, ela ajuda a migrar sem perder o que já foi
        cumprido.
      </p>

      <h3>O plano de adesão também tem teto de reajuste da ANS?</h3>
      <p>
        Não. Nessa modalidade, o reajuste é definido pelo contrato coletivo entre a entidade (sindicato,
        conselho ou associação) e a operadora, sem o teto que se aplica ao plano individual.
      </p>

      <h3>Como sei quanto o meu plano vai aumentar este ano?</h3>
      <p>
        A operadora comunica o percentual no mês de aniversário do contrato. Se quiser confirmar antes ou
        entender as opções disponíveis, um consultor esclarece o que se aplica ao seu caso.
      </p>

      <h2>Conclusão</h2>
      <p>
        O reajuste incomoda menos quando você sabe de onde ele vem. Individual segue teto da ANS,
        empresarial acompanha a sinistralidade do grupo, adesão segue o contrato com a entidade de classe.
        Se o valor atual pesou no orçamento, peça uma cotação sem compromisso pelo WhatsApp com um
        consultor autorizado e compare com outras opções antes de decidir. Veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano Hapvida e o post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>
    </>
  );
}
