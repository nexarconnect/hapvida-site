import React from "react";

const formatValue = (value, format) => {
  if (format === "int") return Number(value).toLocaleString("pt-BR");
  return String(value);
};

export default function InfoCardsSection({ title, subtitle, items, columns = "3" }) {
  const gridCols =
    columns === "5"
      ? "grid-cols-2 md:grid-cols-5"
      : columns === "4"
      ? "grid-cols-2 md:grid-cols-4"
      : "grid-cols-2 md:grid-cols-3";

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {title && <h3 className="text-xl font-bold text-[#0B2B5A]">{title}</h3>}
      {subtitle && <p className="text-gray-600 mt-2 max-w-3xl">{subtitle}</p>}

      <div className={`grid ${gridCols} gap-4 mt-6`}>
        {items.map((item) => (
          <div
            key={item.key || item.label}
            className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4"
          >
            <div className="text-2xl font-extrabold text-[#0B2B5A] leading-tight">
              {formatValue(item.value, item.format)}
            </div>
            <div className="text-sm text-gray-600 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}