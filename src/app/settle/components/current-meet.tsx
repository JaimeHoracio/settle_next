import { HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";

export default function CurrentMeet({
    nameMeet,
}: {
    nameMeet: string | undefined;
}) {
    const HOME_MEETS_URL = "/settle/meets";

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
