import React from "react";

import { Label } from "@/components/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ADD_MEETS_URL } from "@/app/settle/components/constants";

export default function HeadListMeet() {
    return (
        <div className="flex flex-row justify-between pb-4">
            <Label>Lista de encuentros</Label>
            <Link className="pr-2" href={ADD_MEETS_URL}>
                <PlusCircledIcon></PlusCircledIcon>
            </Link>
        </div>
    );
}
