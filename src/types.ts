
export type CreateUserDTO = {
    name: string,
    phone: string,
    birthday: string,
    email: string,
    password: string
}

export type UpdateUserDTO = {
    name?: string | null
    phone?: string | null,
    birthday?: string | null,
    email?: string | null
}

export type UserLoginDto = {
    email: string,
    password: string
}

export type TokenInfos = {
    id: number
    email: string
    name: string
}