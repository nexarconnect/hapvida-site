import React from 'react';
import { Link } from 'react-router-dom';

export default function Body() {
  return (
    <>
      <p>
        Ter uma empresa ativa (incluindo MEI) costuma abrir acesso a condições comerciais diferentes
        das disponíveis para contratação individual. Antes de decidir entre plano individual e
        empresarial, vale entender o que muda de fato.
      </p>

      <h2>Quem pode contratar como empresarial</h2>
      <p>
        Planos empresariais são voltados a empresas e MEI com CNPJ ativo. A condição comercial exata
        (valores, rede disponível e regras de carência) varia conforme a região e o perfil da empresa, por
        isso a cotação para modalidade empresarial é sempre personalizada: não existe uma tabela única
        válida para todo o país.
      </p>

      <h2>Documentação necessária</h2>
      <p>
        Para dar entrada na cotação empresarial, o consultor solicita o CNPJ (ativo) e os documentos
        pessoais de cada beneficiário a ser incluído. A lista completa varia conforme o tempo de
        atividade da empresa e a quantidade de vidas: o consultor confirma exatamente o que é necessário
        para o seu caso antes de iniciar o processo.
      </p>

      <h2>Individual ou empresarial: como decidir</h2>
      <p>
        Se você tem CNPJ ativo (mesmo como MEI) vale sempre pedir as duas cotações (individual e
        empresarial) antes de contratar. Como a condição comercial muda por região, a diferença entre as
        duas modalidades pode ser pequena em algumas cidades e relevante em outras.
      </p>

      <p>
        Quer saber se compensa no seu caso? Veja também como funciona a{' '}
        <Link to="/blog/carencia-plano-hapvida">carência do plano Hapvida</Link> ou solicite uma cotação
        para comparar as duas modalidades na sua cidade. Se a ideia é incluir cônjuge e filhos em vez de
        CNPJ, veja como funciona o{' '}
        <Link to="/blog/plano-hapvida-familiar-dependentes">plano de saúde familiar Hapvida</Link>.
      </p>
    </>
  );
}
