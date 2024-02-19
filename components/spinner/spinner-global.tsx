// @flow
'use client'
import * as React from 'react';
import {useSpinnerGlobal} from "@/store/SpinnerGlobal";

type Props = {

};
export const SpinnerGlobal = (props: Props) => {

    const {spinnerActive}= useSpinnerGlobal()
    if(!spinnerActive) return;
    return   <>
        <div className={"absolute inset-0  flex justify-center items-center bg-white/50 border z-20"}>
            <div className={"absolute flex justify-center items-center"}>
                <div className="relative flex h-20 w-20 justify-center items-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-200 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-gray-200 border border-solid border-gray-300 shadow-md"></span>
                </div>
            </div>
        </div>
    </>
};

export default SpinnerGlobal
