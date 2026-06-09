import React, { useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import InfoCardsSection from "../components/InfoCardsSection";
import { hapvidaNetworkStats } from "../components/HapvidaNetworkStats";

const formatStatValue = (item) => {
  if (item?.format === "text" && item?.value_text) return item.value_text;

  const n = item?.value;
  if (n === null || n === undefined) return "-";

  if (item?.format === "int") return Number(n).toLocaleString("pt-BR");
  if (item?.format === "decimal") {
    return Number(n).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return String(n);
};

export default function RedeCredenciada() {
  const [loading, setLoading] = useState(true);
  const [snapshot, setSnapshot] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);

      try {
        if (!isSupabaseConfigured()) throw new Error("Supabase off");

        const { data: snap, error: snapErr } = await supabase
          .from("network_stats_snapshots")
          .select("slug,title,reference_label,notes")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (snapErr) throw snapErr;
        if (!snap?.slug) throw new Error("No active snapshot");

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

        if (mounted) {
          setSnapshot(null);
          setItems([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const data = useMemo(() => {
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
          title: "Panorama da rede própria e integrada",
          description:
            "Resumo da estrutura da rede Hapvida e dos principais tipos de unidades de atendimento.",
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

  const southeastText = useMemo(() => {
    return data.southeastDetail.map((x) => `${x.label} ${x.value}`).join(" | ");
  }, [data]);

  return (
    <main className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B2B5A]">
            Rede Hapvida: hospitais, clínicas e unidades de atendimento
          </h1>
          <p className="text-gray-600 mt-2 max-w-3xl">
            Veja um panorama da estrutura da rede Hapvida e consulte a
            disponibilidade de atendimento de acordo com a sua cidade.
          </p>
        </header>

        {loading && !snapshot ? (
          <div className="py-12 text-center text-gray-500">
            Carregando dados da rede Hapvida...
          </div>
        ) : (
          <div className="space-y-6">
            <InfoCardsSection
              title={data.overview.title}
              subtitle={data.overview.description}
              items={data.topCards}
              columns="3"
            />

            <InfoCardsSection
              title="Distribuição de hospitais por região"
              subtitle="Quantidade de hospitais da rede própria distribuídos por região do país."
              items={data.hospitalsByRegion}
              columns="5"
            />

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#0B2B5A]">
                Detalhe do Sudeste
              </h3>
              <p className="text-gray-600 mt-2">
                Recorte da presença da rede Hapvida nos principais estados do Sudeste.
              </p>
              <p className="text-gray-700 mt-3">{southeastText}</p>

              <p className="text-xs text-gray-500 mt-4">
                Fonte de referência: {data.source.title} ({data.source.dateLabel}).{" "}
                {data.source.notes}
              </p>
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-bold text-[#0B2B5A]">
                Consulta por cidade
              </h3>
              <p className="text-gray-600 mt-2">
                Selecione sua cidade para consultar disponibilidade, estrutura de
                atendimento e referências da rede na sua região.
              </p>

              {/* <UnitsSearch /> */}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}