import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Plano individual Hapvida: como funciona a modalidade que mais aparece nas buscas de quem
        procura plano de saúde sem depender de empresa? Na prática, é a contratação feita direto
        pelo CPF, e costuma ser a porta de entrada de quem está pesquisando pela primeira vez.
      </p>
      <p>
        Se você já sabe que não tem CNPJ ativo nem vínculo com sindicato ou associação de classe,
        essa é provavelmente a sua modalidade. Peça a cotação direto na página do{' '}
        <Link to="/plano-individual-hapvida">plano individual Hapvida</Link> ou continue lendo
        para entender documentos, dependentes e reajuste antes de decidir.
      </p>

      <h2>O que é o plano individual</h2>
      <p>
        É a modalidade contratada diretamente por pessoa física, pelo CPF, sem precisar de MEI ou
        CNPJ ativo. Pode incluir cônjuge e filhos como dependentes na modalidade familiar, e o
        reajuste anual segue o teto definido pela ANS, diferente do plano empresarial, que
        negocia o reajuste com a operadora. É o que explicamos na página do{' '}
        <Link to="/plano-individual-hapvida">plano individual Hapvida</Link>.
      </p>

      <h2>Quem pode contratar</h2>
      <p>
        Qualquer pessoa física pode contratar, com ou sem CNPJ. É a modalidade mais aberta das
        três, como mostra o comparativo de{' '}
        <Link to="/tipos-de-planos">tipos de plano Hapvida</Link>: o empresarial exige CNPJ ativo
        (inclusive MEI) e o adesão exige filiação a um sindicato, conselho profissional ou
        associação de classe conveniada. O individual não pede nada disso.
      </p>

      <h2>Documentos necessários</h2>
      <p>
        Para contratar, é preciso apresentar CPF e os documentos pessoais dos dependentes, se
        houver. A lista completa pode variar conforme o seu caso específico; um consultor
        confirma exatamente o que é necessário antes de iniciar o processo.
      </p>

      <h2>Posso incluir cônjuge e filhos</h2>
      <p>
        Sim, na modalidade familiar. Cônjuge e filhos podem entrar no mesmo contrato, e cada
        dependente tem sua própria contagem de carência a partir da data em que foi incluído, não
        a data em que o titular contratou. Detalhamos como isso pesa no valor final no post sobre{' '}
        <Link to="/blog/plano-hapvida-familiar-dependentes">
          plano de saúde familiar Hapvida
        </Link>
        .
      </p>

      <h2>Como funciona o reajuste</h2>
      <p>
        O plano individual segue o teto de reajuste anual definido pela ANS: é um limite que a
        operadora não pode ultrapassar, diferente do empresarial e do adesão, que negociam o
        percentual diretamente com a operadora conforme a sinistralidade do grupo ou o contrato
        coletivo firmado com a entidade. Veja mais no post sobre{' '}
        <Link to="/blog/reajuste-plano-hapvida-como-funciona">reajuste do plano Hapvida</Link>.
      </p>

      <h2>Carência no plano individual</h2>
      <p>
        Os prazos seguem a regra da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>:
        urgência e emergência em 24 horas após a contratação, consultas e exames simples em 30
        dias. Internações, cirurgias eletivas e parto seguem a tabela completa da agência, e podem
        variar conforme o histórico de saúde declarado. Se você já teve plano em outra operadora,
        vale checar a portabilidade antes de recomeçar a contagem do zero: explicamos como
        funciona no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h2>Individual, empresarial ou adesão: qual escolher</h2>
      <p>
        Não existe resposta pronta, mas dá para descartar opções rápido. Tem CNPJ ativo, mesmo
        como MEI? Vale comparar com o{' '}
        <Link to="/blog/plano-hapvida-empresarial-mei">plano empresarial</Link>, que às vezes sai
        em condição melhor. É filiado a sindicato, conselho ou associação conveniada? Compare
        também com o{' '}
        <Link to="/blog/plano-hapvida-adesao-como-funciona">plano por adesão</Link>. Sem nenhum
        dos dois vínculos, o individual é o caminho direto, sem depender de terceiros.
      </p>

      <h2>Quanto custa o plano individual</h2>
      <p>
        A referência inicial divulgada é de R$ 157,29, mas trate isso como ponto de partida, não
        como o valor que vai fechar na sua cotação. O preço final depende da sua faixa etária, da
        sua cidade e da modalidade escolhida (com ou sem coparticipação, com ou sem dependentes).
        Veja como a tabela é montada no post sobre{' '}
        <Link to="/blog/tabela-precos-hapvida-2026">tabela de preços Hapvida 2026</Link> ou peça a
        cotação já com a sua idade e cidade para receber o valor confirmado.
      </p>

      <h2>Perguntas frequentes</h2>

      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">
            Preciso ter CNPJ para contratar o plano individual?
          </h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. O plano individual é contratado direto por CPF, sem exigir empresa ativa. É a
            modalidade indicada para quem não tem MEI ou CNPJ, ou prefere não vincular o plano a
            uma empresa.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">
            Posso incluir meus dependentes no plano individual?
          </h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, na modalidade familiar. Cônjuge e filhos podem ser incluídos no mesmo contrato,
            cada um com sua própria carência conforme a data de inclusão.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">
            O reajuste do plano individual é diferente do empresarial?
          </h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. O plano individual segue o teto de reajuste anual definido pela ANS. Já o
            empresarial negocia o reajuste diretamente com a operadora, conforme a sinistralidade
            do grupo.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O valor muda conforme a idade?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, o plano individual usa faixas etárias definidas pela ANS. Quanto mais nova a
            faixa, menor tende a ser o valor. Um consultor confirma o valor exato para a sua idade
            e cidade.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Que documentos preciso para contratar?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            CPF e documentos pessoais dos dependentes, se houver. O consultor confirma a lista
            exata para o seu caso.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Tem limite de idade para contratar?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não há impedimento por idade avançada para contratar, mas o valor varia por faixa
            etária conforme a tabela da ANS. Um consultor confirma o valor exato para a sua idade.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O plano individual tem carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Tem, seguindo a regra da ANS: urgência e emergência em 24 horas, consultas e exames
            simples em 30 dias. Quem já teve plano em outra operadora pode reduzir esses prazos
            por portabilidade.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende na minha cidade?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A Hapvida tem ampla rede própria e credenciada. Durante o atendimento, o consultor
            valida os hospitais, clínicas e laboratórios disponíveis para o seu município.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Sem CNPJ e sem vínculo com entidade de classe, o plano individual é o caminho mais direto:
        CPF, documentos dos dependentes se houver, e a cotação já sai personalizada para a sua
        idade e cidade. Peça o valor sem compromisso pelo WhatsApp, ou veja como funciona a rede e
        o preço na página de <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/piracicaba">Piracicaba</Link> ou na lista completa de{' '}
        <Link to="/planos-hapvida-por-cidade">cidades atendidas</Link>.
      </p>
    </>
  );
}
