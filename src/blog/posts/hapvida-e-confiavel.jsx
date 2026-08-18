import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Hapvida é confiável? É a primeira coisa que muita gente pergunta antes de sequer olhar o preço,
        principalmente quem nunca contratou plano de saúde com esse nome. Faz sentido: por trás da
        cotação existe uma estrutura de tamanho bem diferente do que a maioria imagina, e vale conhecer
        antes de decidir.
      </p>

      <h2>Quem é a Hapvida</h2>
      <p>
        Como mostra a página institucional do{' '}
        <Link to="/sobre-o-grupo-hapvida">Grupo Hapvida</Link>, a operadora tem mais de 80 anos de
        atuação no Brasil e reúne hoje cerca de 15,9 milhões de beneficiários. A estrutura própria soma
        mais de 86 hospitais, 80 prontos-socorros, 365 clínicas e 301 unidades de diagnóstico, com mais
        de 28 mil médicos e 20 mil dentistas credenciados. O grupo emprega mais de 73 mil pessoas em
        todo o país.
      </p>
      <p>
        Esses números por si só não dizem se o plano cabe no seu bolso ou atende perto da sua casa: isso
        só a cotação confirma, cidade por cidade. Mas ajudam a responder a pergunta de confiança: não é
        uma operadora pequena nem recente no mercado.
      </p>

      <h2>Como funciona o modelo de rede própria</h2>
      <p>
        A Hapvida opera de forma verticalizada: boa parte dos hospitais, prontos-atendimentos, clínicas
        e laboratórios pertence e é administrada pela própria operadora, em vez de terceirizada por
        completo a prestadores externos. Segundo a operadora, é esse controle sobre a estrutura que
        permite acompanhar a jornada do paciente do início ao fim, com prontuário unificado entre as
        unidades.
      </p>
      <p>
        Na prática, isso muda o que você encontra na sua cidade: em municípios onde a rede própria ainda
        não chega, entra a rede credenciada, com prestadores contratados para completar a cobertura.
        Detalhamos essa diferença, e como confirmar o que existe no seu município, no post sobre{' '}
        <Link to="/blog/rede-de-atendimento-hapvida-como-funciona">
          rede de atendimento Hapvida
        </Link>
        .
      </p>

      <h2>Certificações e qualidade assistencial</h2>
      <p>
        A operadora possui certificação NBR ISO 9001:2015 para o Sistema de Gestão da Qualidade das
        áreas de Ouvidoria, Regulatório e Telessaúde, emitida pela Fundação Carlos Alberto Vanzolini.
        Mantém ainda o Qualitotal, programa de qualidade assistencial criado pela Lifeplace Hapvida em
        2019, que avalia continuamente hospitais e clínicas por ciclos de auditoria, com duas
        certificações progressivas: Gold e Platinum. Em 2024, o manual do programa foi reconhecido pela
        ISQua (International Society for Quality in Health Care).
      </p>

      <h2>Ética, compliance e canal de denúncias</h2>
      <p>
        A Hapvida mantém um departamento de Integridade e Compliance e um canal de denúncias confidencial
        e independente, o Canal Sentinela, disponível pelo telefone 0800 591 5126 ou pelo site
        www.hapvida.com.br/canaldedenuncias. É um ponto que costuma pesar na hora de avaliar se uma
        operadora é séria: existe canal formal, administrado por empresa terceira, para reportar conduta
        antiética.
      </p>

      <h2>O que isso muda para quem vai contratar</h2>
      <p>
        Tamanho de grupo e certificação não substituem a checagem local. O que decide se o plano funciona
        para você é a combinação de preço, carência e rede na sua cidade, não o porte nacional da
        operadora. Se você mora no interior de SP, a consultoria Nexar atende em{' '}
        <Link to="/plano-hapvida/bauru">Bauru</Link>,{' '}
        <Link to="/plano-hapvida/ribeirao-preto">Ribeirão Preto</Link>,{' '}
        <Link to="/plano-hapvida/franca">Franca</Link> e outras cidades da região: veja a página da sua
        cidade ou peça a cotação para confirmar valor e rede disponível para o seu perfil.
      </p>

      <h2>Perguntas frequentes</h2>

      <div className="not-prose space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Hapvida é confiável?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            É uma das maiores operadoras de saúde do Brasil em número de beneficiários, com estrutura
            própria de hospitais e clínicas, certificação ISO 9001:2015 para processos de qualidade e
            canal de compliance independente para denúncias. Como em qualquer contratação, vale confirmar
            preço, carência e rede da sua cidade antes de assinar.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">Quantos beneficiários tem a Hapvida?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Segundo dados institucionais divulgados pela própria operadora, cerca de 15,9 milhões de
            beneficiários em todo o Brasil.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">A Hapvida é do governo?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            Não. É uma empresa privada que opera como operadora de saúde suplementar, sujeita à
            regulamentação e fiscalização da ANS, assim como as demais operadoras do setor.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O que é a rede própria da Hapvida?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            É a estrutura de hospitais, prontos-atendimentos, clínicas e laboratórios administrada
            diretamente pela operadora, em vez de terceirizada por completo. Onde a rede própria não
            chega, a cobertura é complementada pela rede credenciada.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">O que é o Qualitotal?</h3>
          <p className="!mt-2 text-sm text-slate-600">
            É o programa de qualidade assistencial da Lifeplace Hapvida, com auditorias contínuas e duas
            certificações progressivas (Gold e Platinum). O manual do programa foi reconhecido pela ISQua
            em 2024.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">
            Como faço para denunciar uma conduta antiética?
          </h3>
          <p className="!mt-2 text-sm text-slate-600">
            Pelo Canal Sentinela, administrado por empresa independente: telefone 0800 591 5126 ou pelo
            site www.hapvida.com.br/canaldedenuncias. A denúncia pode ser feita de forma confidencial e
            anônima.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="!mt-0 font-black text-slate-900">
            A Hapvida atende no interior de SP?
          </h3>
          <p className="!mt-2 text-sm text-slate-600">
            Sim, através da consultoria Nexar, autorizada a comercializar planos Hapvida em cidades como
            Bauru, Ribeirão Preto, Franca e São José dos Campos. Um consultor confirma a rede disponível
            para o seu município.
          </p>
        </div>
      </div>

      <h2>Conclusão</h2>
      <p>
        Grupo grande, certificado e com canal de compliance formal responde à pergunta sobre confiança da
        operadora. Mas a decisão de contratar depende do que importa na sua rotina: preço, carência e
        rede perto de casa. Peça uma cotação sem compromisso com um consultor autorizado Hapvida pelo
        WhatsApp e confirme os valores e a rede disponível para a sua cidade. Veja também as{' '}
        <Link to="/perguntas-frequentes">perguntas frequentes</Link> sobre o plano.
      </p>
    </>
  );
}
