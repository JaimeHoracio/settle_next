"use client";

import { MeetSelectedDto } from "@/app/server/types/meets-type";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SelectMeet({ defaultValue }: { defaultValue: string }) {
    let defaultMeet = defaultValue;

    const selectMeetHandler = (selected: string) => {
        console.log(">> valor seleccionado hijo: " + selected);
        //setSelectMeedChild(selected);
    };

    let meets: MeetSelectedDto[] = [];

    if ((!defaultValue || defaultValue === "") && meets.length > 0) {
        defaultMeet = meets[0].idMeet;
    }

    return (
        <Select defaultValue={defaultMeet} onValueChange={selectMeetHandler}>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="Encuentros" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Encuentros</SelectLabel>
                    {meets.map((m) => (
                        <SelectItem key={m.idMeet} value={m.nameMeet}>
                            {m.nameMeet}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
