import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Pesquisar plano de saúde Hapvida em Limeira costuma começar com uma pergunta simples: quanto custa
        aqui, na minha idade? A resposta certa não é um número genérico: é o valor calculado para o seu
        perfil.
      </p>

      <h2>Quanto custa o plano Hapvida em Limeira</h2>
      <p>
        A referência inicial divulgada pela operadora é de R$ 157,29, ponto de partida da tabela oficial. O
        valor final varia por idade, cidade e modalidade de contratação; o número exato do seu caso sai na
        cotação, disponível na{' '}
        <Link to="/plano-hapvida/limeira">página do plano Hapvida em Limeira</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor. Veja também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência em 24 horas;
        consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em Limeira?</h3>
      <p>
        A referência inicial é R$ 157,29, mas o valor final varia por idade e modalidade. Um consultor
        confirma o número exato na cotação para Limeira.
      </p>

      <h3>A rede atende em Limeira?</h3>
      <p>
        Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis antes de qualquer
        decisão.
      </p>

      <h3>Quanto tempo até poder usar o plano?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, conforme a regra da ANS.
      </p>

      <h3>Dá para reduzir a carência?</h3>
      <p>
        Em alguns casos, sim, por portabilidade. Veja como funciona no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h3>O plano odontológico vem junto?</h3>
      <p>
        Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
        região.
      </p>

      <h2>Conclusão</h2>
      <p>
        O preço em Limeira depende do seu perfil, e só a cotação revela o valor real. Solicite uma cotação
        sem compromisso pelo WhatsApp.
      </p>
    </>
  );
}
