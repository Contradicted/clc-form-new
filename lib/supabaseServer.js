import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const { cookies } = require("next/headers")

export const createServerSupabaseClient = () => {
    const cookieStore = cookies();

    return createServerComponentClient({ cookies: () => cookieStore })
}