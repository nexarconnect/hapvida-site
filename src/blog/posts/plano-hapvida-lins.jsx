import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Morar em Lins e pesquisar plano de saúde Hapvida tem uma vantagem: dá para falar com quem conhece a
        região. A consultoria Nexar atende em Lins com suporte local, e a primeira coisa que um bom
        atendimento faz é confirmar o valor real para o seu perfil, em vez de repetir tabela nacional.
      </p>

      <h2>Quanto custa o plano Hapvida em Lins</h2>
      <p>
        Os valores variam por idade, cidade e modalidade de contratação — individual, familiar ou
        empresarial. A referência inicial divulgada pela operadora é de R$ 157,29, mas não existe um número
        único que valha para todos os perfis em Lins. Para saber o que se aplica ao seu caso, veja a{' '}
        <Link to="/plano-hapvida/lins">página do plano Hapvida em Lins</Link> e peça a cotação.
      </p>

      <h2>Rede e carência</h2>
      <p>
        A operadora trabalha com rede própria e credenciada, e o consultor valida quais hospitais, clínicas
        e laboratórios estão disponíveis para Lins antes de qualquer decisão — confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela regra da{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência entram em 24
        horas e consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em Lins?</h3>
      <p>
        Não há um número único: o valor depende da sua idade e da modalidade escolhida. Um consultor
        confirma o valor exato para o seu caso.
      </p>

      <h3>A rede atende em Lins?</h3>
      <p>
        Sim, com rede própria e credenciada, e suporte local da consultoria Nexar. O consultor valida as
        unidades disponíveis antes de qualquer decisão.
      </p>

      <h3>Quanto tempo até poder usar o plano?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, conforme a ANS.
      </p>

      <h3>Dá para reduzir a carência com portabilidade?</h3>
      <p>
        Sim, em alguns casos — veja como funciona no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h3>O plano odontológico está incluso?</h3>
      <p>
        Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
        região.
      </p>

      <h2>Conclusão</h2>
      <p>
        Para saber o preço do Hapvida em Lins, o caminho é a cotação com os seus dados. Solicite uma
        cotação sem compromisso pelo WhatsApp e receba valor e rede da sua cidade.
      </p>
    </>
  );
}
