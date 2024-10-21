"use client";

import Link from "next/link";
import React from "react";
import { UserLogged } from "@/app/store/user-logged-store";

export default function HeadSettle() {
    //const { userLogged } = useUserLoggedStore((state) => state);
    const userLogged = UserLogged();

    return (
        <header className="bg-blue-300 w-full px-6 shadow rounded">
            <div className="flex h-16 items-center justify-between">
                <div className="text-blue-100 -ml-4 -mb-6">
                    <Link href="/">Settle</Link>
                </div>
                <div className="flex flex-col">
                    <div className="text-blue-100 mt-3">Menu</div>
                    <div className="text-xs pt-1">{userLogged?.name}</div>
                </div>
            </div>
        </header>
    );
}
