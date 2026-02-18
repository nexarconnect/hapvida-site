import React, { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import InfoCardsSection from "../components/InfoCardsSection";
// Importe o fallback estático para garantir que a página nunca quebre
import { hapvidaNetworkStats } from "../content/hapvidaNetworkStats";

// Helper de formatação (fora do componente para performance)
const formatStatValue = (item) => {
  if (item?.format === "text" && item?.value_text) return item.value_text;

  const n = item?.value;
  if (n === null || n === undefined) return "-";

  if (item?.format === "int") return Number(n).toLocaleString("pt-BR");
  if (item?.format === "decimal")
    return Number(n).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return String(n);
};

export default function RedeCredenciada() {
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState(null);
  const [items, setItems] = useState([]);

  // 1. Busca dados no Supabase (com fallback silencioso)
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        if (!isSupabaseConfigured()) throw new Error("Supabase off");

        // Busca snapshot ativo
        const { data: snap, error: snapErr } = await supabase
          .from("network_stats_snapshots")
          .select("slug,title,reference_label,notes")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (snapErr) throw snapErr;
        if (!snap?.slug) throw new Error("No active snapshot");

        // Busca itens do snapshot
        const { data: it, error: itErr } = await supabase
          .from("network_stat_items")
          .select("section,key,label,value,value_text,format,sort_order")
          .eq("snapshot_slug", snap.slug)
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (itErr) throw itErr;

        if (mounted) {
          setSnapshot(snap);
          setItems(it || []);
        }
      } catch (e) {
        console.warn("Usando fallback estático:", e.message);
        // Em caso de erro, mantemos snapshot/items vazios e o useMemo usará o fallback
        if (mounted) {
          setSnapshot(null);
          setItems([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => (mounted = false);
  }, []);

  // 2. Organiza dados por seção (Supabase ou Fallback)
  const data = useMemo(() => {
    // Se temos dados do Supabase, usamos eles
    if (snapshot && items.length > 0) {
      const bySection = new Map();
      for (const it of items) {
        if (!bySection.has(it.section)) bySection.set(it.section, []);
        bySection.get(it.section).push(it);
      }

      const totals = bySection.get("totals") || [];
      const types = bySection.get("units_by_type") || [];
      const region = bySection.get("hospitals_by_region") || [];
      const southeast = bySection.get("southeast_detail") || [];

      return {
        source: {
          title: snapshot.title,
          dateLabel: snapshot.reference_label,
          notes: snapshot.notes,
        },
        overview: {
          title: "Rede própria e integrada",
          description: "Resumo da estrutura e tipos de unidades.",
        },
        topCards: [...totals, ...types].map((x) => ({
          key: x.key,
          label: x.label,
          value: formatStatValue(x),
        })),
        hospitalsByRegion: region.map((x) => ({
          key: x.key,
          label: x.label,
          value: formatStatValue(x),
        })),
        southeastDetail: southeast.map((x) => ({
          key: x.key,
          label: x.label,
          value: formatStatValue(x),
        })),
      };
    }

    // Fallback: usa o arquivo estático hapvidaNetworkStats.js
    return {
      source: hapvidaNetworkStats.source,
      overview: hapvidaNetworkStats.overview,
      topCards: [
        ...hapvidaNetworkStats.totals,
        ...hapvidaNetworkStats.unitsByType,
      ].map((x) => ({
        key: x.key,
        label: x.label,
        value: formatStatValue(x),
      })),
      hospitalsByRegion: hapvidaNetworkStats.hospitalsByRegion.map((x) => ({
        key: x.key,
        label: x.label,
        value: formatStatValue(x),
      })),
      southeastDetail: hapvidaNetworkStats.southeastDetail.map((x) => ({
        key: x.key,
        label: x.label,
        value: formatStatValue(x),
      })),
    };
  }, [snapshot, items]);

  // 3. Formata texto do Sudeste (ex: "SP 29 | MG 10 | RJ 4")
  const southeastText = useMemo(() => {
    return data.southeastDetail
      .map((x) => `${x.label} ${x.value}`)
      .join(" | ");
  }, [data]);

  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B2B5A]">
            Rede credenciada e unidades
          </h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Informações gerais sobre a rede própria e integrada e consulta por cidade.
          </p>
        </header>

        {loading && !snapshot ? (
          // Loading state simples (opcional: skeleton)
          <div className="py-12 text-center text-gray-500">
            Carregando informações da rede...
          </div>
        ) : (
          <div className="space-y-6">
            {/* Seção 1: Totais e Tipos */}
            <InfoCardsSection
              title={data.overview.title}
              subtitle={data.overview.description}
              items={data.topCards}
              columns="3"
            />

            {/* Seção 2: Hospitais por Região */}
            <InfoCardsSection
              title="Distribuição de hospitais por região"
              subtitle="Quantidade de hospitais na rede própria por região."
              items={data.hospitalsByRegion}
              columns="5"
            />

            {/* Seção 3: Detalhe Sudeste + Fonte */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#0B2B5A]">
                Detalhe do Sudeste
              </h3>
              <p className="text-gray-600 mt-2">{southeastText}</p>

              <p className="text-xs text-gray-500 mt-4">
                Fonte: {data.source.title} ({data.source.dateLabel}).{" "}
                {data.source.notes}
              </p>
            </section>

            {/* Seção 4: Consulta por Cidade */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#0B2B5A]">
                Consulta por cidade
              </h3>
              <p className="text-gray-600 mt-2">
                Selecione uma cidade para verificar a disponibilidade e referências.
              </p>

              {/* AQUI entra seu componente de busca existente */}
              {/* <UnitsSearch /> */}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}