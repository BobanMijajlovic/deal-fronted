// @flow
'use client'
import * as React from 'react';
import {cn} from "@/lib/utils";

type Props =  Partial<{
    label: string
}> & React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({className,label = "BUTTON", type="button", ...props}: Props) => {
    return (
        <button
            className={cn(`
                  bg-transparent
                  text-gray-600                
                  font-bold
                  uppercase
                  border-2
                  border-gray-200
                  hover:border-gray-300
                  active:opacity-75
                  active:scale-95
                  text-sm
                  px-6 py-3
                  rounded-md
                  outline-none 
                  focus:outline-none 
                  mr-1 mb-1 ease-linear transition-all duration-150`, className)}
                  {...props}
                  type={type}
                  >
            {label}
        </button>
    );
};


export default Button
