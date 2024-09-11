"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ADD_BILL_URL } from "@/app/settle/components/constants";
import { Spinner } from "@/components/ui/spinner";

export default function HeadBill() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex flex-row justify-between mt-2">
            <Label>Lista de Pagos</Label>
            <Link
                className="pr-2"
                href={ADD_BILL_URL}
                onClick={() => {
                    setLoading(true);
                }}>
                <PlusCircledIcon></PlusCircledIcon>
                {loading && (
                    <div className="text-center mt-1">
                        <Spinner size="small" />
                    </div>
                )}
            </Link>
        </div>
    );
}
