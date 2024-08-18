"use client";

import { useMeetSelectedStore } from "@/app/store/meet-selected";
import { HomeIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { HOME_MEETS_URL } from "@/app/settle/components/constants";

export default function CurrentMeet() {
    const { meetSelectedStore } = useMeetSelectedStore((state) => state);
    // Const
    const nameMeet = meetSelectedStore ? meetSelectedStore.nameMeet : "";

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
