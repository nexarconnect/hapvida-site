import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/Sidebar';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';

const DEFAULT_CONFIG = {
  whatsapp_number: '',
  min_price: '',
  site_title: 'Plano de Saúde Hapvida 2026',
  city_filter: '',
};

export default function ConfigPage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from('config').select('*').single();
      if (data) setConfig({ ...DEFAULT_CONFIG, ...data });
      setLoading(false);
    }
    loadConfig();
  }, []);

  const handleSave = async () => {
    if (!supabase || saving) return;
    setSaving(true);
    setSaved(false);
    try {
      const { error } = await supabase
        .from('config')
        .upsert({ id: 1, ...config }, { onConflict: 'id' });
      if (!error) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Erro ao salvar config:', err);
    } finally {
      setSaving(false);
    }
  };

  const update = (key, value) => setConfig((prev) => ({ ...prev, [key]: value }));

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-slate-800">Configurações</h1>
            <p className="text-sm text-slate-500">Ajuste os parâmetros gerais do site.</p>
          </div>

          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Field
              label="Número do WhatsApp (com DDI)"
              description="Ex: 5514991235094"
              value={config.whatsapp_number}
              onChange={(v) => update('whatsapp_number', v)}
            />
            <Field
              label="Preço mínimo exibido (R$)"
              description="Ex: 75,70"
              value={config.min_price}
              onChange={(v) => update('min_price', v)}
            />
            <Field
              label="Título do site"
              value={config.site_title}
              onChange={(v) => update('site_title', v)}
            />
            <Field
              label="Filtro de cidade padrão"
              description="Deixe em branco para mostrar todas"
              value={config.city_filter}
              onChange={(v) => update('city_filter', v)}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-2xl bg-[#002b5c] px-8 py-4 font-bold text-white transition-all hover:bg-[#003b7d] disabled:opacity-60"
          >
            {saving ? (
              <><Loader2 size={18} className="animate-spin" /> Salvando...</>
            ) : saved ? (
              <><CheckCircle2 size={18} className="text-green-400" /> Salvo!</>
            ) : (
              <><Save size={18} /> Salvar configurações</>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

function Field({ label, description, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
      {description && <p className="mb-2 text-xs text-slate-400">{description}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#002b5c] focus:ring-2 focus:ring-[#002b5c]/10"
      />
    </div>
  );
}
