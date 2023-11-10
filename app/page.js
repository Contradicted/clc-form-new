import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

import { SignOut } from "@/components/SignOut";
import { createServerSupabaseClient } from "@/lib/supabaseServer";

export default async function Home() {

  const supabase = createServerSupabaseClient()

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin")
  }

  return (
    <div>
      {JSON.stringify(user)}
      <SignOut />
    </div>
  )
}
