"use client";

import { useState } from "react";
import Link from "next/link";
import { HOME_MEETS_URL } from "@/app/settle/components/constants";
import { ResetIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { Spinner } from "@/components/ui/spinner";

export default function HeadAddMeet() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex flex-row justify-between py-4">
            <Label>Agregar encuentro</Label>
            <Link
                className="pr-2"
                href={HOME_MEETS_URL}
                onClick={() => {
                    setLoading(true);
                }}>
                <ResetIcon></ResetIcon>
                {loading && (
                    <div className="text-center mt-1">
                        <Spinner size="small" />
                    </div>
                )}
            </Link>
        </div>
    );
}
