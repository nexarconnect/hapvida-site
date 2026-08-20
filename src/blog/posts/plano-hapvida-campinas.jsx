import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Plano de saúde Hapvida em Campinas: quem pesquisa esbarra sempre na mesma dúvida, quanto custa
        aqui, na minha idade? A resposta honesta é que o valor não é fixo, mas dá para entender o que
        define o preço final e como confirmar o número certo para o seu caso, sem depender de tabela
        genérica.
      </p>

      <h2>Quanto custa o plano Hapvida em Campinas</h2>
      <p>
        A referência de R$ 157,29 é o valor nacional mais baixo divulgado pela operadora, e esse número
        aparece em quase toda busca por preço. Em Campinas a tabela de entrada costuma ficar acima
        disso, porque o valor muda conforme a cidade, a faixa etária e a modalidade contratada
        (individual, familiar ou empresarial). Duas pessoas da mesma idade podem sair com valores
        diferentes dependendo só da modalidade escolhida.
      </p>
      <p>
        Sendo a maior cidade coberta pela Nexar no interior de SP, Campinas concentra bastante procura
        por cotação, mas isso não muda o fato de que o número exato do seu perfil só sai na hora de
        cotar. Confira os planos disponíveis e peça o valor atualizado na{' '}
        <Link to="/plano-hapvida/campinas">página do plano Hapvida em Campinas</Link>, direto pelo
        WhatsApp com um consultor autorizado.
      </p>

      <h2>Como funciona a rede em Campinas</h2>
      <p>
        A operadora trabalha com dois níveis de atendimento: rede própria, formada por unidades
        administradas diretamente pela Hapvida, e rede credenciada, que completa a cobertura onde a
        rede própria não chega. Qual delas atende o seu plano depende da modalidade contratada, não é
        igual para todo mundo. A consultoria Nexar atende Campinas com suporte local, e o consultor
        confirma quais hospitais, clínicas e laboratórios estão disponíveis antes de qualquer
        assinatura, essa validação faz parte do atendimento. Para ver a lista completa por município,
        acesse a nossa página de <Link to="/rede-de-atendimento">rede de atendimento</Link>.
      </p>

      <h2>Carência: quanto tempo até poder usar</h2>
      <p>
        De acordo com as regras da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>,
        urgência e emergência têm carência máxima de 24 horas; consultas e exames simples entram em até
        30 dias. Os demais procedimentos seguem a tabela completa da ANS e podem variar conforme o
        histórico de saúde declarado na contratação. Se você já tem plano ativo em outra operadora, a
        portabilidade pode reduzir ou eliminar essa espera. Veja como funciona no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h2>Perguntas frequentes</h2>

      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Campinas?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano em Campinas costuma começar
            acima disso. Um consultor confirma o número exato para o seu caso na cotação para Campinas.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual plano é mais barato em Campinas?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Depende do seu perfil e da modalidade contratada. A comparação entre as opções disponíveis
            só faz sentido com os seus dados na cotação, é aí que aparece o valor real de cada uma.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em Campinas?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. A operadora trabalha com rede própria e credenciada, e a consultoria Nexar atende
            Campinas com suporte local. O consultor valida as unidades disponíveis na cidade antes de
            qualquer decisão.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">
            Quanto tempo depois de contratar já posso usar o plano em Campinas?
          </h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, pela regra da ANS.
            Os demais procedimentos seguem a tabela completa e podem variar conforme o histórico de
            saúde declarado.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para contratar sendo MEI em Campinas?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Com CNPJ ativo, inclusive MEI, é possível avaliar a modalidade empresarial, que costuma
            ter condições comerciais próprias. Um consultor explica o que muda para o seu caso.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Em Campinas, o número que importa é o da sua idade, não a média divulgada. Solicite uma cotação
        sem compromisso e receba os valores e a lista de unidades da cidade direto pelo WhatsApp, com um
        consultor autorizado. Veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano e o guia sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">
          se o plano Hapvida vale a pena no interior de SP
        </Link>.
      </p>
    </>
  );
}
