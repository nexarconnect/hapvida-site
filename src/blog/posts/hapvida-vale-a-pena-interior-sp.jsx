import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        O plano Hapvida no interior de SP costuma entrar na conversa pelo preço, e é justamente aí que a
        dúvida aparece: vale a pena? A resposta honesta depende de três coisas: quanto você paga, o que a
        rede cobre na sua cidade e quanto tempo você espera para começar a usar. Vamos por partes.
      </p>

      <h2>Quanto custa: o valor que você vê não é o valor que você paga</h2>
      <p>
        A referência inicial divulgada é de R$ 157,29, e esse número aparece em quase toda busca por preço.
        Só que ele é um ponto de partida, não uma etiqueta. Como explicamos nas nossas{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link>, a tabela oficial muda conforme a
        região, a faixa etária e a modalidade contratada: individual, familiar ou empresarial.
      </p>
      <p>
        Na prática, duas pessoas da mesma cidade podem receber valores bem diferentes. Idade é o fator que
        mais mexe no cálculo. Município também: a tabela de Bauru não é a mesma de São José dos Campos.
        Por isso a única forma de saber quanto ficaria para você é pedir a cotação com os seus dados:
        qualquer valor exato fora disso seria chute.
      </p>
      <p>
        <strong>Quer o número do seu caso?</strong> Veja a página da sua cidade e solicite a cotação pelo
        WhatsApp: <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/ribeirao-preto">Ribeirão Preto</Link>,{' '}
        <Link to="/plano-hapvida/franca">Franca</Link> ou{' '}
        <Link to="/plano-hapvida/sao-jose-dos-campos">São José dos Campos</Link>. O retorno vem com os
        valores disponíveis para o seu perfil.
      </p>

      <h2>A rede é o que mais pesa na decisão</h2>
      <p>
        Preço baixo com rede que não atende perto de casa vira problema no primeiro exame. Esse é o ponto
        que separa quem fica satisfeito de quem se arrepende depois.
      </p>
      <p>
        O modelo da Hapvida é diferente do de outras operadoras: boa parte do atendimento acontece em rede
        própria (hospitais, clínicas e pronto atendimentos da própria operadora) complementada por rede
        credenciada. Segundo os números divulgados pela operadora, são mais de 87 unidades hospitalares
        próprias no país. Isso costuma explicar o preço mais competitivo, já que a operadora controla a
        própria estrutura.
      </p>
      <p>
        Mas olha: rede nacional grande não garante nada sobre a sua rua. O que importa é o que existe no
        seu município e nas cidades vizinhas. Antes de assinar, confira a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> e peça ao consultor a lista de hospitais,
        clínicas e laboratórios disponíveis para a sua cidade; essa validação faz parte do atendimento.
      </p>
      <p>
        A consultoria Nexar atende hoje em Bauru, Ribeirão Preto, Franca, São José dos Campos, Sertãozinho,
        Lins, Araraquara, Limeira, Barretos, Pirassununga, Marília, São Carlos e Piracicaba.
      </p>

      <h2>Carência: quanto tempo até poder usar</h2>
      <p>
        De acordo com as regras da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, existem
        limites máximos de carência por tipo de procedimento. No plano Hapvida, as referências mais
        procuradas são urgência e emergência em 24 horas e consultas e exames simples em 30 dias.
      </p>
      <p>
        Para internação, cirurgia eletiva, parto e casos de doença preexistente, os prazos são maiores e
        seguem a tabela completa da ANS. Se você já tem plano ativo em outra operadora, a portabilidade pode
        reduzir ou eliminar essa espera. Detalhamos os dois caminhos no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h2>Para quem costuma valer a pena</h2>
      <p>
        Faz sentido pesquisar se você mora em uma das cidades com rede consolidada, busca custo mensal
        previsível e usa o plano principalmente para consultas, exames e emergências. Também vale muito a
        pena para quem tem CNPJ ativo (incluindo MEI). Planos empresariais tendem a ter condições
        comerciais diferentes das do individual, conforme a regra disponível para cada região. Veja o que
        muda no post sobre{' '}
        <Link to="/blog/plano-hapvida-empresarial-mei">plano Hapvida empresarial e MEI</Link>.
      </p>
      <p>
        Agora, se você já tem médicos de confiança fora da rede e não pretende trocar, ou mora em um
        município sem unidade próxima, a conta pode não fechar. É melhor descobrir isso antes da assinatura
        do que depois.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>O plano Hapvida é mais barato no interior de SP?</h3>
      <p>
        O valor varia por município, faixa etária e modalidade: não existe um preço único do interior. A
        referência inicial de R$ 157,29 é estimativa baseada nas tabelas vigentes e pode mudar sem aviso
        prévio. Um consultor confirma o valor exato para a sua cidade e idade.
      </p>

      <h3>Quanto tempo depois de contratar eu já posso usar?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias. Os demais procedimentos
        seguem os prazos da ANS e podem variar conforme o histórico de saúde declarado na contratação.
      </p>

      <h3>Dá para não esperar a carência?</h3>
      <p>
        Em alguns casos, sim. Quem já tem plano ativo e cumpriu as carências pode avaliar a portabilidade,
        prevista nas regras da ANS. A contratação empresarial também costuma ter condições diferentes. A
        avaliação é individual.
      </p>

      <h3>A rede atende na minha cidade?</h3>
      <p>
        A operadora trabalha com rede própria e credenciada. Durante o atendimento, o consultor valida quais
        hospitais, clínicas e laboratórios estão disponíveis para o seu município antes de qualquer decisão.
      </p>

      <h3>O plano odontológico vem junto?</h3>
      <p>
        Há opções que combinam saúde e odonto, dependendo da modalidade e da disponibilidade comercial da
        região. O consultor mostra as alternativas no momento da cotação.
      </p>

      <h3>Posso contratar sendo MEI?</h3>
      <p>
        Sim. Com empresa ativa, inclusive MEI, é possível avaliar a modalidade empresarial, que costuma ter
        regra comercial própria conforme a região.
      </p>

      <h2>Conclusão</h2>
      <p>
        Vale a pena quando o preço cabe no orçamento <em>e</em> a rede resolve a sua rotina. Os dois lados
        precisam fechar. E os dois só dá para conferir com os seus dados na mesa: sua idade, sua cidade, seu
        tipo de contratação.
      </p>
      <p>
        Solicite uma cotação sem compromisso e receba os valores da sua cidade pelo WhatsApp. Se quiser
        começar pelo mapa, veja a página de{' '}
        <Link to="/plano-hapvida/marilia">Marília</Link>,{' '}
        <Link to="/plano-hapvida/piracicaba">Piracicaba</Link> ou{' '}
        <Link to="/plano-hapvida/sao-carlos">São Carlos</Link>. Depois de contratar, veja também o que o{' '}
        <Link to="/blog/tecnologia-plano-hapvida-app-teleconsulta">
          app e a teleconsulta do plano Hapvida
        </Link>{' '}
        resolvem no dia a dia.
      </p>
    </>
  );
}
