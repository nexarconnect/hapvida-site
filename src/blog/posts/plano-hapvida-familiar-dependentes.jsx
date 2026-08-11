import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Plano de saúde familiar Hapvida: quanto custa incluir cônjuge e filhos no mesmo contrato? A conta
        não funciona como uma mensalidade única multiplicada pelo número de pessoas. Cada beneficiário entra
        pela sua própria faixa etária, e é isso que faz o valor final da família subir ou descer.
      </p>

      <h2>Como funciona o plano familiar</h2>
      <p>
        Não é um produto separado. É a contratação individual com dependentes incluídos no mesmo contrato:
        como descrevemos na página do{' '}
        <Link to="/plano-individual-hapvida">plano individual Hapvida</Link>, cônjuge e filhos podem entrar
        junto com o titular, na modalidade familiar. A contratação é feita direto por CPF, sem exigir MEI
        ou CNPJ ativo.
      </p>
      <p>
        Quem contrata é o titular. Os dependentes ficam vinculados a esse contrato, e o titular responde
        pela mensalidade do grupo todo.
      </p>
      <p>
        <strong>Quer o valor da sua família?</strong> Peça a cotação com a idade de cada pessoa que vai
        entrar no plano. O retorno vem pelo WhatsApp com os valores disponíveis para a sua cidade: veja a
        página de <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/ribeirao-preto">Ribeirão Preto</Link>,{' '}
        <Link to="/plano-hapvida/marilia">Marília</Link> ou{' '}
        <Link to="/plano-hapvida/piracicaba">Piracicaba</Link>.
      </p>

      <h2>O que define o preço quando são várias pessoas</h2>
      <p>
        Três fatores mexem no cálculo, e o primeiro deles é o que mais confunde na hora de somar.
      </p>
      <p>
        <strong>Faixa etária.</strong> O plano individual usa faixas etárias definidas pela{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, e quanto mais nova a faixa, menor
        tende a ser o valor, como está explicado nas perguntas da{' '}
        <Link to="/plano-individual-hapvida">página do plano individual</Link>. Na prática, um casal de 30
        anos com dois filhos pequenos monta uma conta bem diferente de um casal de 55 com um filho
        adolescente, mesmo sendo quatro e três pessoas.
      </p>
      <p>
        <strong>Cidade.</strong> A tabela oficial muda conforme a região, como consta nas nossas{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link>. Bauru e São José dos Campos não
        partem do mesmo número.
      </p>
      <p>
        <strong>Modalidade.</strong> Individual, familiar ou empresarial: a condição comercial de cada uma
        é própria.
      </p>
      <p>
        A referência inicial divulgada no site é de R$ 157,29, e ela costuma aparecer em toda busca por
        preço. Trate como ponto de partida de uma pessoa, não como estimativa de família. Nenhuma tabela
        genérica consegue dizer quanto ficaria o seu grupo: um consultor confirma o valor exato depois de
        somar as faixas de cada beneficiário.
      </p>
      <p>
        Sobre o aumento anual, vale saber desde já: no plano individual, o reajuste segue o teto definido
        pela ANS. No empresarial, ele é negociado com a operadora conforme a sinistralidade do grupo.
      </p>

      <h2>A carência conta separado para cada dependente</h2>
      <p>
        Aqui tem um detalhe que passa despercebido e gera frustração depois. Cada dependente incluído tem
        sua própria contagem de carência, contada a partir da data em que entrou no contrato. É o que
        respondemos nas <Link to="/perguntas-frequentes">perguntas frequentes</Link>. Incluir um filho seis
        meses depois da assinatura significa recomeçar a contagem para ele, não herdar a do titular.
      </p>
      <p>
        Os prazos de referência seguem a regra da ANS: urgência e emergência em 24 horas, consultas e
        exames simples em 30 dias. Internações, cirurgias eletivas e parto seguem a tabela completa da
        agência. Detalhamos tudo no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>
      <p>
        Se alguém da família já tem plano ativo em outra operadora e cumpriu as carências lá, a
        portabilidade prevista pela ANS pode reduzir ou eliminar essa espera. Vale avaliar pessoa por
        pessoa: nem sempre a situação de todos é igual. Veja como funciona no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>
      <p>
        Doença ou lesão preexistente de qualquer beneficiário precisa ser declarada corretamente no
        formulário de saúde. Omitir não elimina a carência: só cria o risco de a operadora negar cobertura
        mais adiante, quando identificar a condição.
      </p>

      <h2>Documentos para incluir a família</h2>
      <p>
        Para a contratação individual, o que se pede é CPF e os documentos pessoais dos dependentes, quando
        houver. A lista está nas nossas{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> e na comparação de{' '}
        <Link to="/tipos-de-planos">tipos de plano</Link>. O consultor confirma a relação exata para o seu
        caso antes de montar a proposta, porque ela varia conforme quem entra no contrato.
      </p>

      <h2>Quando o empresarial pode sair melhor que o familiar</h2>
      <p>
        Tem famílias em que alguém já tem CNPJ ativo, incluindo MEI, e nem cogita usar isso no plano.
        Poderia. Planos empresariais costumam ter melhor custo-benefício para quem tem empresa ativa,
        conforme a regra comercial disponível para a região. A comparação entre as duas modalidades está
        no post sobre{' '}
        <Link to="/blog/plano-hapvida-empresarial-mei">plano Hapvida empresarial e MEI</Link>.
      </p>
      <p>
        Não é regra automática. Depende da região e do perfil do grupo. Mas se existe CNPJ na família, peça
        as duas cotações e compare lado a lado antes de decidir.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>Quem posso incluir como dependente?</h3>
      <p>
        Cônjuge e filhos podem entrar no mesmo contrato, na modalidade familiar. Para outros graus de
        parentesco, a regra depende do contrato e da disponibilidade comercial da região; um consultor
        confirma o que se aplica ao seu caso.
      </p>

      <h3>O plano familiar sai mais barato que contratar planos separados?</h3>
      <p>
        Não existe resposta única. Como cada beneficiário é precificado pela sua faixa etária, o total
        depende da composição da família, da cidade e da modalidade. A comparação precisa ser feita com os
        números da sua cotação, não por estimativa.
      </p>

      <h3>Preciso de CNPJ para incluir a família?</h3>
      <p>
        Não. A modalidade individual é contratada direto por CPF, sem exigir empresa ativa, e aceita
        dependentes no mesmo contrato.
      </p>

      <h3>Se eu incluir um dependente depois, ele começa a usar quando?</h3>
      <p>
        A carência dele começa a contar a partir da data de inclusão no contrato, de forma independente da
        do titular. Urgência e emergência em 24 horas e consultas e exames simples em 30 dias são as
        referências, seguindo a regra da ANS.
      </p>

      <h3>Tem limite de idade para incluir alguém?</h3>
      <p>
        Não há impedimento por idade avançada para contratar, mas o valor varia por faixa etária conforme a
        tabela da ANS. Um consultor confirma o valor exato para a idade de cada pessoa.
      </p>

      <h3>A rede atende todos na minha cidade?</h3>
      <p>
        A operadora trabalha com rede própria e credenciada, e a validação é feita por município. Durante o
        atendimento, o consultor confirma quais hospitais, clínicas e laboratórios estão disponíveis para a
        sua cidade. Veja também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> e o post sobre{' '}
        <Link to="/blog/rede-de-atendimento-hapvida-como-funciona">como funciona a rede Hapvida</Link>.
      </p>

      <h3>Dá para incluir odontológico para a família toda?</h3>
      <p>
        Há opções que combinam saúde e odonto, dependendo da modalidade e da disponibilidade comercial da
        região. O consultor mostra as alternativas no momento da cotação.
      </p>

      <h2>Conclusão</h2>
      <p>
        Plano familiar é soma de faixas etárias, não um pacote de preço fechado. Quem monta a conta com o
        número que viu na propaganda quase sempre erra para menos, e quem inclui um dependente meses
        depois costuma esquecer que a carência dele recomeça do zero.
      </p>
      <p>
        Junte a idade de cada pessoa que vai entrar, sua cidade e solicite a cotação sem compromisso. O
        atendimento segue pelo WhatsApp com os valores disponíveis para o seu perfil. Se preferir começar
        pela sua região, veja a página de <Link to="/plano-hapvida/franca">Franca</Link>,{' '}
        <Link to="/plano-hapvida/sao-jose-dos-campos">São José dos Campos</Link> ou a lista completa de{' '}
        <Link to="/planos-hapvida-por-cidade">cidades atendidas</Link>.
      </p>
    </>
  );
}
