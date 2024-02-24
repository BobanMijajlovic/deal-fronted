type TRequestOptions = Omit<Parameters<typeof fetch>[1], 'method'>


const BASE_URL = "http://localhost:3300"

const createUrl = (url: string) => {
    if (url?.[0] !== "/") {
        return `${BASE_URL}/${url}`
    }
    return `${BASE_URL}${url}`
}
export const GET = (url: string, requestOptions?: TRequestOptions) => {
    return fetch(createUrl(url), {
        ...requestOptions,
        method: "GET",
    })
}

export const POST = (url:string, requestOptions: TRequestOptions) => {
    return fetch(createUrl(url), {
        ...requestOptions,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
    })
}
