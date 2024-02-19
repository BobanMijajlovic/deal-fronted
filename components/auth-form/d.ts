

export enum AUTH_STATUS {
    authenticated = "authenticated"
}

export const AUTH_PATH = "/auth"

export const PARAM_NEED_EMAIL_VERIFY = "needEmailVerify"
export const PARAM_SIGN_UP = "signUp"

export type TProvider = {
    id: string,
    type: string
}
