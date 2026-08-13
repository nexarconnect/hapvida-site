import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Plano Hapvida é bom e vale o preço que você vai pagar? Depende de quatro critérios, e nenhum deles
        é a nota que alguém deu na internet. Plano bom no abstrato não existe: existe plano que resolve o
        seu caso, na sua cidade, no seu orçamento. Abaixo, os quatro pontos que decidem isso.
      </p>

      <h2>Antes dos critérios: o que qualquer plano já é obrigado a cobrir</h2>
      <p>
        Muita gente começa perguntando se o plano cobre consulta, exame ou internação. Segundo as regras da{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, todo plano de saúde regulamentado
        precisa cobrir, no mínimo, o Rol de Procedimentos e Eventos em Saúde da agência, conforme a
        segmentação contratada: ambulatorial, hospitalar, com ou sem obstetrícia.
      </p>
      <p>
        Ou seja: cobertura básica não é diferencial de operadora nenhuma, é obrigação legal. O que separa um
        plano do outro é o resto: onde você é atendido, quando pode começar, quanto custa de verdade e como
        é usar no dia a dia.
      </p>
      <p>
        <strong>Quer avaliar com números reais?</strong> Peça a cotação com sua idade e cidade: é o único
        jeito de aplicar os quatro critérios ao seu caso. Comece pela página da sua região:{' '}
        <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/ribeirao-preto">Ribeirão Preto</Link>,{' '}
        <Link to="/plano-hapvida/franca">Franca</Link> ou{' '}
        <Link to="/plano-hapvida/sao-jose-dos-campos">São José dos Campos</Link>.
      </p>

      <h2>Critério 1: existe atendimento perto de você?</h2>
      <p>
        Esse é o que mais decide satisfação, e o mais ignorado na pesquisa. A Hapvida trabalha em dois
        níveis: rede própria, com unidades administradas pela operadora, e rede credenciada, com prestadores
        contratados para completar a cobertura. Pelos números divulgados pela própria operadora, são mais de
        87 unidades hospitalares, mais de 75 clínicas, mais de 22 prontos-atendimentos e mais de 15
        laboratórios e centros de imagem no país.
      </p>
      <p>
        Só que número nacional não responde a pergunta que importa. A composição entre rede própria e
        credenciada muda de cidade para cidade, e existe município atendido pela consultoria onde o
        atendimento se dá por rede credenciada, sem unidade própria. Isso não é problema em si: atendimento
        credenciado é atendimento. Vira problema quando você assume uma coisa e encontra outra.
      </p>
      <p>
        Antes de assinar, confira a <Link to="/rede-de-atendimento">rede de atendimento</Link> da sua cidade
        e peça ao consultor a lista de hospitais, clínicas e laboratórios disponíveis para o seu município.
        Essa validação faz parte do atendimento e leva minutos. O detalhamento de como os dois níveis
        funcionam está no post sobre{' '}
        <Link to="/blog/rede-de-atendimento-hapvida-como-funciona">a rede de atendimento Hapvida</Link>.
      </p>

      <h2>Critério 2: quanto tempo até poder usar</h2>
      <p>
        De acordo com as regras da ANS, existem prazos máximos de carência por tipo de procedimento. As
        referências mais procuradas são urgência e emergência em 24 horas e consultas e exames simples em 30
        dias. Internação, cirurgia eletiva, parto e casos de doença preexistente seguem a tabela completa da
        agência, com prazos maiores.
      </p>
      <p>
        Quem já tem plano ativo em outra operadora e cumpriu as carências pode avaliar a portabilidade,
        também prevista pela ANS, e aproveitar o tempo já cumprido. Quem tem CNPJ ativo, incluindo MEI,
        costuma encontrar condições diferentes na modalidade empresarial. Os dois caminhos estão detalhados
        nos posts sobre <Link to="/blog/carencia-plano-hapvida">carência</Link> e{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade</Link>.
      </p>
      <p>
        Uma ressalva que vale mais que qualquer dica de economia: doença ou lesão preexistente precisa ser
        declarada no formulário de saúde. Omitir não elimina a carência: só cria o risco de a operadora
        negar cobertura depois, justamente quando você precisar.
      </p>

      <h2>Critério 3: o custo real, não a mensalidade anunciada</h2>
      <p>
        A referência inicial divulgada no site é de R$ 157,29. Esse número é ponto de partida, não etiqueta:
        como explicamos nas <Link to="/perguntas-frequentes">perguntas frequentes</Link>, a tabela oficial
        varia conforme a região, a faixa etária e a modalidade contratada.
      </p>
      <p>
        Idade é o fator que mais mexe no cálculo: o plano individual usa faixas etárias definidas pela ANS,
        e a faixa mais nova tende a custar menos. Por isso duas pessoas da mesma cidade recebem valores
        diferentes, e por isso não dá para estimar o valor de uma família somando cabeças.
      </p>
      <p>
        Tem ainda dois pontos que mudam o custo ao longo do tempo. A coparticipação troca mensalidade menor
        por uma taxa quando você usa determinados procedimentos, e compensa ou não dependendo da sua
        frequência de uso. O modelo está explicado no post sobre{' '}
        <Link to="/blog/coparticipacao-plano-de-saude-explicada">coparticipação</Link>. E o reajuste anual:
        no individual, ele segue o teto definido pela ANS; no empresarial, é negociado com a operadora
        conforme a sinistralidade do grupo.
      </p>

      <h2>Critério 4: como é usar depois de contratado</h2>
      <p>
        Plano se julga no uso, não na assinatura. Segundo a própria Hapvida, o aplicativo concentra o que a
        rotina exige: agendar consultas e exames, consultar resultados, emitir a 2ª via do boleto, acessar a
        carteirinha digital e consultar a rede credenciada. O Portal do Beneficiário oferece os mesmos
        serviços pelo computador.
      </p>
      <p>
        No agendamento dá para escolher entre consulta presencial e teleconsulta pelo mesmo caminho. A
        disponibilidade de teleconsulta e as especialidades variam conforme a modalidade e a região, então
        pergunte ao consultor se ela está inclusa no plano que você está avaliando. Mais detalhes no post
        sobre <Link to="/blog/tecnologia-plano-hapvida-app-teleconsulta">app e teleconsulta</Link>.
      </p>

      <h2>Quando o plano Hapvida não é a melhor escolha</h2>
      <p>
        Seria fácil terminar dizendo que serve para todo mundo. Não serve.
      </p>
      <p>
        Se você já tem médicos de confiança fora da rede e não pretende trocar, a conta provavelmente não
        fecha: o modelo da operadora concentra atendimento na própria estrutura e nos credenciados dela. Se
        você mora em um município sem unidade próxima e precisa de atendimento frequente, o deslocamento
        pesa. E se a sua prioridade é escolher livremente qualquer prestador, esse não é o tipo de produto
        que entrega isso.
      </p>
      <p>
        Descobrir isso antes da assinatura custa uma conversa. Depois, custa um contrato.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>O plano Hapvida é bom mesmo sendo barato?</h3>
      <p>
        Preço competitivo costuma vir do modelo: a operadora concentra parte do atendimento em estrutura
        própria, o que reduz custo com terceiros. Se isso é bom para você depende de a rede resolver na sua
        cidade: é o critério 1 deste post, não uma opinião geral.
      </p>

      <h3>O plano cobre tudo?</h3>
      <p>
        Todo plano regulamentado cobre no mínimo o Rol de Procedimentos da ANS, conforme a segmentação
        contratada. O que varia entre planos é rede, carência, custo e condições, não a cobertura mínima
        obrigatória.
      </p>

      <h3>Quanto tempo depois de contratar eu já posso usar?</h3>
      <p>
        Urgência e emergência em 24 horas, consultas e exames simples em 30 dias. Os demais procedimentos
        seguem os prazos da ANS e podem variar conforme o histórico de saúde declarado na contratação.
      </p>

      <h3>Existe unidade própria na minha cidade?</h3>
      <p>
        Varia por município. Algumas cidades atendidas contam com rede credenciada, sem unidade própria
        local. O consultor confirma quais unidades atendem o seu município antes de qualquer decisão.
      </p>

      <h3>Quanto vou pagar por mês?</h3>
      <p>
        O valor depende da sua idade, da cidade e da modalidade. A referência inicial de R$ 157,29 é ponto
        de partida e pode mudar sem aviso prévio. Um consultor confirma o valor exato para o seu perfil.
      </p>

      <h3>Vale mais a pena individual ou empresarial?</h3>
      <p>
        Quem tem empresa ativa, inclusive MEI, costuma encontrar condições comerciais diferentes no
        empresarial, conforme a regra disponível para a região. O caminho honesto é pedir as duas cotações e
        comparar. Veja os <Link to="/tipos-de-planos">tipos de plano</Link>.
      </p>

      <h3>Este site é o site oficial da Hapvida?</h3>
      <p>
        Não. A Nexar é uma consultoria independente e autorizada a comercializar planos Hapvida: um canal de
        venda e suporte, não a operadora. Os detalhes estão no nosso{' '}
        <Link to="/aviso-legal">aviso legal</Link>.
      </p>

      <h2>Conclusão</h2>
      <p>
        Rede que atende perto, prazo que cabe na sua urgência, custo que cabe no orçamento e um app que não
        atrapalha. Se os quatro fecharem, o plano é bom para você. Se um deles não fechar, nenhuma nota na
        internet resolve.
      </p>
      <p>
        Os quatro só dá para conferir com os seus dados na mesa. Solicite uma cotação sem compromisso e peça
        os valores junto com a lista de unidades da sua cidade: as duas informações que evitam surpresa
        depois. Veja também a página de <Link to="/plano-hapvida/marilia">Marília</Link>,{' '}
        <Link to="/plano-hapvida/piracicaba">Piracicaba</Link> ou a lista completa de{' '}
        <Link to="/planos-hapvida-por-cidade">cidades atendidas</Link>.
      </p>
    </>
  );
}
