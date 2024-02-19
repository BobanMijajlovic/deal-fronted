import * as React from 'react';
import {getCsrfToken, getProviders, getSession, signIn, useSession} from "next-auth/react";
import AuthForm from "@/components/auth-form/AuthForm";
import {getServerSession} from "next-auth";
import {AUTH_STATUS} from "@/components/auth-form/d";
import {redirect} from "next/navigation";
import {AuthFormSign} from "@/components/auth-form-sign/AuthFormSign";



const Page = async () => {
    const providers = Object.values(await getProviders() || {})
    const dataSession = await getServerSession()
    const isUser = !!dataSession?.user
    if(isUser) {
         return redirect("/")
    }

   // if(true) return <AuthFormCredentials />
    return <AuthForm providers ={providers} />
};

export default Page;
