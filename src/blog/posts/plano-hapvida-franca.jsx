import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        A dúvida de quem mora em Franca e pesquisa plano Hapvida costuma ser sempre a mesma: cabe no bolso?
        Antes de fechar qualquer conta, vale entender como a tabela funciona e o que muda o valor final para
        o seu perfil.
      </p>

      <h2>Quanto custa o plano Hapvida em Franca</h2>
      <p>
        A referência de R$ 157,29 é o valor nacional mais baixo divulgado, não necessariamente o preço em
        Franca: o valor muda conforme a idade, a cidade e a modalidade (individual, familiar ou empresarial
        seguem tabelas diferentes). O jeito certo de saber o número real é pedir a cotação com os seus dados.
      </p>
      <p>
        Veja os planos disponíveis e peça o valor atualizado na{' '}
        <Link to="/plano-hapvida/franca">página do plano Hapvida em Franca</Link>.
      </p>

      <h2>Rede e carência em Franca</h2>
      <p>
        A operadora combina rede própria e credenciada, com validação das unidades disponíveis feita pelo
        consultor antes de qualquer contratação. Confira também a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> por cidade. Pela regra da{' '}
        <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência e emergência liberam em 24
        horas; consultas e exames simples, em 30 dias.
      </p>

      <h2>Perguntas frequentes</h2>


      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Qual o valor do plano Hapvida em Franca?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            R$ 157,29 é o valor nacional mais baixo divulgado, mas o plano em Franca costuma começar acima disso.
            Um consultor confirma o número exato na cotação para Franca.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende em Franca?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, com rede própria e credenciada. O consultor valida as unidades disponíveis na cidade antes de
            qualquer decisão.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quanto tempo até poder usar o plano?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência em 24 horas, consultas e exames simples em 30 dias, pela regra da ANS. Os
            demais procedimentos seguem a tabela completa.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quem já tem plano ativo consegue reduzir a carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Em alguns casos, sim, por meio da portabilidade. Veja como funciona no post sobre{' '}
            <Link to="/blog/portabilidade-para-hapvida">portabilidade para Hapvida</Link>.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para contratar como MEI em Franca?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Com CNPJ ativo, incluindo MEI, é possível avaliar a modalidade empresarial e comparar as
            condições comerciais com o consultor.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        O valor que importa em Franca é o do seu perfil, não a média nacional. Peça uma cotação sem
        compromisso e confirme preço e rede pelo WhatsApp com um consultor autorizado. Veja também o guia
        sobre{' '}
        <Link to="/blog/hapvida-vale-a-pena-interior-sp">se o plano Hapvida vale a pena no interior de SP</Link>.
      </p>
    </>
  );
}
