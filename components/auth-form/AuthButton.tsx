// @flow
"use client"
import * as React from 'react';
import {IconType} from "react-icons";
import {cn} from "@/lib/utils";
import {ButtonHTMLAttributes} from "react";
type Props = React.PropsWithChildren<{
    onClick?: () => void
    title?: string
    prefix?: string
    icon?: IconType
    iconSize?: string | number
}> & ButtonHTMLAttributes<HTMLButtonElement>;


export const AuthButton = ({children,  className,onClick, prefix="Sing in with", icon: Icon, title, iconSize = 24,type="button", ...rest}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(`
             w-full
             flex
             flex-row
             ${!!title ? 'justify-start': "justify-center"}
             items-center
             rounded-md 
             px-4 
             py-2        
             shadow-sm
             border-solid
             border
             border-gray-100
             bg-white           
             text-gray-950 
             focus:outline-0
             focus:shadow-md
             hover:shadow-md
             hover:border-gray-300
             focus:border-gray-400
           `, className)}
            {...rest}
        >
            {!!children && children ||
            <>
            { Icon && <Icon size={iconSize}/> }
               {prefix && <span className={"pr-2 pl-4"}>{prefix}</span> }
               {title &&  <span className={'font-semibold'}>{title}</span> }
            </>
            }
        </button>
    );
};

export default AuthButton
