// @flow
import * as React from 'react';
import {cn} from "@/lib/utils";
import {ButtonHTMLAttributes, ReactNode} from "react";
import {IconType} from "react-icons";

type Props = React.PropsWithChildren<{
    onClick?: () => void;
    isLogin?: boolean;
    title?: ReactNode
    icon?: IconType,
    iconSize?: string | number;
    iconOnly?: boolean
}> & Omit<ButtonHTMLAttributes<HTMLButtonElement>,"title"| "icon">


export const SingInButton = ({children, iconOnly, className,onClick, icon: Icon,  title, iconSize = 24, ...rest}: Props) => {
    return (
        <button
            onClick={onClick}
            className={cn(`
             ${!iconOnly  ? 'w-full': ''}
             flex
             flex-row
             ${!!title ? 'justify-start': "justify-center"}
             items-center
             ${!iconOnly  ? 'rounded-md px-4 py-2':'rounded-full p-2'}           
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
                    { !iconOnly &&
                        <>{ !!title  &&
                            <>
                                {title}
                            </>
                        }
                        </> }
                </>
            }
        </button>
    );
};


export default SingInButton
