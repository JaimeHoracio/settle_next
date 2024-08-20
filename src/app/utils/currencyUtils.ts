import { currencies } from "@/app/server/types/currencies";
import { CurrencyDto } from "../server/types/definitions";

export const getCurrencyByCode = (code: string) => {
    return currencies.find((c) => c.code === code) as CurrencyDto
}
