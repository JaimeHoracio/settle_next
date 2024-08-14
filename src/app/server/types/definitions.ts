//Tipos

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

export interface MeetDto {
    idMeet: string
    createdBy: UserDto
    name: string
    primary?: boolean
    details?: string
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface MeetSelectDto {
    idMeet: string
    name: string
    primary: boolean
}

export interface CurrencyDto {
    name: string
    code: string
    country: string
}

export interface DetailsBillDto {
    amount: number
    user: string
}

export interface ReceiptDto {
    amount: number
    discount: number
    currency: CurrencyDto
}

export interface BillDto {
    _id?: string
    idMeet: string
    createdBy: string
    reference: string
    receipt: ReceiptDto
    usersPaid: DetailsBillDto[]
    usersDebt: DetailsBillDto[]
}