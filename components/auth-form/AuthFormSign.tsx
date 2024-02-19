'use client'
import * as React from 'react';
import Input from "@/components/input/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup"
import AuthButton from "@/components/auth-form/AuthButton";
import {REQ_METHOD} from "@/app/api/d";
import {useSpinnerGlobal} from "@/store/SpinnerGlobal";
import Link from "next/link";
import {AUTH_PATH} from "@/components/auth-form/d";
import {useRouter} from "next/navigation";


type TForm = {
    userName: string,
    password: string
    confirmPassword: string
}

type Props = {};

export const AuthFormSign = (props: Props) => {

    const {setSpinnerActive, resetSpinner} = useSpinnerGlobal()
    const router = useRouter()

    const {
            register,
            handleSubmit,
            formState
        } = useForm<TForm>({
            defaultValues: {
                userName: "boban.mijajlovic.rs@gmail.com",
                password: "bobi123$$",
                confirmPassword: "bobi123$$"
            },
            resolver: yupResolver(
                yup.object().shape({
                    userName: yup.string().required().min(4),
                    password: yup.string().required().min(6),
                    confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Password must match")
                }),
        )
})

    const onSubmit = async (data: TForm) => {
        setSpinnerActive()
        try {
            const _data = await fetch("/api/auth/register", {
                method: REQ_METHOD.POST,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            router.replace("/auth")
        }catch (e) {

        }finally
        {
            resetSpinner()
        }
    }


    const {errors} = formState

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-[400px] p-4 border border-gray-100 shadow-md rounded-md">
            <div className={"w-full py-2 mb-8 text-lg text-gray-900 text-center"}>Sign Up Process</div>
            <div className="mb-2">
                <Input
                    register={register}
                    errors={errors}
                    label={"Username"}
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
            <div className="mb-2">
                <Input
                    register={register}
                    errors={errors}
                    label={"Confirm Password"}
                    type="password"
                    id="confirmPassword"
                />
            </div>
            <AuthButton type={"submit"} className={"bg-gray-100"} prefix={"Sign Up"}/>
            <div className={"mt-6 text-xs text-gray-900 text-sm"}>Have Account <Link href={`${AUTH_PATH}`} className={"text-blue-800 text-sm underline font-bold"}>Sign In</Link></div>
        </form>
    )
};
