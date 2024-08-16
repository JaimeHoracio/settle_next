"use client";

import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

const ADD_BILL_URL = "/settle/bills/add-bill";

export default function HeadBill() {
    // Query params
    const searchParams = useSearchParams();
    // Const
    const nameMeet = searchParams.get("name")?.toString();

    return (
        <div className="flex flex-row justify-between mt-2">
            <Label>Lista de Pagos</Label>
            <Link className="pr-2" href={`${ADD_BILL_URL}?name=${nameMeet}`}>
                <PlusCircledIcon></PlusCircledIcon>
            </Link>
        </div>
    );
}
