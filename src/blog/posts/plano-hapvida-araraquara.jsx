import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Araraquara é uma das cidades do interior onde o plano de saúde Hapvida costuma entrar na conversa
        pelo preço. Antes de comparar valores, vale entender como a tabela funciona e o que muda o número
        final para o seu perfil.
      </p>

      <h2>Quanto custa o plano Hapvida em Araraquara</h2>
      <p>
        A referência de R$ 157,29 é o valor nacional mais baixo divulgado pela operadora, não necessariamente
        o preço em Araraquara. O valor muda com idade, cidade e modalidade contratada, então a cotação com os
        seus dados é o que define o número real. Veja os planos disponíveis na{' '}
        <Link to="/plano-hapvida/araraquara">página do plano Hapvida em Araraquara</Link>.
      </p>

      <h2>Rede e carência</h2>
      <p>
        Rede própria e credenciada, com validação local pelo consultor. Confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Urgência e emergência em 24
        horas; consultas e exames simples em 30 dias, conforme a{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Qual o valor do plano Hapvida em Araraquara?</h3>
      <p>
        R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano em Araraquara costuma começar acima
        disso. Um consultor confirma o número exato na cotação.
      </p>

      <h3>A rede atende em Araraquara?</h3>
      <p>
        Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis na cidade antes de
        qualquer decisão.
      </p>

      <h3>Quanto tempo até poder usar o plano?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, pela regra da ANS.
      </p>

      <h3>Dá para reduzir a carência com portabilidade?</h3>
      <p>
        Sim, em alguns casos. Veja como funciona no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h3>Dá para contratar como MEI em Araraquara?</h3>
      <p>
        Sim. Com CNPJ ativo, incluindo MEI, é possível avaliar a modalidade empresarial e comparar condições
        com o consultor.
      </p>

      <h2>Conclusão</h2>
      <p>
        Em Araraquara, o valor que importa é o da sua idade. Solicite uma cotação sem compromisso e receba
        os valores confirmados pelo WhatsApp. Veja também o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
