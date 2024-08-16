
import { ResetIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";

const MEET_URL = "/settle/meets";

export default function HeadAddMeet() {
    return (
        <div className="flex flex-row justify-between py-4">
            <Label>Agregar encuentro</Label>
            <Link className="pr-2" href={MEET_URL}>
                <ResetIcon></ResetIcon>
            </Link>
        </div>
    );
}
