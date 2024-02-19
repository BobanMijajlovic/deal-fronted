'use client'
import * as React from 'react';
import Button from "@/components/button/button";
import Input from "@/components/input/Input";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";


const Page =  () => {
    const {
        register,
        handleSubmit,
        formState
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                title: yup.string().required()
            })
        )
    })
    const {errors} = formState
    console.log("errors ", errors)
    const onSubmit = async (data:any) => {
      /*  try {
            setSpinnerActive()
            }catch(e) {
            resetSpinner()
        }*/
    }
    return (
        <div className={"flex w-full flex-col"}>
            <div>Product Information</div>
            <form  className={"flex w-full flex-col justify-center items-center"}
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id={"title"}
                    register={register}
                    errors={errors}
                    label={"Title"}
                    required
                />
                <Button type={"submit"} className={"mt-4"} label={"SAVE"}/>
            </form>
        </div>
    )
};

export default Page;
