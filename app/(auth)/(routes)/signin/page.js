import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LoginAuthForm } from "./_components/loginAuthForm"

const LoginPage = () => {
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
                                Sign in
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to sign in
                            </p>
                        </div>
                        <LoginAuthForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;