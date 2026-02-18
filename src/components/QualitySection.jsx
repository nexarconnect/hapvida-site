import React from "react";
import { hapvidaNetworkStats } from "../content/hapvidaNetworkStats";

export default function QualitySection() {
  const { quality } = hapvidaNetworkStats;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B2B5A]">
            {quality.title}
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            {quality.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quality.items.map((item, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl border ${
                item.highlight
                  ? "bg-[#0B2B5A] text-white border-[#0B2B5A]"
                  : "bg-gray-50 text-[#0B2B5A] border-gray-100"
              } shadow-sm flex flex-col justify-between`}
            >
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    item.highlight ? "text-blue-100" : "text-gray-600"
                  }`}
                >
                  {item.title}
                </h3>
                <div className="text-4xl font-extrabold mb-2">{item.value}</div>
                <p
                  className={`text-sm leading-relaxed ${
                    item.highlight ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {item.comparison && (
                <div
                  className={`mt-6 pt-4 border-t text-xs font-medium ${
                    item.highlight
                      ? "border-blue-800 text-blue-200"
                      : "border-gray-200 text-gray-500"
                  }`}
                >
                  Comparativo: {item.comparison}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Fonte: {hapvidaNetworkStats.source.title} ({hapvidaNetworkStats.source.dateLabel}).
          </p>
        </div>
      </div>
    </section>
  );
}