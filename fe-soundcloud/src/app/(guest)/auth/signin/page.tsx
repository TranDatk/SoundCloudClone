import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthSignIn from "@/components/auth/auth.signin";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation"

const SignInPage = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect("/")
    }
    return (
        <AuthSignIn />
    )
}

export default SignInPage;