import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Antes de fechar a cotação do plano de saúde, tem uma pergunta que quase todo mundo esquece de
        fazer: o plano tem coparticipação? A resposta muda o quanto você paga todo mês, e o quanto paga
        quando usa. Vamos destrinchar isso sem enrolação.
      </p>

      <h2>O que é coparticipação</h2>
      <p>
        Coparticipação é um modelo em que você paga uma mensalidade menor e uma taxa adicional só quando usa
        determinados procedimentos, como consultas e exames. O plano continua cobrindo a maior parte do
        custo, mas você entra com uma fração na hora do atendimento. É diferente do plano sem
        coparticipação, em que a mensalidade já cobre tudo e não há cobrança extra por uso.
      </p>
      <p>
        Nem todos os planos têm essa opção disponível: depende da modalidade contratada e da
        disponibilidade comercial da região. O consultor explica se ela está disponível na sua cotação e
        mostra as duas alternativas lado a lado.
      </p>

      <h2>Quando a coparticipação compensa</h2>
      <p>
        A conta muda conforme o uso. Quem usa pouco o plano tende a sair ganhando com a coparticipação,
        porque a mensalidade é menor e o gasto por atendimento também é baixo. Já quem usa bastante
        (consultas frequentes, exames recorrentes, acompanhamento contínuo) pode ver o valor acumulado por
        atendimento superar o que economizaria na mensalidade.
      </p>
      <p>
        Tem um detalhe que pouca gente considera: quem tem condição crônica ou família numerosa tende a usar
        o plano com mais frequência. Nesses casos, o modelo sem coparticipação costuma proteger melhor o
        bolso no longo prazo. Já quem contrata pensando em emergência e consulta esporádica pode se dar bem
        com a coparticipação. Não existe uma regra única que valha para todo mundo, por isso o caminho
        certo é comparar as duas opções com os seus dados.
      </p>

      <h2>O que observar antes de assinar</h2>
      <p>
        Primeiro, confirme quais procedimentos entram na coparticipação: em alguns planos, consulta e exame
        são cobrados; em outros, só internação ou procedimentos de maior custo. Segundo, pergunte se existe
        um teto: alguns contratos limitam o quanto você paga de coparticipação por mês, o que protege
        contra surpresa. Terceiro, peça o valor exato para o seu caso, porque ele muda conforme o plano e a
        cidade.
      </p>
      <p>
        Nada disso dá para cravar sem a tabela do seu perfil. Um consultor confirma o valor exato para o seu
        caso e mostra as duas opções lado a lado antes de você decidir. Se ainda estiver em dúvida sobre
        outros pontos do contrato, veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano Hapvida.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O que é coparticipação no plano de saúde?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            É um modelo em que você paga uma mensalidade menor e uma taxa adicional só quando usa determinados
            procedimentos, como consultas e exames. O plano cobre a maior parte do custo; você entra com uma
            fração na hora do atendimento.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Coparticipação e franquia são a mesma coisa?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. São modelos diferentes de cobrança por uso. Cada operadora e cada plano definem as próprias
            regras; o consultor esclarece qual se aplica à opção que você está avaliando.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Plano com coparticipação é mais barato?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A mensalidade costuma ser menor, mas o custo total depende de quanto você usa. Quem usa pouco tende
            a pagar menos; quem usa muito pode acabar pagando mais no acumulado.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Tem limite de quanto pago por mês?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Alguns contratos preveem um teto de coparticipação mensal. Isso varia por plano, vale confirmar no
            momento da cotação.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Coparticipação vale a pena para família?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Depende da frequência de uso. Famílias que usam o plano com frequência costumam se beneficiar mais
            do modelo sem coparticipação. A comparação com os seus dados é o que decide.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Como saber o valor exato da coparticipação?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            O valor varia conforme o plano, a modalidade e a região. Um consultor confirma o valor exato para o
            seu caso antes de você assinar qualquer contrato.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Coparticipação não é boa nem ruim por si só: depende de como você usa o plano. A decisão certa sai
        da comparação entre os dois modelos com os seus dados na mesa: sua idade, sua cidade, sua frequência
        de uso. Solicite uma cotação sem compromisso e peça para ver as duas opções lado a lado, direto pelo
        WhatsApp com um consultor autorizado. Veja também o post sobre{' '}
        <Link to="/blog/rede-de-atendimento-hapvida-como-funciona">rede de atendimento Hapvida</Link>, sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link> e sobre os{' '}
        <Link to="/blog/coparticipacao-hapvida-modelos-parcial-total">
          modelos de coparticipação parcial, total e sem coparticipação
        </Link>{' '}
        no plano Hapvida.
      </p>
    </>
  );
}
