"use client";

import Link from "next/link";
import React from "react";
import { UserLogged } from "@/app/store/user-logged-store";

export default function HeadSettle() {
    //const { userLogged } = useUserLoggedStore((state) => state);
    const userLogged = UserLogged();

    return (
        <header className="bg-emerald-700 w-full px-6 shadow rounded">
            <div className="flex h-16 items-center justify-between">
                <div className="text-emerald-100 -ml-4 -mb-6">
                    <Link href="/">Sivonei</Link>
                </div>
                <div className="flex flex-col">
                    <div className="text-emerald-100 mt-3">Menu</div>
                    <div className="text-xs pt-1">{userLogged?.name}</div>
                </div>
            </div>
        </header>
    );
}
