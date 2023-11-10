"use client"

import { useState } from "react"
import { Github, Loader2 } from "lucide-react"
import { Toaster, toast } from "sonner"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export function LoginAuthForm({ className, ...props }) {

    const [email, setEmail] = useState("")
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

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            await supabase.auth.updateUser({
                data: { justRegistered: false }
            })

            if (error) {
                toast.error(`${error.message}`)
                return;
            }

            // Reset Form
            setEmail("")
            setPassword("")

            console.log("User successfully logged in!", data)

            router.push('/')
        } catch (error) {
            toast.error("Something went wrong", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={onSubmit}>
                    <p className="text-xs text-muted-foreground text-right pb-2">
                        <Link
                            href="/reset-password"
                            className="hover:text-primary"
                        >
                            Forgot password?

                        </Link>
                    </p>
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
                            Sign In
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Github className="mr-2 h-4 w-4" />
                    )}{" "}
                    Github
                </Button>
            </div>
            <Toaster richColors />
        </>
    )
}