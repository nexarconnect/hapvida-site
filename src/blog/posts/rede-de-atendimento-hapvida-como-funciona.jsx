import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Antes de pedir a cotação do plano Hapvida, vale entender uma coisa: a operadora não atende como a
        maioria das outras. Boa parte da estrutura é própria: hospitais, clínicas e prontos-atendimentos
        que ela mesma controla. Isso muda como a rede funciona na sua cidade. O que importa de verdade é
        simples: o que existe perto de onde você mora.
      </p>

      <h2>Rede própria e rede credenciada: qual a diferença</h2>
      <p>
        Na prática, a Hapvida opera em dois níveis. O primeiro é a rede própria: unidades da operadora, com
        atendimento concentrado em hospitais, clínicas e laboratórios que ela mesma administra, na estrutura
        conhecida como Hapvida NDI em São Paulo. O segundo é a rede credenciada: prestadores
        contratados para completar a cobertura onde a rede própria ainda não chega.
      </p>
      <p>
        Segundo os números divulgados pela própria operadora, são mais de 87 unidades hospitalares próprias
        no país, além de mais de 75 clínicas e mais de 22 prontos-atendimentos. É esse controle sobre a
        própria estrutura que costuma explicar o preço mais competitivo: o custo não passa por terceiros.
      </p>
      <p>
        Tem um detalhe que muita gente ignora: rede nacional grande não garante nada sobre a sua rua. O que
        vale na hora de decidir é a combinação de rede própria e credenciada que existe no seu município e
        nas cidades vizinhas. Preço baixo com rede longe vira problema no primeiro exame. Por isso, peça as
        duas coisas juntas na cotação: valores e lista de unidades da sua cidade. Um consultor autorizado
        envia as duas pelo WhatsApp em minutos.
      </p>

      <h2>Urgência e emergência: carência de 24 horas</h2>
      <p>
        De acordo com as regras da <abbr title="Agência Nacional de Saúde Suplementar">ANS</abbr>, urgência
        e emergência têm carência máxima de 24 horas. Contratou hoje, pode usar um pronto-atendimento a
        partir de amanhã. É regra pública, não cortesia da operadora. Consultas e exames simples entram em
        até 30 dias; os demais procedimentos seguem a tabela completa da ANS, como detalhamos no post sobre{' '}
        <Link to="/blog/carencia-plano-hapvida">carência no plano Hapvida</Link>.
      </p>

      <h2>Como confirmar a rede da sua cidade</h2>
      <p>
        O caminho mais direto é a nossa página de{' '}
        <Link to="/rede-de-atendimento">rede de atendimento</Link>, que lista as unidades por município. E o
        consultor valida quais hospitais, clínicas e laboratórios estão disponíveis para a sua região antes
        de qualquer assinatura; essa validação faz parte do atendimento. Na cotação, peça a lista de
        unidades da sua cidade junto com os valores: são as duas informações que evitam surpresa no primeiro
        exame.
      </p>

      <h2>Cidades com atendimento da consultoria Nexar</h2>
      <p>
        A consultoria Nexar atende hoje em Bauru, Ribeirão Preto, Franca, São José dos Campos, Sertãozinho,
        Lins, Araraquara, Limeira, Barretos, Pirassununga, Marília, São Carlos e Piracicaba. Se a sua cidade
        está na lista, o próximo passo é conferir a página da sua cidade e pedir a cotação com valores e
        rede do seu perfil: <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/ribeirao-preto">Ribeirão Preto</Link> ou{' '}
        <Link to="/plano-hapvida/marilia">Marília</Link>.
      </p>

      <h2>Perguntas frequentes</h2>

      <h3>A rede Hapvida é toda própria?</h3>
      <p>
        Não. Funciona em dois níveis: rede própria (unidades da operadora) e rede credenciada (prestadores
        contratados). A proporção varia conforme a cidade; um consultor confirma o que se aplica ao seu
        município.
      </p>

      <h3>A rede atende na minha cidade?</h3>
      <p>
        A operadora cobre as cidades em que há rede própria ou credenciada. Durante o atendimento, o
        consultor valida as unidades disponíveis para o seu município antes de qualquer decisão.
      </p>

      <h3>Como funciona em caso de emergência?</h3>
      <p>
        Urgência e emergência têm carência máxima de 24 horas pela regra da ANS. O atendimento fora da sua
        cidade depende do tipo de plano e da região; confirme com o consultor.
      </p>

      <h3>O plano cobre atendimento fora da minha cidade?</h3>
      <p>
        Varia conforme o plano e a região. A confirmação é individual: leve os dados do seu perfil para o
        consultor validar a cobertura onde você precisa.
      </p>

      <h3>Como saber quais hospitais e clínicas estão disponíveis?</h3>
      <p>
        Pela nossa página de <Link to="/rede-de-atendimento">rede de atendimento</Link>, por cidade, e pela
        validação do consultor na cotação. As duas fontes juntas evitam surpresa no primeiro exame.
      </p>

      <h3>O plano odontológico está incluso?</h3>
      <p>
        Há opções que combinam saúde e odonto, conforme a modalidade e a disponibilidade comercial da
        região. O consultor mostra as alternativas no momento da cotação.
      </p>

      <h3>O valor do Hapvida parte de R$ 157,29?</h3>
      <p>
        A referência inicial divulgada no site é de R$ 157,29 e varia por município, faixa etária e
        modalidade: individual, familiar ou empresarial. Um consultor confirma o valor exato para o seu
        caso.
      </p>

      <h2>Conclusão</h2>
      <p>
        Rede boa é a que atende perto de casa. O preço do Hapvida chama atenção, mas a decisão só fecha
        quando você confere o que existe na sua cidade, e isso é rápido. Solicite uma cotação sem
        compromisso e peça a lista de unidades junto com os valores, direto pelo WhatsApp com um consultor
        autorizado. Veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano.
      </p>
    </>
  );
}
