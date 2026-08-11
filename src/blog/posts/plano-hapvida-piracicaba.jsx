import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Piracicaba fecha a lista das cidades do interior onde a consultoria Nexar atende. Quem pesquisa o
        plano de saúde Hapvida por lá quer uma resposta direta: quanto custa, na minha idade?
      </p>

      <h2>Quanto custa o plano Hapvida em Piracicaba</h2>
      <p>
        R$ 157,29 é o valor nacional mais baixo divulgado pela operadora, mas Piracicaba nem sempre segue
        essa mesma tabela de entrada: os planos disponíveis por aqui podem ser outros. O valor final varia
        por idade, modalidade contratada e disponibilidade comercial da região; o valor exato para o seu
        perfil é confirmado por um consultor. Veja as opções na{' '}
        <Link to="/plano-hapvida/piracicaba">página do plano Hapvida em Piracicaba</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local. Confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência em 24 horas;
        consultas e exames simples em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em Piracicaba?</h3>
      <p>
        R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano disponível em Piracicaba costuma ser
        outro, com valor de entrada diferente. Um consultor confirma o número exato na cotação.
      </p>

      <h3>A rede atende em Piracicaba?</h3>
      <p>
        Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis na cidade antes de
        qualquer decisão.
      </p>

      <h3>Quanto tempo até poder usar o plano?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, conforme a ANS.
      </p>

      <h3>Dá para reduzir a carência com portabilidade?</h3>
      <p>
        Sim, em alguns casos. Veja como funciona no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h3>Dá para contratar como MEI em Piracicaba?</h3>
      <p>
        Sim. Com CNPJ ativo, incluindo MEI, é possível avaliar a modalidade empresarial e comparar condições
        com o consultor.
      </p>

      <h2>Conclusão</h2>
      <p>
        Em Piracicaba, o valor real depende do seu perfil. Peça uma cotação sem compromisso e compare as
        opções. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
