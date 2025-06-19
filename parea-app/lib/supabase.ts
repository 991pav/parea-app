import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createClient() {
  // If Supabase is not configured, return a mock client for demo purposes
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase not configured - using mock client for demo")
    return createMockClient()
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Mock client for demo purposes when Supabase is not configured
function createMockClient() {
  return {
    auth: {
      signInWithPassword: async ({ email, password }: any) => {
        // Mock successful login
        const mockUser = {
          id: "demo-user-id",
          email: email,
          profile: {
            id: "demo-user-id",
            email: email,
            full_name: "Utilisateur Demo",
            child_name: "Emma",
            role: "parent1",
          },
          subscription: {
            plan_type: "free",
            status: "active",
          },
        }
        return { data: { user: mockUser }, error: null }
      },
      signUp: async ({ email, password }: any) => {
        // Mock successful signup
        const mockUser = {
          id: "demo-user-id",
          email: email,
        }
        return { data: { user: mockUser }, error: null }
      },
      signOut: async () => {
        return { error: null }
      },
      getSession: async () => {
        return { data: { session: null }, error: null }
      },
      onAuthStateChange: (callback: any) => {
        return { data: { subscription: { unsubscribe: () => {} } } }
      },
    },
    from: (table: string) => ({
      select: (columns: string) => ({
        eq: (column: string, value: any) => ({
          single: async () => {
            if (table === "profiles") {
              return {
                data: {
                  id: "demo-user-id",
                  email: "demo@example.com",
                  full_name: "Utilisateur Demo",
                  child_name: "Emma",
                  role: "parent1",
                },
                error: null,
              }
            }
            if (table === "subscriptions") {
              return {
                data: {
                  plan_type: "free",
                  status: "active",
                },
                error: null,
              }
            }
            return { data: null, error: null }
          },
        }),
      }),
      insert: async (data: any) => {
        return { data: null, error: null }
      },
    }),
  }
}

export const isSupabaseConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
