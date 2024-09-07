import { CurrencyDto } from "./currency-type"

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