import Link from "next/link"
import { redirect } from "next/navigation"
// import { cookies } from "next/headers"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { ResetPasswordAuthForm } from "./_components/resetPasswordAuthForm"
import { createServerSupabaseClient } from "@/lib/supabaseServer"

const ResetPasswordPage = async () => {

    const supabase = createServerSupabaseClient()
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect("/")
    }

    return (
        <>
            <div className="container flex relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/signup"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Register
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-teal-300" />

                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Forgot password?
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                No worries, we&apos;ll send you reset instructions.
                            </p>
                        </div>
                        <ResetPasswordAuthForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPasswordPage;
