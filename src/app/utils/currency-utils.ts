import { currencies } from "@/app/server/types/currencies";
import { CurrencyDto } from "@/app/server/types/currency-type";

export const getCurrencyByCode = (code: string) => {
    return currencies.find((c) => c.code === code) as CurrencyDto
}
