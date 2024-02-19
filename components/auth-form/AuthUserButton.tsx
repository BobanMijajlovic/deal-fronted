'use client'
import * as React from 'react';
import {useRef, useState} from 'react';
import Avatar from "@/components/avatar/Avatar";
import {signOut, useSession} from "next-auth/react";
import {BsArrowBarRight, BsGear} from "react-icons/bs";
import {AUTH_STATUS} from "@/components/auth-form/d";
import {cn} from "@/lib/utils";
import {className} from "postcss-selector-parser";
import Link from "next/link";

type Props = {
    className?: string
};
export const AuthUserButton = (props: Props) => {
    const dataSession = useSession()
    const user = dataSession.data?.user
    const imageSrc = user?.image

    console.log("user ", user)

    const isSignIn = dataSession.status === AUTH_STATUS.authenticated
    const [isOpen, setIsOpen] = useState<boolean | string>(false)
    const toggleOpen = (e?: React.MouseEvent) => {
           setIsOpen(v => {
               if(!isSignIn || !e) return v
               if(v) return false
               const elementRect = (e.target as HTMLElement).getBoundingClientRect()
               const elementLeft = elementRect.left + window.scrollX;
               const position = (elementLeft / document.documentElement.scrollWidth) * 100
               return position>50 ?  "md:right-2 md:left-auto" :  "md:left-2"
           })
    }

    return (
        <div className={cn("relative right-0", className) }>
            <Avatar src={imageSrc} className="cursor-pointer" onClick={toggleOpen}/>
            { isOpen &&  <div className={"z-[49] inset-0 min-h-screen bg-gray-200 opacity-25 absolute"} onClick={()=> setIsOpen(false)}></div> }
            {isOpen &&
                <div className={cn(`
                        inline-flex
                        fixed
                        top-[40px]
                        z-50
                        bg-white
                        justify-stretch
                        flex-col
                        p-4
                        left-0
                        rounded-md
                        shadow-lg
                        border
                        border-gray-50
                        mx-4
                        w-[calc(100vw-4em)]
                        md:mx-0
                        md:absolute   
                        md:w-max                    
                        `, isOpen)}>
                    <div className="flex flex-row justify-start items-end">
                        <Avatar src={imageSrc} size={40}/>
                        <div className="flex flex-col justify-items-start pl-2">
                            <div className="font-medium">{user?.name}</div>
                            <div className="text-sm font-light">{user?.email}</div>
                        </div>
                    </div>
                    <div className="flex flex-col pt-8 px-2">
                        <Link
                            href={"/settings"}
                            className="flex flex-row items-center p-2 justify-start gap-4 cursor-pointer border-b border-transparent hover:border-gray-200 active:border-gray-400">
                            <BsGear size={24}/>
                            <div className="font-light text-sm whitespace-nowrap">Settings</div>
                        </Link>

                        <div
                            onClick={() => signOut()}
                            className="flex flex-row items-center p-2 justify-start gap-4 cursor-pointer border-b border-transparent hover:border-gray-200 active:border-gray-400">
                            <BsArrowBarRight size={24}/>
                            <div className="font-light text-sm whitespace-nowrap">Sign Out</div>
                        </div>
                    </div>
                </div>}
        </div>
    );
};


export default AuthUserButton
