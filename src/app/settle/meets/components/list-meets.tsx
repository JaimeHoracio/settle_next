"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil1Icon } from "@radix-ui/react-icons";
import RemoveMeet from "@/app/settle/meets/components/remove-meet";

import { listMeetsActiveByUserNameApi } from "@/app/server/apis/meets-api";
import { UserLogged } from "@/app/store/user-logged-store";
import { useMeetSelectedStore } from "@/app/store/meet-selected-store";

// import { useListBillsMeetSelectedStore } from "@/app/store/list-bills-store";
import { HOME_BILLS_URL } from "@/app/settle/components/constants";
import { MeetDto } from "@/app/server/types/meets-type";

export default function ListMeets() {
    //const { userLogged } = useUserLoggedStore((state) => state);
    const userLogged = UserLogged();
    const nameUserLogged = userLogged?.name as string;

    const { meetSelectedStore } = useMeetSelectedStore((state) => state);
    const { updateMeetSelectedStore } = useMeetSelectedStore((state) => state);
    // const { createBillsMeetStore } = useListBillsMeetSelectedStore(
    //     (state) => state
    // );

    const [meets, setMeets] = useState<MeetDto[]>([]);

    const initFalseMeetSelecteded = useCallback(() => {
        return Array.from({ length: meets.length }, (val, index) => false);
    }, [meets]);

    const [meetSelected, setMeetSelected] = useState<boolean[]>(
        initFalseMeetSelecteded()
    );

    const getListMeetsFromDB = async () => {
        const list: MeetDto[] | undefined =
            await listMeetsActiveByUserNameApi(nameUserLogged);
        if (list) {
            setMeets(list);

            // Selecciono el MEET por defecto.
            selectDefaultMainMeetSelected(list);
        }
    };

    const refreshAction = (reload: boolean) => {
        if (reload) {
            getListMeetsFromDB();
        }
    };

    const persistStateMainMeetSelected = (
        index: number,
        meetsList: MeetDto[]
    ) => {
        // Guardar el MEET seleccionado para trabajar como alcance global.
        const meet_selected = {
            idMeet: meetsList[index].idMeet,
            nameMeet: meetsList[index].name,
        };
        updateMeetSelectedStore(meet_selected);
        // Creo lista de bills para persistir ligada al encuentro.
        // createBillsMeetStore(meet_selected.nameMeet);
    };

    const changeMainMeetSelected = (index: number) => {
        let checkedList = initFalseMeetSelecteded();
        checkedList[index] = true;
        setMeetSelected(checkedList);

        persistStateMainMeetSelected(index, meets);
    };

    const selectDefaultMainMeetSelected = async (meetsList: MeetDto[]) => {
        if (meetsList.length > 0) {
            let checkedList = meetSelected;

            // Chequeo si ya elegí un encuentro por defecto
            if (!meetSelectedStore) {
                // Si no elegí selecciono el primero por defecto para trabajar.
                checkedList[0] = true;

                persistStateMainMeetSelected(0, meetsList);
            } else {
                // Busco el indice para configurar el meet por defecto
                const index = meetsList.findIndex(
                    (m) => m.idMeet === meetSelectedStore.idMeet
                );
                checkedList[index] = true;
            }

            // Seteo el meet seleccionado.
            setMeetSelected(checkedList);
        }
    };

    useEffect(() => {
        getListMeetsFromDB();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Principal</TableHead>
                    <TableHead className="w-[150px]">Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Creador</TableHead>
                    <TableHead>F. Creación</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {meets.map((m, index) => (
                    <TableRow key={m.idMeet}>
                        <TableCell className="font-medium">
                            <Checkbox
                                checked={meetSelected[index]}
                                onCheckedChange={() =>
                                    changeMainMeetSelected(index)
                                }></Checkbox>
                        </TableCell>
                        <TableCell
                            className="font-medium"
                            onClick={() => changeMainMeetSelected(index)}>
                            <Link key={m.idMeet} href={HOME_BILLS_URL}>
                                {m.name}
                            </Link>
                        </TableCell>
                        <TableCell
                            onClick={() => changeMainMeetSelected(index)}>
                            <Link key={m.idMeet} href={HOME_BILLS_URL}>
                                {m.details}
                            </Link>
                        </TableCell>
                        <TableCell
                            onClick={() => changeMainMeetSelected(index)}>
                            <Link key={m.idMeet} href={HOME_BILLS_URL}>
                                {m.createdBy.name}
                            </Link>
                        </TableCell>
                        <TableCell
                            onClick={() => changeMainMeetSelected(index)}>
                            <Link key={m.idMeet} href={HOME_BILLS_URL}>
                                {"fecha"}
                            </Link>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="rounded-full flex flex-row justify-end items-center space-x-3">
                                <Link
                                    key={m.idMeet}
                                    href={`/settle/meets/add-meet?idMeet=${m.idMeet}&name=${m.name}&details=${m.details}`}>
                                    <Pencil1Icon></Pencil1Icon>
                                </Link>
                                <RemoveMeet
                                    idMeet={m.idMeet}
                                    refresh={refreshAction}></RemoveMeet>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
