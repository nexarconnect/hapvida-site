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
        A referência inicial divulgada pela operadora é de R$ 157,29. O valor final depende da sua idade, da
        modalidade contratada e da disponibilidade comercial da região; os demais planos e o valor exato
        para o seu perfil são confirmados por um consultor na cotação. Veja as opções na{' '}
        <Link to="/plano-hapvida/sao-carlos">página do plano Hapvida em São Carlos</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor — confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência em 24 horas;
        consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em São Carlos?</h3>
      <p>
        A referência inicial é R$ 157,29, mas o valor final varia por idade e modalidade. Um consultor
        confirma o número exato na cotação.
      </p>

      <h3>A rede atende em São Carlos?</h3>
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
        Em alguns casos, sim, por portabilidade — veja o post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h3>O plano odontológico está incluso?</h3>
      <p>
        Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
        região.
      </p>

      <h2>Conclusão</h2>
      <p>
        Em São Carlos, o valor real depende do seu perfil. Solicite uma cotação sem compromisso e confirme o
        valor da sua idade.
      </p>
    </>
  );
}
