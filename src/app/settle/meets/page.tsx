"use client";

import { MeetDto } from "@/app/server/types/definitions";
import { listMeetsActiveByUserNameApi } from "@/app/server/apis/meets-api";
import { useUserLoggedStore } from "@/app/store/user-logged";
import { useEffect, useState } from "react";
import ListMeets from "./components/list-meets";
import HeadListMeet from "./components/header-list-meet";

export default function HomeListMeetsPage() {
    const { userLogged } = useUserLoggedStore((state) => state);
    const nameUserLogged = userLogged?.name as string;

    const [meets, setMeets] = useState<MeetDto[]>([]);

    const getListMeets = async () => {
        const list: MeetDto[] | undefined =
            await listMeetsActiveByUserNameApi(nameUserLogged);
        if (list) {
            setMeets(list);
        }
    };

    const refresh = (x: boolean) => {
        if (x) {
            getListMeets();
        }
    };

    useEffect(() => {
        console.log(">>> UseEffect ListMeets");
        // Obtengo lista de encuentros desde la BD.
        getListMeets();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <article>
            <HeadListMeet></HeadListMeet>
            <ListMeets meets={meets} refresh={refresh} />
        </article>
    );
}
