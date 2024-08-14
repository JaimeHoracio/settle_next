import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { MeetDto } from "@/app/server/types/definitions";
import RemoveMeet from "@/app/settle/meets/components/remove-meet";
import Link from "next/link";

export default function ListMeets({
    meets,
    refresh,
}: {
    meets: MeetDto[];
    refresh: (x: boolean) => void;
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Creador</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {meets.map((m) => (
                    <TableRow key={m.idMeet}>
                        <TableCell className="font-medium">
                            <Link
                                key={m.idMeet}
                                href={`/settle/bills?idMeet=${m.idMeet}&name=${m.name}`}>
                                {m.name}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Link
                                key={m.idMeet}
                                href={`/settle/bills?idMeet=${m.idMeet}&name=${m.name}`}>
                                {m.details}
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Link
                                key={m.idMeet}
                                href={`/settle/bills?idMeet=${m.idMeet}&name=${m.name}`}>
                                {m.createdBy.name}
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
                                    refresh={refresh}></RemoveMeet>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
