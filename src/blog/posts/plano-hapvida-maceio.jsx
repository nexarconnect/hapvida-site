import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Quem mora em Maceió e pesquisa plano de saúde Hapvida esbarra sempre na mesma dúvida: quanto custa
        aqui, na minha idade? A resposta honesta é que o valor não é fixo, mas dá para entender o que
        define o preço final e como confirmar o número certo para o seu caso, sem depender de tabela
        genérica.
      </p>

      <h2>Quanto custa o plano Hapvida em Maceió</h2>
      <p>
        Hoje o valor de entrada divulgado para Maceió é R$ 131,51 (plano Mix), mas esse número muda
        conforme a faixa etária e a modalidade contratada (individual, familiar ou empresarial); duas
        pessoas de idades diferentes em Maceió podem receber valores bem distintos.
      </p>
      <p>
        Por isso, o número exato do seu perfil só sai na cotação. Confira os planos disponíveis e solicite o
        valor atualizado para Maceió na{' '}
        <Link to="/plano-hapvida/maceio">página do plano Hapvida em Maceió</Link>, direto pelo WhatsApp com
        um consultor autorizado.
      </p>

      <h2>Como funciona a rede em Maceió</h2>
      <p>
        A Hapvida trabalha com duas redes nacionais: a própria, formada por hospitais e HapClínicas
        administrados diretamente pela operadora, e a credenciada, formada por hospitais parceiros. Qual
        delas você acessa em Maceió depende do plano contratado, não é igual para todos. A consultoria
        Nexar atende em Maceió com suporte local, e o consultor confirma quais unidades ficam disponíveis
        para o seu plano antes de qualquer assinatura; essa confirmação faz parte do atendimento. Para ver a
        lista completa por município, acesse a nossa página de{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link>.
      </p>

      <h2>Carência: quanto tempo até poder usar</h2>
      <p>
        De acordo com as regras da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência
        e emergência têm carência máxima de 24 horas; consultas e exames simples entram em até 30 dias. Os
        demais procedimentos seguem a tabela completa da ANS. Se você já tem plano ativo em outra operadora,
        a portabilidade pode reduzir ou eliminar essa espera. Veja como no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em Maceió?</h3>
      <p>
        O valor de entrada divulgado hoje é R$ 131,51 (plano Mix), mas o valor exato do seu perfil depende
        da idade e da modalidade. Um consultor confirma o número certo na cotação para Maceió.
      </p>

      <h3>Qual plano é mais barato em Maceió?</h3>
      <p>
        Depende do seu perfil e da modalidade contratada. A comparação entre as opções disponíveis só faz
        sentido com os seus dados na cotação: é aí que aparece o valor real de cada uma.
      </p>

      <h3>A rede atende em Maceió?</h3>
      <p>
        Sim, por rede própria e credenciada. Qual delas você acessa depende do plano contratado, e a
        consultoria Nexar confirma as unidades disponíveis em Maceió antes de qualquer decisão.
      </p>

      <h3>Quanto tempo depois de contratar já posso usar o plano em Maceió?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, pela regra da ANS. Os
        demais procedimentos seguem a tabela completa e podem variar conforme o histórico de saúde
        declarado.
      </p>

      <h3>Dá para contratar sendo MEI em Maceió?</h3>
      <p>
        Sim. Com CNPJ ativo, inclusive MEI, é possível avaliar a modalidade empresarial, que costuma ter
        condições comerciais próprias. Um consultor explica o que muda para o seu caso.
      </p>

      <h2>Conclusão</h2>
      <p>
        Em Maceió, o número que importa é o da sua idade, não a média divulgada. Solicite uma cotação sem
        compromisso e receba os valores e a lista de unidades da cidade direto pelo WhatsApp, com um
        consultor autorizado. Veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano.
      </p>
    </>
  );
}
