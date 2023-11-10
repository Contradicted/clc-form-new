import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { createServerSupabaseClient } from "@/lib/supabaseServer"
import { buttonVariants } from "@/components/ui/button"

import { RegisterAuthForm } from "./_components/registerAuthForm"

const RegisterPage = async () => {

    const supabase = createServerSupabaseClient();
    const { data } = await supabase.auth.getSession();

    if (data?.session) {
        redirect("/")
    }

    return (
        <>
            <div className="container flex relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/signin"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Login
                </Link>
                <div className="relative hidden h-screen justify-center items-center flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-slate-50" />
                    <Image
                        src="/logo.png"
                        alt="company-logo"
                        width={600}
                        height={600}
                        className="z-50"
                    />
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <RegisterAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="#"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="#"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;
