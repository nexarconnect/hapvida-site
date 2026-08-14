import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        A tabela de preços Hapvida 2026 não é uma lista única de valores: é uma referência que muda
        conforme quem pergunta. Antes de procurar um número fechado, vale entender como essa tabela é
        montada. Aí sim a cotação faz sentido, em vez de virar mais uma estimativa genérica.
      </p>

      <h2>Por que não existe uma tabela única</h2>
      <p>
        A referência inicial divulgada no site é de <strong>R$ 157,29</strong>. É esse número que aparece
        em quase toda busca por preço, e é exatamente aí que a confusão começa: ele é ponto de partida, não
        etiqueta fechada. Como explicamos nas nossas{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link>, a tabela oficial muda conforme três
        eixos ao mesmo tempo: região, faixa etária e modalidade contratada.
      </p>
      <p>
        Isso significa que a mesma pergunta ("quanto custa o Hapvida?") tem respostas diferentes para duas
        pessoas da mesma cidade, se a idade ou a modalidade mudar. Faixa etária é o fator que mais pesa: o
        plano individual usa as faixas definidas pela ANS, e quanto mais nova a faixa, menor tende a ser o
        valor. Cidade também entra na conta: a tabela de Bauru não é a de São José dos Campos.
      </p>
      <p>
        <strong>Quer o valor real, não a estimativa?</strong> Peça a cotação com sua idade e cidade. O
        retorno vem pelo WhatsApp com os valores atualizados para o seu perfil. Comece pela página da sua
        região: <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/ribeirao-preto">Ribeirão Preto</Link>,{' '}
        <Link to="/plano-hapvida/franca">Franca</Link> ou{' '}
        <Link to="/plano-hapvida/sao-jose-dos-campos">São José dos Campos</Link>.
      </p>

      <h2>Os três planos que compõem a tabela</h2>
      <p>
        Antes de comparar valores, ajuda entender o que cada faixa de preço compra. O portfólio Hapvida se
        organiza em três planos, todos disponíveis nas modalidades individual, familiar, MEI e empresarial:
      </p>
      <ul>
        <li>
          <strong>Mix:</strong> a opção de menor mensalidade, pela rede própria e credenciada Hapvida.
          Indicada para quem prioriza economia mensal.
        </li>
        <li>
          <strong>Nosso Plano:</strong> o de melhor custo-benefício do portfólio, também pela rede própria e
          credenciada. Costuma ser o mais procurado por equilibrar preço e cobertura.
        </li>
        <li>
          <strong>Pleno:</strong> a cobertura mais completa, com mais conforto no uso. Para quem prioriza
          amplitude de atendimento sobre economia mensal.
        </li>
      </ul>
      <p>
        A diferença de preço entre os três não é aleatória: reflete rede, tipo de acomodação e abrangência
        de cobertura. Por isso a "tabela" muda de conversa dependendo de qual dos três você está avaliando,
        e é comum o consultor apresentar as três cotações lado a lado, para a comparação ficar concreta.
      </p>

      <h2>O que muda o valor ao longo do contrato</h2>
      <p>
        Tabela de preço não é foto parada: ela também muda depois que você já é cliente, de duas formas
        diferentes.
      </p>
      <p>
        A primeira é o <strong>reajuste anual</strong>. No plano individual, ele segue o teto definido pela
        ANS: existe um limite máximo que a operadora não pode ultrapassar. No plano empresarial, o reajuste
        é negociado diretamente com a operadora, conforme a sinistralidade do grupo, ou seja, conforme o
        quanto aquele grupo de beneficiários usou o plano no período.
      </p>
      <p>
        A segunda é a <strong>coparticipação</strong>, quando ela existe no contrato: você paga uma
        mensalidade menor e uma taxa adicional só quando usa determinados procedimentos. Não é uma opção
        universal (depende da modalidade e da disponibilidade comercial), e o efeito no seu bolso depende
        de quanto você usa o plano ao longo do ano. Detalhamos os modelos no post sobre{' '}
        <Link to="/blog/coparticipacao-plano-de-saude-explicada">coparticipação no plano de saúde</Link>.
      </p>

      <h2>Documentos e passos para travar o valor cotado</h2>
      <p>
        Uma cotação não é compromisso: o valor só trava na assinatura. Para o plano individual, o que se
        pede é CPF e documentos pessoais dos dependentes, se houver. Para o empresarial, CNPJ ativo e
        documentos de cada beneficiário incluído. O consultor confirma a lista exata para o seu caso, porque
        ela varia conforme a modalidade. Veja a comparação completa em{' '}
        <Link to="/tipos-de-planos">tipos de plano</Link>.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual é a tabela de preços Hapvida 2026?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não existe uma tabela única: o valor varia por região, faixa etária e modalidade contratada. A
            referência inicial divulgada é R$ 157,29, mas o número exato para o seu caso só sai na cotação.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual a diferença entre os planos Mix, Nosso Plano e Pleno?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            O Mix tem a menor mensalidade, pela rede própria e credenciada Hapvida. O Nosso Plano tem o melhor
            custo-benefício do portfólio, também com rede própria e credenciada. O Pleno oferece a cobertura
            mais completa e mais conforto no uso. Os três estão disponíveis nas modalidades individual, familiar,
            MEI e empresarial.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O preço aumenta todo ano?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, há reajuste anual. No individual, segue o teto definido pela ANS. No empresarial, é negociado
            com a operadora conforme a sinistralidade do grupo.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">MEI paga o mesmo valor que pessoa física?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            MEI com CNPJ ativo pode contratar o plano empresarial, que costuma ter condições diferentes do
            individual, inclusive em relação à carência. O consultor compara as duas modalidades antes de
            qualquer indicação. Veja mais no post sobre{' '}
            <Link to="/blog/plano-hapvida-empresarial-mei">plano Hapvida empresarial e MEI</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A tabela é a mesma em todas as cidades atendidas?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. A consultoria Nexar atende Bauru, Ribeirão Preto, Franca, São José dos Campos, Sertãozinho,
            Lins, Araraquara, Limeira, Barretos, Pirassununga, Marília, São Carlos e Piracicaba, e o valor varia
            por município dentro dessa lista. Veja a{' '}
            <Link to="/planos-hapvida-por-cidade">lista completa de cidades atendidas</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Como recebo a tabela atualizada?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Pelo WhatsApp, direto com um consultor autorizado. O retorno costuma ser rápido: você informa idade,
            cidade e modalidade de interesse, e recebe os valores disponíveis para o seu perfil.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Este site é o site oficial da Hapvida?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. A Nexar é uma consultoria independente e autorizada a comercializar planos Hapvida: um canal de
            venda e suporte, não a operadora. Os detalhes estão no nosso{' '}
            <Link to="/aviso-legal">aviso legal</Link>.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        "Tabela de preços" sugere um documento fechado, mas o valor do plano Hapvida se monta na hora, a
        partir da sua idade, da sua cidade e do plano escolhido entre Mix, Nosso Plano e Pleno. Qualquer
        número fora desse contexto é estimativa, não cotação.
      </p>
      <p>
        Solicite a tabela atualizada para o seu perfil sem compromisso, direto pelo WhatsApp com um
        consultor autorizado. Se preferir começar pela sua região, veja a página de{' '}
        <Link to="/plano-hapvida/marilia">Marília</Link>,{' '}
        <Link to="/plano-hapvida/piracicaba">Piracicaba</Link> ou{' '}
        <Link to="/plano-hapvida/sao-carlos">São Carlos</Link>.
      </p>
    </>
  );
}
