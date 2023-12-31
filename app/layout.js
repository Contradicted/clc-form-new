import { Inter } from 'next/font/google'
import './globals.css'

import AuthProvider from '@/components/AuthProvider'
import { createServerSupabaseClient } from '@/lib/supabaseServer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  const supabase = createServerSupabaseClient()

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider accessToken={accessToken}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
