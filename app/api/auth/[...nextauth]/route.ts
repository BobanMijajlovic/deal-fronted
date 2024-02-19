import NextAuth, {AuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "@/lib/prisma"
import {PARAM_NEED_EMAIL_VERIFY} from "@/components/auth-form/d";
import bcrypt from "bcrypt"


// @ts-ignore
// @ts-ignore
export const authOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        TwitterProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
/*        AppleProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),*/
   /*     FacebookProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),*/
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),
        CredentialsProvider({
            id: 'credentials-password',
            name: "credentials",
            credentials: {
                userName: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { password, userName: email} = credentials || {}
                if(!password ||  !email) {
                    return null
                }

                const user = await prismaClient.user.findUnique({
                    where: {
                        email
                    }
                })
                if(!user || !user.passwordHash) return null
                const passwordMatch = await bcrypt.compare(password, user.passwordHash)
                if(!passwordMatch) return null;
                return  user
            }
        })
    ],
    callbacks: {
        /*async jwt({ token, user }: AuthOptions["callbacks"]["jwt"]) {
            return { ...token, ...user, token: "some" };
        }*/
    },
    debug: process.env.NODE_ENV === 'development' && false,
    pages: {
        signIn: '/auth',
        signOut: '/auth',
        error: '/auth/error',
        verifyRequest: `/auth?${PARAM_NEED_EMAIL_VERIFY}=1`
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

// @ts-ignore
const handler = NextAuth(authOptions)

const GET = (...args: any) => {
    return handler(...args)
}

const POST = (...args: any) => {
   return handler(...args)
}

export {GET, POST}
