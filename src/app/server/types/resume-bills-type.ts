
export interface RowExpense {
    nameDebt: string,
    currency: string,
    totalAmount: number,
    namePaid: string,
}

export interface Expenses {
    currency: string,
    list_expenses: RowExpense[]
}