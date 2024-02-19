import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";

export type TNext = () => NextResponse<unknown>
type TUseMiddlewareReturn = NextResponse<unknown> | Promise<NextResponse<unknown>>

export type TUseMiddleware = (next: TNext, request: NextRequestWithAuth) => TUseMiddlewareReturn

const arrayOfUseMiddlewares: TUseMiddleware[] = [] as TUseMiddleware[]

export const withMiddleware = (fn: TUseMiddleware) => {
    arrayOfUseMiddlewares.push(fn)
}

const _paths = ["_next", 'images']

export const runMiddlewares = async (request: NextRequestWithAuth, event: NextFetchEvent) => {
    const {nextUrl, ...rest} = request
    const {pathname} = nextUrl

    const path = pathname.split("/").slice(1)
    if (path.length === 1) {
        const f = path[0]
        if (/.*\.\w{2,3}/.test(f)) {
            return
        }
    }
    if (_paths.includes(path[0])) {
        return NextResponse.next()
    }

    const nextReturn = new NextResponse()
    const nextFn = () => nextReturn

    for (const f of arrayOfUseMiddlewares) {
        const r = await f(nextFn, request)
        if (r !== nextReturn) {
            return r
        }
    }

    return NextResponse.next()
}

