import { currencies } from "@/app/server/types/currencies";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SelectCurrency({
    defaultValue,
    selectedCurrencyFromChild,
}: {
    defaultValue: string;
    selectedCurrencyFromChild: (x: string) => void;
}) {
    const selectHandler = (selected: string) => {
        selectedCurrencyFromChild(selected);
    };

    return (
        <Select defaultValue={defaultValue} onValueChange={selectHandler}>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="Moneda" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Monedas</SelectLabel>
                    {currencies.map((m) => (
                        <SelectItem key={m.code} value={m.code}>
                            {m.name + "-" + m.country}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
