import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Faixa etária é o fator que mais pesa no preço do plano Hapvida. Duas pessoas na mesma
        cidade, na mesma modalidade, podem pagar valores bem diferentes só porque uma tem 30 anos
        e a outra tem 50. Vale entender como essa tabela é montada antes de pedir a sua cotação.
      </p>

      <h2>Por que a idade muda o valor do plano</h2>
      <p>
        Segundo a ANS, o cálculo do plano de saúde é organizado em 10 faixas etárias, da faixa de
        0 a 18 anos até a de 59 anos ou mais. Existe também um limite: o valor cobrado na faixa
        mais alta não pode ultrapassar 6 vezes o valor cobrado na faixa mais baixa. É essa regra
        que evita que o plano fique impagável para quem envelhece dentro do mesmo contrato.
      </p>
      <p>
        Quer saber o valor exato para a sua idade? <Link to="/tabela-de-preco-hapvida">Peça a cotação</Link>{' '}
        com sua idade e cidade e receba a tabela atualizada pelo WhatsApp.
      </p>

      <h2>Um exemplo de tabela por idade</h2>
      <p>
        Para dar uma ideia concreta de como os valores sobem, veja um exemplo real: a tabela do
        plano Nosso Médico em Ribeirão Preto, uma das combinações disponíveis no portfólio.
      </p>
      <ul>
        <li><strong>0 a 18 anos:</strong> R$ 157,29</li>
        <li><strong>19 a 28 anos:</strong> R$ 163,58</li>
        <li><strong>29 a 33 anos:</strong> R$ 188,12</li>
        <li><strong>34 a 38 anos:</strong> R$ 216,34</li>
        <li><strong>39 a 43 anos:</strong> R$ 251,30</li>
        <li><strong>44 a 48 anos:</strong> R$ 387,00</li>
        <li><strong>49 a 53 anos:</strong> R$ 592,11</li>
        <li><strong>54 a 58 anos:</strong> R$ 665,95</li>
        <li><strong>59 anos ou mais:</strong> R$ 942,99</li>
      </ul>
      <p>
        É um exemplo, não uma regra fixa: cada cidade tem sua própria rede e seu próprio valor, e o
        portfólio ainda tem outras opções de plano além do Nosso Médico, como o Mix e o Pleno,
        detalhados no post sobre a{' '}
        <Link to="/blog/tabela-precos-hapvida-2026">tabela de preços Hapvida 2026</Link>. Um
        consultor confirma o valor exato para a sua cidade e o plano escolhido.
      </p>

      <h2>Os saltos que mais pesam no bolso</h2>
      <p>
        Olhando essa tabela, dois saltos chamam atenção: dos 44 aos 48 anos o valor sobe cerca de
        54%, e dos 49 aos 53 anos, mais 53%. Não é erro de tabela. É nessas faixas que o uso do
        plano de saúde costuma aumentar na população em geral, e o cálculo reflete isso. Quem está
        perto de completar uma dessas idades e ainda não tem plano, vale considerar contratar antes
        de mudar de faixa.
      </p>

      <h2>Faixa etária e reajuste anual não são a mesma coisa</h2>
      <p>
        Tem um ponto que gera confusão. A mudança de faixa etária acontece quando você completa a
        idade que muda de categoria: seu plano passa a custar o valor daquela nova faixa. Já o
        reajuste anual é aplicado no aniversário do contrato, independente da sua idade, e segue
        regras diferentes conforme a modalidade. As duas coisas podem acontecer no mesmo ano.
        Detalhamos essa diferença, modalidade por modalidade, no post sobre{' '}
        <Link to="/blog/reajuste-plano-hapvida-como-funciona">reajuste do plano Hapvida</Link>.
      </p>

      <h2>E os dependentes, entram pela mesma faixa?</h2>
      <p>
        No plano familiar, cada dependente é cobrado pela própria faixa etária, não por uma média
        da família. Incluir um filho recém-nascido custa pela faixa de 0 a 18 anos; incluir um dos
        pais custa pela faixa que corresponde à idade dele. Veja mais no post sobre{' '}
        <Link to="/blog/plano-hapvida-familiar-dependentes">plano de saúde familiar Hapvida</Link>.
      </p>

      <h2>Perguntas frequentes</h2>

      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Por que o preço do plano Hapvida muda com a idade?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Porque a tabela é organizada por faixa etária, seguindo regra da ANS. Cada faixa tem um
            valor próprio, e o valor sobe conforme a idade avança.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quantas faixas etárias existem?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Segundo a ANS, são 10 faixas, da faixa de 0 a 18 anos até a de 59 anos ou mais.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Existe um limite para o quanto o preço pode subir entre a faixa mais nova e a mais velha?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Segundo a ANS, o valor cobrado na última faixa não pode ultrapassar 6 vezes o valor
            cobrado na primeira faixa.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Em quais idades o preço costuma subir mais?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            No exemplo de tabela usado nesta página (Ribeirão Preto, plano Nosso Médico), os
            maiores saltos ficam entre 44 e 48 anos e entre 49 e 53 anos. Um consultor confirma se
            o mesmo padrão se aplica à sua cidade e ao plano escolhido.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A tabela por idade é igual em todas as cidades?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. A rede disponível e o valor variam por cidade; a tabela usada aqui é um exemplo.
            Peça a cotação para confirmar o valor exato da sua cidade.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Mudança de faixa etária é a mesma coisa que reajuste anual?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. A faixa etária muda quando você completa a idade limite daquela faixa. O reajuste
            é aplicado no aniversário do contrato, independente da idade. As duas coisas podem
            acontecer no mesmo ano, por motivos diferentes.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Cada dependente do plano familiar entra pela própria faixa etária?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Cada beneficiário incluído é cobrado pela faixa etária correspondente à idade dele,
            não por uma média da família.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Como descubro o valor exato para a minha idade?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Pedindo a cotação. O consultor confirma o valor considerando sua idade, sua cidade e o
            plano escolhido entre Mix, Nosso Plano e Pleno.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        A idade é só um dos fatores que compõem o preço do plano Hapvida, mas costuma ser o que mais
        varia de pessoa para pessoa. Antes de decidir com base numa tabela genérica encontrada por
        aí, peça a cotação com a sua idade real e a sua cidade.
      </p>
      <p>
        Solicite uma cotação sem compromisso pelo WhatsApp. Veja também a{' '}
        <Link to="/tabela-de-preco-hapvida">tabela de preço completa</Link> ou as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link>.
      </p>
    </>
  );
}
