'use client'
import * as React from 'react';
import {FieldError, FieldErrors, Path, UseFormRegister} from "react-hook-form";
import InputBasic from "@/components/input/InputBasic";

type PropsWith<T extends string> = {
    label?: string,
    id?: string,
    register?: UseFormRegister<Record<T, any>>
    errors?: FieldErrors
} & React.HTMLProps<HTMLInputElement>


const Input = <T extends string>({errors, register, ...rest}: PropsWith<T>) => {
    const {id: htmlId} = rest
    const error = htmlId && errors?.[htmlId] as FieldError
    const _register = htmlId && register && register(htmlId as unknown as Path<Record<T, any>>)
    const props = {
        ...(_register ? {register: _register} : {}),
        ...(error ? {error} : {})
    }
    return <InputBasic {...rest} {...props}/>
}


export default Input
