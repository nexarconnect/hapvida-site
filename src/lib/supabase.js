import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set and not default placeholders
const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-url.supabase.co' && 
  !supabaseUrl.includes('placeholder');

export const isSupabaseConfigured = () => isConfigured;

// Create client with fallbacks to avoid runtime crashes during initialization
// If not configured, we use dummy values. The components will handle the fallback logic.
const url = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const key = isConfigured ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(url, key);

// Database schema instructions for Supabase (Reference):
// 
// CREATE TABLE leads (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   name TEXT NOT NULL,
//   whatsapp TEXT NOT NULL,
//   city TEXT NOT NULL,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
// );
//
// CREATE TABLE price_tables ( ... );