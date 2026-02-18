import React from "react";
import { Link } from "react-router-dom";

export default function TermosDeUso() {
  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          <p className="text-sm text-gray-600 mb-3">
            <Link to="/#home" className="hover:underline text-[#0B2B5A]">
              Home
            </Link>{" "}
            <span className="text-gray-400">/</span> Termos de uso
          </p>

          <h1 className="text-3xl font-bold text-[#0B2B5A]">Termos de uso</h1>
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
              2. Aceite dos termos
            </h2>
            <p>
              Ao acessar e utilizar este site, você concorda com estes Termos de
              uso. Se você não concordar, recomendamos não utilizar o site.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              3. Uso do site
            </h2>
            <p>
              Você se compromete a utilizar o site de forma lícita, sem violar
              direitos de terceiros, e sem tentar explorar falhas, automatizar
              abusos ou interferir no funcionamento do serviço.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              4. Informações e cotações
            </h2>
            <p>
              As informações exibidas podem variar por município, perfil e
              disponibilidade. Valores e condições podem ser confirmados pelo
              consultor durante o atendimento.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              5. Propriedade intelectual
            </h2>
            <p>
              Conteúdos, textos e elementos visuais deste site não podem ser
              copiados ou reproduzidos sem autorização, exceto quando permitido
              por lei.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              6. Limitação de responsabilidade
            </h2>
            <p>
              Não garantimos que o site ficará disponível de forma ininterrupta
              e isenta de erros. Podemos atualizar o conteúdo e remover páginas
              sem aviso prévio.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B2B5A] mb-2">
              7. Contato
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