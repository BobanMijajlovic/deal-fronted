
import * as React from 'react';

type Props = React.PropsWithChildren<{

}>;
const Layout = ({children}: Props) => {
    return (
        <div className={"flex w-full justify-center items-center min-h-screen"}>
            {children}
        </div>
    );
};

export default Layout
