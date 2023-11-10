import { createServerSupabaseClient } from '@/lib/supabaseServer'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
        await supabase.auth.exchangeCodeForSession(code)

        const { data: { user } } = await supabase.auth.getUser();

        await supabase.auth.updateUser({
            data: { isResettingPassword: true }
        })

        return NextResponse.redirect(`${requestUrl.origin}/update-password`)
    }

    console.log("ERROR: Invalid auth code or no auth code found");

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin)
}