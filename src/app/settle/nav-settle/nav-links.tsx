"use client";

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserLogged } from "@/app/store/user-logged-store";
import { useRef } from "react";
import { ROOT_SETTLE_URL } from "@/app/settle/components/constants";

const links = [
    { name: "Encuentros", href: "/settle/meets", icon: HomeIcon },
    {
        name: "Gastos",
        href: "/settle/bills",
        icon: DocumentDuplicateIcon,
    },
    { name: "Usuarios", href: "/settle/users", icon: UserGroupIcon },
];

export default function NavLinks() {
    const router = useRouter();

    const userLogged = UserLogged();
    const nameUserLogged = userLogged?.name as string;

    const isUserLogged = useRef(false);

    if (!nameUserLogged) {
        router.push(ROOT_SETTLE_URL);
    } else {
        isUserLogged.current = true;
    }

    return (
        <>
            {isUserLogged.current &&
                links.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex h-[38px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                            <LinkIcon className="w-6" />
                            <p className="hidden md:block">{link.name}</p>
                        </Link>
                    );
                })}
        </>
    );
}
