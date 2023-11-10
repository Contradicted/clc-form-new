import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { createServerSupabaseClient } from "@/lib/supabaseServer"
import { buttonVariants } from "@/components/ui/button"

import { UpdatePasswordAuthForm } from "./_component/updatePasswordAuthForm"

const UpdatePasswordPage = async () => {

    const supabase = createServerSupabaseClient();

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/signin")
    }

    if (!session?.user?.user_metadata.isResettingPassword) {
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
                                Update password
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter a new password for your account.
                            </p>
                        </div>
                        <UpdatePasswordAuthForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePasswordPage;
