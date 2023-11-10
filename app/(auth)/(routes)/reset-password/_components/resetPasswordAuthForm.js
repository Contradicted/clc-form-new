"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Toaster, toast } from "sonner"
import Link from "next/link"

export function ResetPasswordAuthForm({ className, ...props }) {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const supabase = createClientComponentClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    async function onSubmit(event) {
        try {
            event.preventDefault();
            setIsLoading(true)

            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}/api/auth/callback`,
            })

            if (error) {
                toast.error(`${error.message}`)
                return;
            }

            // Reset Form
            setEmail("")

            toast.success("Password reset instructions sent to email")
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
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Send instructions
                        </Button>
                    </div>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Remember your password? {" "}
                    <Link
                        href="/signin"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
            <Toaster richColors />
        </>
    )
}