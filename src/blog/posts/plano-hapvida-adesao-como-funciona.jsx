import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Plano Hapvida por adesão: como funciona essa modalidade que nem sempre aparece nas buscas ao
        lado de individual e empresarial? Na prática, é o plano contratado por meio de um sindicato,
        conselho profissional ou associação de classe conveniada, e não direto por CPF ou CNPJ.
      </p>

      <p>
        Se você tem vínculo com alguma dessas entidades, vale <Link to="/tipos-de-planos">comparar
        as três modalidades</Link> antes de decidir onde contratar, já que a condição comercial muda
        bastante entre elas.
      </p>

      <h2>O que é o plano por adesão</h2>
      <p>
        É a modalidade coletiva contratada através de um sindicato, conselho profissional ou
        associação de classe que tem convênio com a operadora. Diferente do empresarial, que depende
        de CNPJ ativo, e do individual, contratado direto por CPF, aqui quem viabiliza o plano é a
        entidade à qual você é filiado. Como mostramos na página de{' '}
        <Link to="/tipos-de-planos">tipos de plano Hapvida</Link>, o destaque dessa modalidade é
        justamente não exigir CNPJ nem vínculo empregatício: só a filiação à entidade conveniada.
      </p>

      <h2>Quem pode contratar</h2>
      <p>
        Pode contratar por adesão quem é filiado a um sindicato, conselho profissional (como CRM, OAB
        ou CREA) ou associação de classe que tenha convênio ativo com a Hapvida. A entidade precisa ter
        esse acordo firmado com a operadora; sem ele, não existe a via de adesão, e a alternativa passa
        a ser individual ou empresarial.
      </p>

      <h2>Documentação necessária</h2>
      <p>
        O ponto que mais diferencia essa modalidade na hora de contratar é o comprovante de vínculo:
        além dos documentos pessoais de sempre, é preciso apresentar a comprovação de filiação à
        entidade (sindicato, conselho ou associação). Sem esse comprovante, a operadora não enquadra a
        contratação como adesão. Um consultor confirma a lista completa de documentos para o seu caso
        antes de iniciar o processo.
      </p>

      <h2>Como funciona o reajuste</h2>
      <p>
        Assim como no empresarial, não existe teto de reajuste definido pela ANS para o plano por
        adesão. O percentual aplicado todo ano é o que foi negociado no contrato coletivo firmado entre
        a entidade de classe e a operadora, não algo que o beneficiário individual negocia diretamente.
        Detalhamos essa diferença, modalidade por modalidade, no post sobre{' '}
        <Link to="/blog/reajuste-plano-hapvida-como-funciona">reajuste do plano Hapvida</Link>.
      </p>

      <h2>Adesão, individual ou empresarial: qual escolher</h2>
      <p>
        Não tem resposta genérica. Vale pedir a cotação nas modalidades que se aplicam ao seu perfil e
        comparar valor, rede e regra de reajuste lado a lado:
      </p>
      <ul>
        <li>
          <strong>Individual:</strong> contratado por CPF, sem exigir empresa ou entidade. Reajuste
          segue o teto da ANS. Veja mais em{' '}
          <Link to="/plano-individual-hapvida">plano individual Hapvida</Link>.
        </li>
        <li>
          <strong>Empresarial:</strong> exige CNPJ ativo, inclusive MEI. Reajuste negociado conforme a
          sinistralidade do grupo. Veja o comparativo no post sobre{' '}
          <Link to="/blog/plano-hapvida-empresarial-mei">plano Hapvida empresarial e MEI</Link>.
        </li>
        <li>
          <strong>Adesão:</strong> exige filiação a sindicato, conselho ou associação conveniada.
          Reajuste definido pelo contrato coletivo entre a entidade e a operadora.
        </li>
      </ul>
      <p>
        Quem tem vínculo com uma entidade conveniada e também tem CNPJ ativo, por exemplo, pode
        encontrar uma condição melhor em uma das duas modalidades coletivas. Só a cotação comparada
        mostra qual compensa de fato na sua cidade.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O que é um plano de saúde por adesão?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            É a modalidade contratada por meio de um sindicato, conselho profissional ou associação de
            classe que tem convênio com a operadora, em vez de contratação direta por CPF ou CNPJ.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quem pode contratar o plano Hapvida por adesão?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Quem é filiado a uma entidade (sindicato, conselho profissional ou associação de classe) que
            tenha convênio ativo com a Hapvida.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Preciso de CNPJ para contratar por adesão?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. O destaque dessa modalidade é justamente não exigir CNPJ nem vínculo empregatício, apenas
            a filiação à entidade conveniada.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual a diferença entre adesão e empresarial?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            O empresarial exige CNPJ ativo, inclusive MEI. O adesão exige filiação a uma entidade de classe
            conveniada. Nas duas, o reajuste é negociado coletivamente, sem teto da ANS.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O plano por adesão tem o mesmo reajuste do plano individual?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. O individual segue o teto de reajuste definido anualmente pela ANS. No adesão, o
            percentual é o que foi negociado no contrato entre a entidade de classe e a operadora.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Que documentos preciso para contratar por adesão?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Documentos pessoais e o comprovante de vínculo com a entidade (sindicato, conselho ou
            associação de classe). Um consultor confirma a lista completa para o seu caso.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Posso incluir dependentes no plano por adesão?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A possibilidade e as regras de inclusão dependem do contrato firmado entre a entidade e a
            operadora. Um consultor confirma o que se aplica ao seu caso.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Plano por adesão é uma via que muita gente com vínculo a sindicato, conselho ou associação de
        classe acaba nem considerando, e que pode sair em condição diferente do individual ou do
        empresarial. Confirme se a sua entidade tem convênio ativo e peça a cotação para comparar com
        as demais modalidades. Veja também o post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link> ou fale com um
        consultor pelo WhatsApp para tirar dúvidas sobre o seu caso específico.
      </p>
    </>
  );
}
