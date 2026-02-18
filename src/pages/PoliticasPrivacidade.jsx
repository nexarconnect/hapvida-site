import React from "react";
import { Link } from "react-router-dom";

export default function PoliticasPrivacidade() {
  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          <p className="text-sm text-gray-600 mb-3">
            <Link to="/#home" className="hover:underline text-[#0B2B5A]">
              Home
            </Link>{" "}
            <span className="text-gray-400">/</span> Políticas de Privacidade
          </p>

          <h1 className="text-3xl font-bold text-[#0B2B5A]">
            Políticas de Privacidade
          </h1>
          <p className="text-gray-600 mt-2">Última atualização: 11/02/2026</p>
        </header>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              1. Sobre a Nexar
            </h2>
            <p>
              Especialistas em planos de saúde Hapvida. Conectando você ao
              melhor cuidado de saúde.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              2. Dados que coletamos
            </h2>
            <p>
              Podemos coletar dados informados por você em formulários e canais
              de atendimento, como nome, WhatsApp, cidade e preferências
              relacionadas à cotação.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              3. Como usamos seus dados
            </h2>
            <p>
              Usamos seus dados para responder solicitações, viabilizar o
              atendimento por consultor, enviar cotações e melhorar a
              experiência no site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              4. Compartilhamento de dados
            </h2>
            <p>
              Seus dados podem ser compartilhados com consultores autorizados
              para viabilizar o atendimento e a cotação solicitada, bem como com
              plataformas de tecnologia necessárias para a operação do site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              5. Cookies e analytics
            </h2>
            <p>
              Este site pode usar cookies e tecnologias similares para medir
              desempenho e melhorar o conteúdo. Ferramentas de analytics podem
              registrar eventos de navegação.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              6. Segurança
            </h2>
            <p>
              Adotamos medidas de segurança para proteger os dados sob nossa
              responsabilidade. Ainda assim, nenhum sistema é 100% imune a
              incidentes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              7. Seus direitos
            </h2>
            <p>
              Você pode solicitar atualização, correção, acesso ou exclusão de
              dados, conforme aplicável. Para isso, entre em contato pelos
              canais oficiais.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              8. Contato
            </h2>
            <p>
              Telefone/WhatsApp: <strong>(14) 99123-5094</strong>
              <br />
              E-mail: <strong>nexarconnect@gmail.com</strong>
            </p>
          </div>

          <div className="pt-4">
            <Link
              to="/#home"
              className="inline-flex items-center justify-center h-11 px-5 rounded-md text-sm font-semibold text-white transition-colors duration-200"
              style={{ backgroundColor: "#0B2B5A" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Voltar para a Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}