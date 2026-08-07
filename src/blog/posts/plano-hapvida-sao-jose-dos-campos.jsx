import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Quem mora em São José dos Campos e pesquisa plano de saúde Hapvida esbarra em tabelas nacionais que
        não dizem nada sobre a cidade. O caminho mais direto é entender o que define o preço e pedir o
        número certo para o seu perfil.
      </p>

      <h2>Quanto custa o plano Hapvida em São José dos Campos</h2>
      <p>
        A referência inicial divulgada pela operadora é de R$ 157,29. É apenas um ponto de partida: o valor
        final varia por idade, cidade e modalidade de contratação. Duas pessoas da mesma idade podem receber
        propostas diferentes dependendo de contratarem individual, familiar ou empresarial.
      </p>
      <p>
        Confira os planos disponíveis e peça o valor atualizado na{' '}
        <Link to="/plano-hapvida/sao-jose-dos-campos">página do plano Hapvida em São José dos Campos</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        A operadora trabalha com rede própria e credenciada. O consultor valida quais unidades estão
        disponíveis em São José dos Campos antes da assinatura. Veja também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela ANS, urgência e
        emergência entram em 24 horas e consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em São José dos Campos?</h3>
      <p>
        A referência inicial é de R$ 157,29, mas o valor final varia por idade, cidade e modalidade. Um
        consultor confirma o número exato na cotação.
      </p>

      <h3>A rede atende em São José dos Campos?</h3>
      <p>
        Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis antes de qualquer
        decisão.
      </p>

      <h3>Quanto tempo até poder usar o plano?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, conforme a regra da{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>.
      </p>

      <h3>Dá para reduzir a carência com portabilidade?</h3>
      <p>
        Sim, em alguns casos. Veja como funciona no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h3>O plano odontológico vem junto?</h3>
      <p>
        Há opções que combinam saúde e odonto, dependendo da modalidade e da disponibilidade comercial da
        região.
      </p>

      <h2>Conclusão</h2>
      <p>
        Em São José dos Campos, o número que vale é o da sua idade e modalidade, não a média nacional.
        Solicite uma cotação sem compromisso pelo WhatsApp e confirme valor e rede com um consultor
        autorizado.
      </p>
    </>
  );
}
