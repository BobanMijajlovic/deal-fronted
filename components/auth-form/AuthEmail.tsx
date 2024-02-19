'use client'
import * as React from 'react';
import AuthButton from "@/components/auth-form/AuthButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import Input from "@/components/input/Input";
import {signIn} from "next-auth/react";
import {cn} from "@/lib/utils";
import {useSpinnerGlobal} from "@/store/SpinnerGlobal";

type Props = {
    className?: string
};

type TFormType = {
    email: string
}

export const AuthEmail = ({className}: Props) => {

    const {setSpinnerActive, resetSpinner} = useSpinnerGlobal()

    const {
        register,
        handleSubmit,
        formState
    } = useForm<TFormType>({
        defaultValues: {
            email: ''
        },
        resolver: yupResolver(
            yup.object().shape({
                email: yup.string().required().email()
            })
        )
    })
    const {errors} = formState

    const onSubmit = (data: TFormType) => {
        setSpinnerActive()
        const {email} = data
        signIn("email", {
            email,
            callbackUrl: "/"
        }).then(v => {
          }).finally(() => {
            resetSpinner()
        })
    }

    return (
        <>
            <form className={cn("flex flex-col justify-stretch w-full gap-3 p-4 rounded", className)}
                  onSubmit={handleSubmit(onSubmit)}>
                <Input id={"email"} register={register} errors={errors} label={"Email"}/>
                <AuthButton title={"Email Only"} className={"bg-gray-100"} type={"submit"}/>
            </form>
        </>
    );
};

export default AuthEmail
