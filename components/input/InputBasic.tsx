'use client'
import * as React from 'react';
import {FieldError,UseFormRegisterReturn} from "react-hook-form";
import {cn} from "@/lib/utils";

type Props = {
    id?: string,
    register?: UseFormRegisterReturn
    error?: FieldError
} &  React.HTMLProps<HTMLInputElement>
const InputBasic = ({label, id: htmlId, register, error, className, required, ...rest}: Props) => {

    return (
        <div className={cn("w-full flex  flex-col flex-shrink relative", className)}>
          <input
                id={htmlId}
                type="text"
                placeholder=" "
                {...register}
                className={`
                           peer
                           border-b
                           ${error ? 'border-red-400' : 'border-neutral-300'}
                           focus:${error ? 'border-red-400' : 'border-sky-400'}
                           border-solid
                           px-4
                           pb-0.5
                           pt-4
                           font-light
                           transition
                           outline-none
                           w-full
                           mb-5
                           `}
                {...rest}
          />

            {error?.message && <div className={`
                               absolute
                               py-[1px]
                               px-1
                               text-xs
                               bottom-0
                               left-0
                               w-full
                               bg-red-100
                               rounded-[2px]
                               text-red-900
                               `}> {error?.message} </div>
            }
            <label
                htmlFor={"email"}
                className={`
                              absolute
                              text-xs
                              duration-150
                              transform
                              top-0
                              z-10
                              left-4
                              translate-y-0
                              font-medium
                              ${error ? 'text-red-700' : 'text-gray-600'}
                              peer-placeholder-shown:text-sm
                              peer-placeholder-shown:translate-y-4
                              peer-focus:text-xs
                              peer-focus:translate-y-0
                        `}>
                               {label}
                                {required && <small>&nbsp;*</small>}
                                </label>

        </div>
    );
};


export default InputBasic
