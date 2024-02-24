'use client'
import * as React from 'react';
import {FieldError, FieldErrors, Path, UseFormRegister} from "react-hook-form";
import InputBasic from "@/components/input/InputBasic";

type PropsWith = {
    label?: string,
    id?: string,
    register?: UseFormRegister<any>
    errors?: FieldErrors
} & React.HTMLProps<HTMLInputElement>


const Input = ({errors, register, ...rest}: PropsWith) => {
    const {id: htmlId} = rest
    const error = htmlId && errors?.[htmlId] as FieldError
    const _register = htmlId && register && register(htmlId)
    const props = {
        ...(_register ? {register: _register} : {}),
        ...(error ? {error} : {})
    }
    return <InputBasic {...rest} {...props}/>
}


export default Input
