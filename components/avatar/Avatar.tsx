'use client'
import * as React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";

type Props = {
    src?: string | null,
    className?: string,
    size?: number,
    onClick?: (e?:React.MouseEvent)=> void
};
const Avatar = ({src, className, size, ...rest}: Props) => {
    return <Image
        className={cn("rounded-full",className)}
        height={size || 30}
        width={size || 30}
        alt="Avatar"
        src={src || '/images/placeholder.jpg'}
        {...rest}
    />
}



export default Avatar
