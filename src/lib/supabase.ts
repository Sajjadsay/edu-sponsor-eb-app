/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(

  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('http')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Local Persistence Fallback Helper
 * Ensures smooth, reliable state persistence if Supabase credentials are in development setup mode.
 */
export function getStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`edusponsor_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Could not read localStorage key ${key}:`, e);
    return fallback;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`edusponsor_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn(`Could not set localStorage key ${key}:`, e);
  }
}
