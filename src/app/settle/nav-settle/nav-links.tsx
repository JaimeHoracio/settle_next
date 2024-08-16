"use client";

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserLoggedStore } from "@/app/store/user-logged";
import { useRef } from "react";

// Map of links to display in the side navigation.
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
    const { userLogged } = useUserLoggedStore((state) => state);
    const nameUserLogged = userLogged?.name as string;

    const isUserLogged = useRef(false);
    const router = useRouter();

    if (!nameUserLogged) {
        router.push("/");
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
                            /*href={`${link.href}/${encodeURIComponent(nameUserLogged as string)}`}*/
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
