import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Em Pirassununga, quem pesquisa plano de saúde Hapvida costuma priorizar cobertura robusta. Antes de
        decidir entre as opções disponíveis, vale entender o que define o preço e como confirmar o valor
        certo para o seu perfil.
      </p>

      <h2>Quanto custa o plano Hapvida em Pirassununga</h2>
      <p>
        R$ 157,29 é o valor nacional mais baixo divulgado pela operadora, mas Pirassununga nem sempre segue
        essa mesma tabela de entrada: os planos disponíveis por aqui podem ser outros. O valor final varia
        conforme a idade, a modalidade contratada e a disponibilidade comercial da região; o número exato
        para o seu caso é confirmado por um consultor. Veja as opções na{' '}
        <Link to="/plano-hapvida/pirassununga">página do plano Hapvida em Pirassununga</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor. Confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência em 24 horas;
        consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em Pirassununga?</h3>
      <p>
        R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano disponível em Pirassununga costuma
        ser outro, com valor de entrada diferente. Um consultor confirma o número exato na cotação.
      </p>

      <h3>A rede atende em Pirassununga?</h3>
      <p>
        Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis na cidade antes de
        qualquer decisão.
      </p>

      <h3>Quanto tempo até poder usar o plano?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, conforme a ANS.
      </p>

      <h3>Dá para reduzir a carência?</h3>
      <p>
        Em alguns casos, sim, por portabilidade. Veja o post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h3>O plano odontológico está incluso?</h3>
      <p>
        Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
        região.
      </p>

      <h2>Conclusão</h2>
      <p>
        Em Pirassununga, o valor real depende do seu perfil. Solicite uma cotação sem compromisso e confirme
        o valor e a rede da sua cidade. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
