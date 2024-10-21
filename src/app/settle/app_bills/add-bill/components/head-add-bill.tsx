import React from "react";
import Link from "next/link";
import { ResetIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { HOME_BILLS_URL } from "@/app/settle/components/constants";

export default function HeadAddBill() {
    return (
        <div className="flex flex-row justify-between py-4">
            <Label>Agregar Gasto</Label>
            <Link className="pr-2" href={HOME_BILLS_URL}>
                <ResetIcon></ResetIcon>
            </Link>
        </div>
    );
}
