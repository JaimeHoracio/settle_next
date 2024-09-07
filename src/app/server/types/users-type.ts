
export interface UserLoggedDto {
    idUser: string
    name: string
    createdAt?: Date
    friends: UserDto[]
}

export interface UserDto {
    idUser: string
    name: string
}