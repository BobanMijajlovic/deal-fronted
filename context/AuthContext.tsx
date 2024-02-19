'use client'
import * as React from 'react';
import {SessionProvider} from "next-auth/react";

type Props = React.PropsWithChildren<{

}>;
export const AuthContext = ({children}: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default AuthContext
