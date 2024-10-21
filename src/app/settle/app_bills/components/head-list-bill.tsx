"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ADD_BILL_URL } from "@/app/settle/components/constants";
import { useBillSelectedStore } from "@/app/store/bills-store";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function HeadListBill() {
    const [showSpinner, setShowSpinner] = useState(false);
    const { resetBillSelectedStore } = useBillSelectedStore((state) => state);

    const setAddBill = async () => {
        resetBillSelectedStore();
        setShowSpinner(true);
    };

    return (
        <>
            {showSpinner && <DialogSpinner></DialogSpinner>}
            <div className="flex flex-row justify-between mt-2">
                <Label>Lista de Pagos</Label>
                <Link
                    className="pr-2"
                    href={ADD_BILL_URL}
                    onClick={() => setAddBill()}>
                    <PlusCircledIcon></PlusCircledIcon>
                </Link>
            </div>
        </>
    );
}
