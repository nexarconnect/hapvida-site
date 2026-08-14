import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Quem contrata o plano Hapvida costuma perguntar sobre valores primeiro. Mas depois da assinatura, o
        que define a rotina é a parte digital: marcar consulta, ver exame, falar com médico sem sair de
        casa. A boa notícia é que quase tudo isso resolve pelo celular, e é isso que você vai entender aqui
        antes de pedir a sua cotação.
      </p>

      <h2>O app Hapvida resolve o dia a dia</h2>
      <p>
        O aplicativo da operadora, disponível na App Store e no Google Play, concentra os serviços mais
        usados do plano. Segundo a própria Hapvida, dá para agendar consultas e exames, consultar resultados
        de exames, emitir a 2ª via do boleto, acessar a carteirinha digital do beneficiário e consultar a
        rede credenciada. Boa parte do que antes exigia telefone ou deslocamento agora vira toque na tela;
        quem usa o plano com frequência economiza tempo toda semana.
      </p>
      <p>
        Além do app, existe o Portal do Beneficiário, acessível pelo computador ou pelo celular, com os
        mesmos serviços. App no bolso, portal em casa: o que for mais confortável para você.
      </p>

      <h2>Agendamento: presencial ou teleconsulta, no mesmo lugar</h2>
      <p>
        O agendamento de consultas e exames é feito online, pelo Portal do Beneficiário ou pelo aplicativo.
        No momento de marcar, você escolhe entre consulta presencial ou teleconsulta, sem precisar passar
        por outro canal: o caminho é único e direto.
      </p>

      <h2>Teleconsulta: médico sem deslocamento</h2>
      <p>
        A teleconsulta é o atendimento médico por vídeo, com hora marcada. A operadora oferece
        especialidades como clínico geral, cardiologia, dermatologia, ginecologia e geriatria, entre outras;
        o leque varia por região e plano.
      </p>
      <p>
        A telemedicina é uma prática regulamentada no Brasil, e a operadora informa as condições de uso no
        contrato. Mas nem todo plano inclui teleconsulta da mesma forma: a disponibilidade muda conforme a
        modalidade e a região. Por isso, no momento da cotação, vale perguntar ao consultor se a teleconsulta
        está inclusa no plano que você está avaliando.
      </p>
      <p>
        Quer saber o que o plano Hapvida oferece de tecnologia para o seu perfil? Solicite uma cotação e
        pergunte sobre app, teleconsulta e agendamento: um consultor autorizado responde as condições da
        sua cidade pelo WhatsApp em minutos.
      </p>

      <h2>Resultado de exame: sem fila</h2>
      <p>
        O resultado de exames sai online, pelo app ou pela área de resultados no site, usando a senha que
        consta na ficha de atendimento. Para quem trabalha o dia inteiro, isso elimina uma ida desnecessária
        ao laboratório só para buscar o papel.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O app Hapvida é gratuito?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            O aplicativo é disponibilizado pela operadora para download na App Store e no Google Play. Detalhes
            de uso e disponibilidade por plano podem ser confirmados com um consultor.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Como agendar uma consulta pelo app?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Pelo Portal do Beneficiário ou pelo aplicativo, escolhendo entre consulta presencial e teleconsulta,
            com especialidade, data e horário.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A teleconsulta está inclusa em todos os planos?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não necessariamente. A disponibilidade varia por modalidade e região; um consultor confirma se o
            plano que você está avaliando inclui teleconsulta.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quais especialidades têm teleconsulta?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A operadora atende por vídeo em especialidades como clínico geral, cardiologia, dermatologia e
            ginecologia, entre outras. A lista completa varia por região e plano.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Como vejo o resultado dos meus exames?</h3>
          <p className="!mt-2 text-sm text-slate-600">Pelo app ou pela área de resultados no site, com a senha que consta na ficha de atendimento.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Preciso do cartão físico para usar o plano?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            O app oferece a carteirinha digital do beneficiário. A aceitação em cada unidade pode variar, vale
            confirmar com o consultor e com a própria rede.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Teleconsulta tem carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            As condições de carência e de uso da teleconsulta dependem do plano e da região. Um consultor
            confirma para o seu caso.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        A parte digital do plano Hapvida resolve o que mais toma tempo: marcar consulta, ver exame, falar
        com médico e emitir boleto. Mas a tecnologia só vale se o plano atender perto de você e com as
        condições certas. Solicite uma cotação sem compromisso e aproveite para perguntar sobre app,
        teleconsulta e agendamento, direto pelo WhatsApp com um consultor autorizado. Veja também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> e as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano.
      </p>
    </>
  );
}
