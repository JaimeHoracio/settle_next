"use client";

import { HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const HOME_MEETS_URL = "/settle/meets";

export default function CurrentMeet() {
    const searchParams = useSearchParams();
    console.log(">>> Search Params - AddBillPage: " + searchParams);

    // Const
    const nameMeet = searchParams.get("name")?.toString();

    return (
        <div className="flex flex-row justify-start text-sm">
            <Link className="pr-2" href={HOME_MEETS_URL}>
                <div className="flex flex-row justify-start">
                    <HomeIcon className="mt-1 mr-1"></HomeIcon>
                    <Label>Encuentro: </Label>
                </div>
            </Link>
            {nameMeet}
        </div>
    );
}
