import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Quem mora em Joinville e pesquisa plano de saúde Hapvida esbarra sempre na mesma dúvida: quanto custa
        aqui, na minha idade? A resposta honesta é que o valor não é fixo, mas dá para entender o que
        define o preço final e como confirmar o número certo para o seu caso, sem depender de tabela
        genérica.
      </p>

      <h2>Quanto custa o plano Hapvida em Joinville</h2>
      <p>
        Hoje o valor de entrada divulgado para Joinville é R$ 105,27 (plano Mix), mas esse número muda
        conforme a faixa etária e a modalidade contratada (individual, familiar ou empresarial); duas
        pessoas de idades diferentes em Joinville podem receber valores bem distintos.
      </p>
      <p>
        Por isso, o número exato do seu perfil só sai na cotação. Confira os planos disponíveis e solicite o
        valor atualizado para Joinville na{' '}
        <Link to="/plano-hapvida/joinville">página do plano Hapvida em Joinville</Link>, direto pelo WhatsApp com
        um consultor autorizado.
      </p>

      <h2>Como funciona a rede em Joinville</h2>
      <p>
        A Hapvida trabalha com duas redes nacionais: a própria, formada por hospitais e HapClínicas
        administrados diretamente pela operadora, e a credenciada, formada por hospitais parceiros. Qual
        delas você acessa em Joinville depende do plano contratado, não é igual para todos. A consultoria
        Nexar atende em Joinville com suporte local, e o consultor confirma quais unidades ficam disponíveis
        para o seu plano antes de qualquer assinatura; essa confirmação faz parte do atendimento. Para ver a
        lista completa por município, acesse a nossa página de{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link>.
      </p>

      <h2>Carência: quanto tempo até poder usar</h2>
      <p>
        De acordo com as regras da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência
        e emergência têm carência máxima de 24 horas; consultas e exames simples entram em até 30 dias. Os
        demais procedimentos seguem a tabela completa da ANS. Se você já tem plano ativo em outra operadora,
        a portabilidade pode reduzir ou eliminar essa espera. Veja como no post sobre{' '}
        <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Joinville?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            O valor de entrada divulgado hoje é R$ 105,27 (plano Mix), mas o valor exato do seu perfil depende
            da idade e da modalidade. Um consultor confirma o número certo na cotação para Joinville.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual plano é mais barato em Joinville?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Depende do seu perfil e da modalidade contratada. A comparação entre as opções disponíveis só faz
            sentido com os seus dados na cotação: é aí que aparece o valor real de cada uma.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em Joinville?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, por rede própria e credenciada. Qual delas você acessa depende do plano contratado, e a
            consultoria Nexar confirma as unidades disponíveis em Joinville antes de qualquer decisão.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quanto tempo depois de contratar já posso usar o plano em Joinville?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, pela regra da ANS. Os
            demais procedimentos seguem a tabela completa e podem variar conforme o histórico de saúde
            declarado.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para contratar sendo MEI em Joinville?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Com CNPJ ativo, inclusive MEI, é possível avaliar a modalidade empresarial, que costuma ter
            condições comerciais próprias. Um consultor explica o que muda para o seu caso.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Em Joinville, o número que importa é o da sua idade, não a média divulgada. Solicite uma cotação sem
        compromisso e receba os valores e a lista de unidades da cidade direto pelo WhatsApp, com um
        consultor autorizado. Veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano.
      </p>
    </>
  );
}
