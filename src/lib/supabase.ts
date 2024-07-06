import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdpdiytxubreyxsuoszm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkcGRpeXR4dWJyZXl4c3Vvc3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAyMzQxNDMsImV4cCI6MjAzNTgxMDE0M30.GWpqwnAYFRBYRsIDD1Um-viqLQFfi2HSE8xrOzM_kk8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})