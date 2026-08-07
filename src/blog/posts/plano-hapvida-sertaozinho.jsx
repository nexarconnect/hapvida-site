import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Cidade média, dúvida grande: quanto custa o plano de saúde Hapvida em Sertãozinho? Não existe um
        número único que valha para todos os perfis — mas dá para entender o que muda o preço e como
        confirmar o valor certo para o seu caso.
      </p>

      <h2>Quanto custa o plano Hapvida em Sertãozinho</h2>
      <p>
        A referência inicial divulgada é de R$ 157,29, ponto de partida da tabela oficial. O valor final
        varia conforme a idade, a cidade e a modalidade contratada — por isso o número exato do seu caso só
        sai na cotação. Veja os planos disponíveis na{' '}
        <Link to="/plano-hapvida/sertaozinho">página do plano Hapvida em Sertãozinho</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor antes de qualquer contratação — a
        lista completa por cidade fica na página de{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link>. Urgência e emergência entram em 24 horas
        e consultas e exames simples em 30 dias, conforme a{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em Sertãozinho?</h3>
      <p>
        A referência inicial é R$ 157,29, mas o valor final varia por idade e modalidade. Um consultor
        confirma o número exato na cotação.
      </p>

      <h3>A rede atende em Sertãozinho?</h3>
      <p>
        Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis na cidade antes de
        qualquer decisão.
      </p>

      <h3>Quanto tempo até poder usar o plano?</h3>
      <p>
        Urgência e emergência em 24 horas; consultas e exames simples em 30 dias, pela regra da ANS.
      </p>

      <h3>Dá para reduzir a carência?</h3>
      <p>
        Em alguns casos, sim, por portabilidade — veja o post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h3>Dá para contratar como MEI em Sertãozinho?</h3>
      <p>
        Sim. Com CNPJ ativo, incluindo MEI, é possível avaliar a modalidade empresarial com condições
        próprias.
      </p>

      <h2>Conclusão</h2>
      <p>
        Em Sertãozinho, o valor real depende do seu perfil. Peça uma cotação sem compromisso e confirme
        valor e rede da sua cidade direto pelo WhatsApp.
      </p>
    </>
  );
}
