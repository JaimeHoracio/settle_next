"use client";

import Link from "next/link";
import NavLinks from "./nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useUserLoggedStore } from "@/app/store/user-logged";
import router from "next/router";

export default function SideNav() {
    const { resetUserLoggedStore } = useUserLoggedStore((state) => state);

    const logoutHandle = () => {
        resetUserLoggedStore();
        router.replace("/");
    };

    return (
        <div className="flex flex-col px-3 pt-2 md:px-2">
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

                <Link
                    key="logout"
                    href="/"
                    onClick={logoutHandle}
                    className="flex h-[38px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-black hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Sign Out</div>
                </Link>
            </div>
        </div>
    );
}
