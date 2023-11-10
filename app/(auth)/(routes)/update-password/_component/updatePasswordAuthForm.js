"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Toaster, toast } from "sonner"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"


export function UpdatePasswordAuthForm({ className, ...props }) {

    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const supabase = createClientComponentClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    async function onSubmit(event) {
        try {
            event.preventDefault();
            setIsLoading(true)

            const { data, error } = await supabase.auth.updateUser({
                password: password,
                data: { isResettingPassword: false }
            })

            await supabase.auth.signOut();

            if (error) {
                toast.error(`${error.message}`)
                return;
            }

            // Reset Form
            setPassword("")

            toast.success("Password has successfully been updated")

            router.replace("/signin")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-3">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="hello123"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>
            <Toaster richColors />
        </>
    )
}