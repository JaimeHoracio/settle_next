import React from "react";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { ResetIcon } from "@radix-ui/react-icons";
import { HOME_BILLS_URL } from "@/app/settle/components/constants";

export default function HeadListUser() {
    return (
        <div className="flex flex-row justify-between py-4">
            <Label>Gestion de Usuarios</Label>
            <Link className="pr-2" href={HOME_BILLS_URL}>
                <ResetIcon></ResetIcon>
            </Link>
        </div>
    );
}
