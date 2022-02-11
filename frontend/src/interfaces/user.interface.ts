export interface Token{
    refresh?: string,
    access?: string
}
export interface User {
    id?: string,
    email?:string,
    username?: string,
    password?:string,
    tokens?: Token,
    bio?: string,
    full_name?: string,
    birth_date?:string,
    is_staff?:boolean,
}

export interface UserResponse{
    user?: User
}