import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Carência é o período entre a contratação do plano e o momento em que você passa a ter direito a
        usar determinado tipo de atendimento. É, de longe, o assunto que mais gera dúvida na hora de
        contratar — e também o que mais costuma ter solução, seja por portabilidade, seja por contratação
        empresarial.
      </p>

      <h2>Os prazos que se aplicam ao plano Hapvida</h2>
      <p>
        Os prazos seguem a regulamentação da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>,
        que estabelece limites máximos por tipo de procedimento — a operadora não pode superar esses
        limites, mas pode reduzi-los ou eliminá-los em condições específicas. No plano Hapvida, os prazos
        de referência são:
      </p>
      <ul>
        <li><strong>Urgência e emergência:</strong> 24 horas após a contratação.</li>
        <li><strong>Consultas e exames simples:</strong> 30 dias após a contratação.</li>
      </ul>
      <p>
        Para os demais procedimentos — internações, cirurgias eletivas, parto e situações envolvendo
        doença ou lesão preexistente — os prazos seguem a tabela completa da ANS e podem variar conforme o
        seu histórico de saúde declarado no momento da contratação. Um consultor confirma os prazos
        exatos que se aplicam ao seu caso antes de você assinar qualquer contrato.
      </p>

      <h2>Como reduzir ou eliminar a carência</h2>
      <p>Dois caminhos costumam funcionar na prática:</p>
      <ul>
        <li>
          <strong>Portabilidade:</strong> se você já tem plano de saúde ativo e cumpriu as carências lá,
          pode migrar para a Hapvida sem recomeçar a contagem. Veja como funciona no post sobre{' '}
          <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
        </li>
        <li>
          <strong>Contratação empresarial:</strong> planos empresariais costumam ter condições de carência
          diferentes das do plano individual — se você tem CNPJ ativo, inclusive MEI, vale pedir uma
          cotação nessa modalidade e comparar. Veja mais no post sobre{' '}
          <Link to="/blog/plano-hapvida-empresarial-mei">plano Hapvida empresarial e MEI</Link>.
        </li>
      </ul>

      <h2>O que declarar na contratação</h2>
      <p>
        Doenças ou lesões preexistentes precisam ser declaradas corretamente no formulário de saúde no
        momento da contratação. Omitir uma condição preexistente não elimina a carência — só cria risco de
        a operadora negar cobertura depois, quando ela for identificada. Se você tem alguma condição
        preexistente, o caminho correto é declarar e perguntar ao consultor como isso afeta o seu caso
        específico.
      </p>

      <p>
        Ficou com dúvida sobre outro ponto do plano? Veja as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> ou solicite uma cotação para
        confirmar os prazos aplicáveis à sua cidade e ao seu perfil.
      </p>
    </>
  );
}
