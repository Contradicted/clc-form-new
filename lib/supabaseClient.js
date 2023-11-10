import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabaseClient = createClientComponentClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default supabaseClient;