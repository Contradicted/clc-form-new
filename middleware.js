import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const { data } = await supabase.auth.getSession();

    // if user is signed in and the current path is /update-password redirect the user to /profile
    if (data?.session && req.pathname === '/update-password') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return res
}

export const config = {
    matcher: ['/', '/profile'],
}