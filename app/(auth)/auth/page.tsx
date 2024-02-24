import * as React from 'react';
import {getProviders} from "next-auth/react";
import AuthForm from "@/components/auth-form/AuthForm";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";


const Page = async () => {
    const providers = Object.values(await getProviders() || {})
    const dataSession = await getServerSession()
    const isUser = !!dataSession?.user
    if (isUser) {
        return redirect("/")
    }

    // if(true) return <AuthFormCredentials />
    return <AuthForm providers={providers}/>
};

export default Page;
