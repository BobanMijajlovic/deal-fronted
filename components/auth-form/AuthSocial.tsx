// @flow
import * as React from 'react';
import {cn} from "@/lib/utils";
import {signIn} from "next-auth/react";
import Image from "next/image";
import {TProvider} from "@/components/auth-form/d";
import {useSpinnerGlobal} from "@/store/SpinnerGlobal";

type Props = {
    providers: TProvider[]
};

const  ProvidersProps = {
    twitter:  {
        className: "bg-blue-900"
    },
    github:  {
        className: "bg-gray-700"
    },
    apple: {
        className: "bg-black"
    }
}
const logos = "https://authjs.dev/img/providers"
export const AuthSocial = ({providers}: Props) => {

    const {setSpinnerActive, resetSpinner} = useSpinnerGlobal()
    return (
        <div className={"flex flex-row flex-wrap px-4 py-3 justify-center gap-5 w-full"}>
            {
                providers.map((provider) => {
                    const className = ProvidersProps[provider.id as keyof typeof ProvidersProps]?.['className']
                    return (
                        <button
                            key={provider.id}
                            type="button"
                            className={cn("border p-2 border-gray-100 bg-gray-50 rounded-full shadow-md hover:shadow-xl", className)}
                            onClick={() => {
                                setSpinnerActive()
                                signIn((provider.id as string).toLowerCase(), {
                                    callbackUrl: "/"
                                })
                            }}
                        >
                            <Image
                                alt={"provider"}
                                loading="lazy"
                                height={24}
                                width={24}
                                src={`${logos}/${provider.id}.svg`}
                            />
                        </button>
                    )
                })
            }
        </div>
    );
};


export default AuthSocial
