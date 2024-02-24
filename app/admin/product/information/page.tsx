'use client'
import * as React from 'react';
import Button from "@/components/button/button";
import Input from "@/components/input/Input";
import {Resolver, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useSpinnerGlobal} from "@/store/SpinnerGlobal";
import {postNewProduct} from "@/api/admin/product";
import {useRef} from "react";


type TProductForm = {
    title: string,
    price?: number
}

const Page = () => {
    const {
        trigger,
        register,
        handleSubmit,
        formState
    } = useForm<TProductForm>({
        resolver: yupResolver(
            yup.object().shape({
                title: yup.string().required(),
                price: yup
                    .mixed()
                    .test("valid number", "Price must be in valid format ###.##",

                        (value) => {
                            if (!value) return true
                            return /^\d+(\.\d{0,2})?$/.test(`${value}`)
                        })
                    .transform((value) => {
                        if (!value) return 0
                        return parseFloat(value)
                    })


            })
        ) as Resolver<TProductForm>
    })
    const {errors} = formState
    const {setSpinnerActive, resetSpinner} = useSpinnerGlobal()
    const onSubmit = async (data: TProductForm) => {
        try {
            setSpinnerActive()
            await postNewProduct(data)
        } catch (e) {

        } finally {
            resetSpinner()
        }
    }

    const refForm = useRef<HTMLFormElement>(null)
    const onClick = async () => {
        const form = refForm.current
        const resTrigger =  await trigger()
        if(!resTrigger) return
        if (form) {
            if (typeof form.requestSubmit === 'function') {
                form.requestSubmit();
            } else {
                form.dispatchEvent(new Event('submit', {cancelable: true}));
            }
        }
    }


    return (
        <div className={"flex w-full flex-col"}>
            <div>Product Information</div>
            <form className={"flex w-full flex-col justify-center items-center"} ref= {refForm}
                  onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id={"title"}
                    register={register}
                    errors={errors}
                    label={"Title"}
                    required
                />
                <Input
                    id={"price"}
                    register={register}
                    errors={errors}
                    label={"Base Price"}
                    required
                    type={"number"}
                    step="0.01"
                />
                <Button type={"button"} className={"mt-4"} label={"SAVE"} onClick={onClick}/>
            </form>
        </div>
    )
};

export default Page;
