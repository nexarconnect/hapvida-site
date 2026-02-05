import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set and not default placeholders
const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder');

export const isSupabaseConfigured = () => isConfigured;

// Create client with fallbacks to avoid runtime crashes during initialization
// If not configured, we use dummy values. The components will handle the fallback logic.
const url = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const key = isConfigured ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(url, key);

// =====================
// Normalization
// =====================
export const normalizeCityUF = (city, uf) => ({
  city: (city || '').trim().replace(/\s+/g, ' '),
  uf: (uf || '').trim().toUpperCase(),
});

// Database schema instructions for Supabase (Reference):
// 
// CREATE TABLE leads (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   nome_completo TEXT NOT NULL,
//   whatsapp TEXT NOT NULL,
//   cidade TEXT NOT NULL,
//   tipo_plano TEXT NOT NULL,
//   numero_pessoas INTEGER NOT NULL,
//   idades TEXT NOT NULL,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
// );
//
// CREATE TABLE price_tables (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   city TEXT NOT NULL,
//   plan_type TEXT NOT NULL,
//   price DECIMAL(10, 2) NOT NULL,
//   coverage TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
// );
//
// CREATE TABLE metrics (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   event_type TEXT NOT NULL,
//   event_data JSONB,
//   source TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
// );