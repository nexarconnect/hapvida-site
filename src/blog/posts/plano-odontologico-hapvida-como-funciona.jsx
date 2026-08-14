import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        O preço do plano odontológico Hapvida muda bastante conforme você já ter ou não o plano médico
        contratado junto. Sozinho, o Odonto Premium sai por R$ 75,84 por mês. Combinado com o plano médico,
        cai para R$ 14,87, como explicamos na{' '}
        <Link to="/plano-odontologico-hapvida">página do plano odontológico</Link>. É esse desconto que
        gera a maior parte das dúvidas de quem está pesquisando.
      </p>

      <h2>Quanto custa o plano odontológico Hapvida</h2>
      <p>
        Existem três opções principais, e o valor final depende de contratar o odontológico junto com o
        plano médico ou separado. O Odonto Premium custa R$ 75,84 no valor normal e R$ 14,87 na condição
        promocional para quem já tem ou está contratando o plano médico. O Odonto Premium Nacional segue a
        mesma lógica: R$ 78,87 no valor normal e R$ 23,25 na condição combinada. Já o Odonto Proteção entra
        de graça (R$ 0,00) dentro da promoção, mas o valor normal isolado não está confirmado, então essa
        informação um consultor confirma no momento da cotação.
      </p>
      <p>
        Além da mensalidade, há uma taxa de adesão: R$ 20,00 na contratação coletiva ou R$ 35,00 na
        individual. E um ponto importante: o odontológico é um contrato separado do plano médico, mesmo
        quando contratados juntos. Isso significa boleto e regras próprias, não uma linha a mais dentro da
        mensalidade médica.
      </p>

      <h2>O que está incluído na cobertura</h2>
      <p>O plano cobre os procedimentos do dia a dia:</p>
      <ul>
        <li>Consultas e avaliações</li>
        <li>Limpeza e prevenção</li>
        <li>Restaurações</li>
        <li>Extrações</li>
        <li>Atendimento de urgência</li>
        <li>Raio-X, conforme o plano contratado</li>
      </ul>
      <p>
        Para empresas, existe o Odonto Proteção Total, que funciona em regime misto: cobertura básica
        somada a procedimentos adicionais, variando conforme a modalidade contratada. Procedimentos fora
        dessa lista, como ortodontia ou implantes, não estão confirmados na cobertura padrão: um consultor
        esclarece o que se aplica ao seu plano antes da contratação.
      </p>

      <h2>Carência e rede de atendimento</h2>
      <p>
        A carência do odontológico segue o mesmo princípio do plano médico: prazos definidos pela ANS, com
        redução para urgência. Segundo a ANS, casos de urgência têm carência reduzida a 24 horas após a
        contratação; os demais procedimentos seguem os prazos regulares, como detalhamos no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>
      <p>
        A rede odontológica é nacional, com clínicas credenciadas em todo o país, o que ajuda quem viaja ou
        muda de cidade sem precisar trocar de plano. Para saber quais clínicas atendem perto de você, o
        consultor confirma a rede disponível na sua região durante a cotação.
      </p>

      <h2>Dá para contratar só o odontológico, sem o plano médico?</h2>
      <p>
        Dá, sim. É um contrato independente do plano médico. Mas tem um detalhe que muita gente perde: o
        maior desconto, de até 80% sobre o valor normal, vale só para quem já tem ou está contratando o
        plano médico Hapvida junto. Contratando o odontológico isolado, o valor cobrado é o cheio.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>O plano odontológico Hapvida tem carência?</h3>
      <p>
        Sim. Os prazos seguem a regulamentação da ANS, com carência reduzida para atendimento de urgência.
      </p>

      <h3>Posso contratar só o plano odontológico, sem o médico?</h3>
      <p>
        Sim, é um contrato separado. Mas o desconto de até 80% no valor da mensalidade vale apenas para
        quem contrata junto com o plano médico.
      </p>

      <h3>A rede odontológica é nacional?</h3>
      <p>Sim, com clínicas credenciadas em todo o país.</p>

      <h3>Quanto custa o plano odontológico Hapvida?</h3>
      <p>
        O Odonto Premium sai por R$ 14,87 combinado com o plano médico (R$ 75,84 sozinho), e o Odonto
        Premium Nacional por R$ 23,25 combinado (R$ 78,87 sozinho). Um consultor confirma os valores e
        condições vigentes no momento da sua cotação.
      </p>

      <h3>Existe taxa de adesão?</h3>
      <p>
        Sim: R$ 20,00 na contratação coletiva e R$ 35,00 na contratação individual, além da mensalidade
        escolhida.
      </p>

      <h3>O que está incluído no plano odontológico?</h3>
      <p>
        Consultas, avaliações, limpeza, prevenção, restaurações, extrações, atendimento de urgência e
        raio-X, este último conforme o plano contratado.
      </p>

      <h3>Vale mais a pena contratar odonto e médico juntos?</h3>
      <p>
        Financeiramente, sim, considerando o desconto aplicado ao odontológico. Mas a resposta certa
        depende do seu orçamento e da cobertura médica que você já tem ou está buscando: vale comparar as
        duas situações com um consultor antes de decidir.
      </p>

      <p>
        Quer saber o valor combinado do plano médico com o odontológico para o seu perfil? Peça uma
        cotação na <Link to="/plano-odontologico-hapvida">página do plano odontológico Hapvida</Link> ou
        confira as demais dúvidas nas{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link>. Se você está decidindo entre
        modalidades, veja também o post sobre{' '}
        <Link to="/blog/plano-hapvida-familiar-dependentes">plano de saúde familiar Hapvida</Link> e a
        lista de <Link to="/planos-hapvida-por-cidade">cidades atendidas</Link>.
      </p>
    </>
  );
}
