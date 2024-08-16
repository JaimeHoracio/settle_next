"use client";

import React from "react";
import Link from "next/link";
import { ResetIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useSearchParams } from "next/navigation";

const HOME_BILL_URL = "/settle/bills";

export default function HeadAddBill() {
    // Query params
    const searchParams = useSearchParams();
    // Const
    const nameMeet = searchParams.get("name")?.toString();
    return (
        <div className="flex flex-row justify-between py-4">
            <Label>Agregar Gasto</Label>
            <Link className="pr-2" href={`${HOME_BILL_URL}?name=${nameMeet}`}>
                <ResetIcon></ResetIcon>
            </Link>
        </div>
    );
}
