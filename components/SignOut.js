"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "./ui/button";

export const SignOut = async () => {
    const supabase = createClientComponentClient();

    async function handleSignOut() {

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log("[SIGN_OUT_ERROR]", error)
        }
    }

    return (
        <Button
            type="button"
            onClick={handleSignOut}
        >
            Sign Out
        </Button>
    )
}