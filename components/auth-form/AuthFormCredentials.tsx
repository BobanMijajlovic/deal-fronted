'use client'
import * as React from 'react';
import Input from "@/components/input/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import AuthButton from "@/components/auth-form/AuthButton";
import {signIn} from "next-auth/react";
import {useSpinnerGlobal} from "@/store/SpinnerGlobal";
import Link from "next/link";
import {AUTH_PATH, PARAM_SIGN_UP} from "@/components/auth-form/d";


type TForm = {
    userName: string,
    password: string
}

type Props = {};

export const AuthFormCredentials = (props: Props) => {

    const {setSpinnerActive, resetSpinner} = useSpinnerGlobal()
    const {
            register,
            handleSubmit,
            formState
        } = useForm<TForm>({
            defaultValues: {
                userName: "boban.mijajlovic.sl@gmail.com",
                password: "bobi123$$",
            },
            resolver: yupResolver(
                yup.object().shape({
                    userName: yup.string().required().min(4),
                    password: yup.string().required().min(6)
                   }),
                 )
            })

    const onSubmit = (data: TForm) => {
        setSpinnerActive()
        signIn("credentials-password", {
            ...data,
            callbackUrl: "/"
        }).then(v => {
        }).catch(v=> {
        }).finally(() => {
            resetSpinner()
        })
    }


    const {errors} = formState

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-[400px] mt-2 px-6 py-8 ">
            <div className="mb-2">
                <Input
                    register={register}
                    errors={errors}
                    label={"Email"}
                    type="text"
                    id="userName"
                />
            </div>
            <div className="mb-2">
                <Input
                    register={register}
                    errors={errors}
                    label={"Password"}
                    type="password"
                    id="password"
                />
            </div>
            <AuthButton type={"submit"} className={"bg-gray-300 justify-center"} prefix={''} title={"Sign in"}/>
        </form>
    )
};
