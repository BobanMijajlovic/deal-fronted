'use client'
import * as React from 'react';
import {cn} from "@/lib/utils";
import AuthEmail from "@/components/auth-form/AuthEmail";
import AuthSocial from "@/components/auth-form/AuthSocial";
import {AUTH_PATH, AUTH_STATUS, PARAM_NEED_EMAIL_VERIFY, PARAM_SIGN_UP, TProvider} from "@/components/auth-form/d";
import {useSearchParams} from "next/navigation";
import AuthEmailVerify from "@/components/auth-form/AuthEmailVerify";
import {AuthFormSign} from "@/components/auth-form/AuthFormSign";
import {AuthFormCredentials} from "@/components/auth-form/AuthFormCredentials";
import Link from "next/link";


const _ERRORS = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "Try signing in with a different account.",
    OAuthCallback: "Try signing in with a different account.",
    OAuthCreateAccount: "Try signing in with a different account.",
    EmailCreateAccount: "Try signing in with a different account.",
    Callback: "Try signing in with a different account.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "The e-mail could not be sent.",
    CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
    SessionRequired: "Please sign in to access this page.",
    default: "Unable to sign in."
};


type Props = {
    providers: TProvider[]
};


const _providersTypeAuth = ["oauth", "oidc"]


const ComponentDivider = ({label, className}: { label: string, className?: string }) => {
    return (<div className={cn("flex flex-row justify-center w-full items-center", className)}>
        <div className="border-b border-gray-200 w-full"/>
        <div className="text-gray-500 whitespace-nowrap text-sm px-2">{label}</div>
        <div className="border-b border-gray-200 w-full"/>
    </div>)
}


const AuthForm = ({providers}: Props) => {


    const searchParams = useSearchParams()
    const isNeedEmailVerify = searchParams.get(PARAM_NEED_EMAIL_VERIFY)
    const isSignInProcess = searchParams.get(PARAM_SIGN_UP)

    const _providersAuth = providers.filter(provider => _providersTypeAuth.includes(provider.type))
    const _providerEmail = providers.find(provider => provider.type === "email")
    // @ts-ignore
    const _providerCredentials = providers.find(provider => provider.type === "credentials")

    const _error =  searchParams.get("error")
    const error = _error &&  _ERRORS[_error as keyof typeof _ERRORS]


    if(isNeedEmailVerify) return <AuthEmailVerify />
    if(isSignInProcess) return <AuthFormSign />



    return (
        <div className="min-w-[400px] w-[400px] border border-gray-100 shadow-sm py-5 px-6 rounded-md bg-gray-50/[.3]">

            <div className="font-bold text-2xl w-full text-center py-3">Sign In</div>

            {error && (
                <div className="flex p-2 w-fit text-center text-red-950 bg-red-400/20 rounded shadow-md text-sm">
                    {error}
                </div>
            )}

            <div className={"w-full"}>
                <ComponentDivider label={"Use existing Account"} className={"my-3"}/>
                <AuthSocial providers={_providersAuth}/>
            </div>

            {_providerEmail &&
                <div className={"w-full mt-10"}>
                    <ComponentDivider label={"Or just using Email"} className={"my-0"}/>
                    <AuthEmail/>
                </div>
            }


            {_providerCredentials &&
                <div className={"w-full mt-10"}>
                    <ComponentDivider label={"Or using Email & Password"} className={"my-0"}/>
                    <AuthFormCredentials/>
                </div>
            }
            {!isSignInProcess ?  <div className={"mt-2 text-gray-900 text-xs"}>No Account <Link href={`${AUTH_PATH}?${PARAM_SIGN_UP}=1`} className={"text-blue-800 text-sm underline font-bold"} >Sign Up</Link></div> : null}
       </div>
    );
};

export default AuthForm;
