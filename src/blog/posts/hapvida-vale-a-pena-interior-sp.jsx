import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Building2, Clock3, ArrowRight, CircleCheck, CircleX } from 'lucide-react';

export default function Body() {
  return (
    <>
      <p>
        O plano Hapvida no interior de SP costuma entrar na conversa pelo preço, e é justamente aí que a
        dúvida aparece: <strong>vale a pena?</strong> A resposta honesta depende de três coisas: quanto você
        paga, o que a rede cobre na sua cidade e quanto tempo você espera para começar a usar. Vamos por
        partes.
      </p>

      <div className="not-prose my-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
          <DollarSign className="mx-auto h-6 w-6 text-[#ff8200]" />
          <p className="mt-2 text-sm font-black uppercase tracking-widest text-slate-400">Preço</p>
          <p className="mt-1 text-sm text-slate-600">Varia por idade, cidade e modalidade.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
          <Building2 className="mx-auto h-6 w-6 text-[#ff8200]" />
          <p className="mt-2 text-sm font-black uppercase tracking-widest text-slate-400">Rede</p>
          <p className="mt-1 text-sm text-slate-600">Própria e credenciada, depende do plano.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-center">
          <Clock3 className="mx-auto h-6 w-6 text-[#ff8200]" />
          <p className="mt-2 text-sm font-black uppercase tracking-widest text-slate-400">Carência</p>
          <p className="mt-1 text-sm text-slate-600">De 24 horas a 180 dias, por tipo de atendimento.</p>
        </div>
      </div>

      <h2>Quanto custa: o valor que você vê não é o valor que você paga</h2>
      <p>
        A referência inicial divulgada é de <strong>R$ 157,29</strong>, e esse número aparece em quase toda
        busca por preço. Só que ele é um ponto de partida, não uma etiqueta. Como explicamos nas nossas{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link>, a tabela oficial muda conforme a
        região, a faixa etária e a modalidade contratada: individual, familiar ou empresarial.
      </p>
      <p>
        Na prática, duas pessoas da mesma cidade podem receber valores bem diferentes. Idade é o fator que
        mais mexe no cálculo. Município também: a tabela de Bauru não é a mesma de São José dos Campos.
        Por isso a única forma de saber quanto ficaria para você é pedir a cotação com os seus dados:
        qualquer valor exato fora disso seria chute.
      </p>

      <div className="not-prose my-8 rounded-3xl bg-[#002b5c] p-7 md:p-8">
        <p className="text-xs font-black uppercase tracking-widest text-[#ff8200]">Quer o número do seu caso?</p>
        <p className="mt-2 text-blue-100">
          Veja a página da sua cidade e solicite a cotação pelo WhatsApp:
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ['Bauru', '/plano-hapvida/bauru'],
            ['Ribeirão Preto', '/plano-hapvida/ribeirao-preto'],
            ['Franca', '/plano-hapvida/franca'],
            ['São José dos Campos', '/plano-hapvida/sao-jose-dos-campos'],
          ].map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/20"
            >
              {label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-blue-100/80">O retorno vem com os valores disponíveis para o seu perfil.</p>
      </div>

      <h2>A rede é o que mais pesa na decisão</h2>
      <p>
        Preço baixo com rede que não atende perto de casa vira problema no primeiro exame. Esse é o ponto
        que separa quem fica satisfeito de quem se arrepende depois.
      </p>
      <p>
        O modelo da Hapvida é diferente do de outras operadoras: boa parte do atendimento acontece em rede
        própria (hospitais, clínicas e pronto atendimentos da própria operadora) complementada por rede
        credenciada.
      </p>

      <div className="not-prose my-8 flex items-center gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50">
          <Building2 className="h-7 w-7 text-[#002b5c]" />
        </div>
        <p className="text-sm text-slate-600">
          Segundo os números divulgados pela operadora, são <strong className="text-[#002b5c]">mais de 87 unidades
          hospitalares próprias</strong> no país. Isso costuma explicar o preço mais competitivo, já que a
          operadora controla a própria estrutura.
        </p>
      </div>

      <p>
        Mas olha: rede nacional grande não garante nada sobre a sua rua. O que importa é o que existe no
        seu município e nas cidades vizinhas. Antes de assinar, confira a{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link> e peça ao consultor a lista de hospitais,
        clínicas e laboratórios disponíveis para a sua cidade; essa validação faz parte do atendimento.
      </p>
      <p>
        A consultoria Nexar atende hoje em Bauru, Ribeirão Preto, Franca, São José dos Campos, Sertãozinho,
        Lins, Araraquara, Limeira, Barretos, Pirassununga, Marília, São Carlos e Piracicaba.
      </p>

      <h2>Carência: quanto tempo até poder usar</h2>
      <p>
        De acordo com as regras da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, existem
        limites máximos de carência por tipo de procedimento. No plano Hapvida, as referências mais
        procuradas são urgência e emergência em <strong>24 horas</strong> e consultas e exames simples em{' '}
        <strong>30 dias</strong>.
      </p>
      <p>
        Para internação, cirurgia eletiva, parto e casos de doença preexistente, os prazos são maiores e
        seguem a tabela completa da ANS. Se você já tem plano ativo em outra operadora, a portabilidade pode
        reduzir ou eliminar essa espera. Detalhamos os dois caminhos no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h2>Para quem costuma valer a pena</h2>

      <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <CircleCheck className="h-5 w-5 text-emerald-600" />
            <p className="font-black text-slate-900">Costuma valer a pena para quem</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Mora em cidade com rede própria consolidada</li>
            <li>Busca custo mensal previsível</li>
            <li>Usa o plano para consultas, exames e emergências</li>
            <li>
              Tem CNPJ ativo, incluindo MEI: veja o que muda no{' '}
              <Link to="/blog/plano-hapvida-empresarial-mei">plano empresarial e MEI</Link>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
          <div className="mb-3 flex items-center gap-2">
            <CircleX className="h-5 w-5 text-slate-400" />
            <p className="font-black text-slate-900">A conta pode não fechar para quem</p>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Já tem médicos de confiança fora da rede e não pretende trocar</li>
            <li>Mora em município sem unidade próxima</li>
          </ul>
        </div>
      </div>

      <p>
        É melhor descobrir isso antes da assinatura do que depois, e um consultor confirma exatamente o que
        está disponível para o seu caso.
      </p>

      <h2>Perguntas frequentes</h2>

      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O plano Hapvida é mais barato no interior de SP?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            O valor varia por município, faixa etária e modalidade: não existe um preço único do interior. A
            referência inicial de R$ 157,29 é estimativa baseada nas tabelas vigentes e pode mudar sem aviso
            prévio. Um consultor confirma o valor exato para a sua cidade e idade.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quanto tempo depois de contratar eu já posso usar?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Urgência e emergência em 24 horas, consultas e exames simples em 30 dias. Os demais procedimentos
            seguem os prazos da ANS e podem variar conforme o histórico de saúde declarado na contratação.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Dá para não esperar a carência?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Em alguns casos, sim. Quem já tem plano ativo e cumpriu as carências pode avaliar a portabilidade,
            prevista nas regras da ANS. A contratação empresarial também costuma ter condições diferentes. A
            avaliação é individual.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A rede atende na minha cidade?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            A operadora trabalha com rede própria e credenciada. Durante o atendimento, o consultor valida
            quais hospitais, clínicas e laboratórios estão disponíveis para o seu município antes de qualquer
            decisão.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O plano odontológico vem junto?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Há opções que combinam saúde e odonto, dependendo da modalidade e da disponibilidade comercial da
            região. O consultor mostra as alternativas no momento da cotação.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Posso contratar sendo MEI?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim. Com empresa ativa, inclusive MEI, é possível avaliar a modalidade empresarial, que costuma
            ter regra comercial própria conforme a região.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Vale a pena quando o preço cabe no orçamento <em>e</em> a rede resolve a sua rotina. Os dois lados
        precisam fechar. E os dois só dá para conferir com os seus dados na mesa: sua idade, sua cidade, seu
        tipo de contratação.
      </p>

      <div className="not-prose my-8 rounded-3xl bg-slate-50 p-7 text-center md:p-8">
        <p className="font-black text-slate-900">
          Solicite uma cotação sem compromisso e receba os valores da sua cidade pelo WhatsApp
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            ['Marília', '/plano-hapvida/marilia'],
            ['Piracicaba', '/plano-hapvida/piracicaba'],
            ['São Carlos', '/plano-hapvida/sao-carlos'],
          ].map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#002b5c] transition-colors hover:bg-slate-100"
            >
              {label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Depois de contratar, veja também o que o{' '}
          <Link to="/blog/tecnologia-plano-hapvida-app-teleconsulta" className="font-bold text-[#002b5c] underline">
            app e a teleconsulta do plano Hapvida
          </Link>{' '}
          resolvem no dia a dia.
        </p>
      </div>
    </>
  );
}
