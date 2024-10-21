"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ADD_MEETS_URL } from "@/app/settle/components/constants";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function HeadListMeet() {
    const [showSpinner, setShowSpinner] = useState(false);

    const goAddMeetAction = () => {
        setShowSpinner(true);
    };
    return (
        <>
            {showSpinner && <DialogSpinner></DialogSpinner>}
            <div className="flex flex-row justify-between pb-4">
                <Label>Lista de encuentros</Label>
                <Link
                    className="pr-2"
                    onClick={() => goAddMeetAction()}
                    href={ADD_MEETS_URL}>
                    <PlusCircledIcon></PlusCircledIcon>
                </Link>
            </div>
        </>
    );
}
