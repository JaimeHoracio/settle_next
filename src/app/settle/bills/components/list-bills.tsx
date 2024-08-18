"use client";

import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BillDto } from "@/app/server/types/definitions";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { listBillsByidMeetApi } from "@/app/server/apis/bill-api";
import { useMeetSelectedStore } from "@/app/store/meet-selected";

export default function ListBills() {
    const { meetSelectedStore } = useMeetSelectedStore((state) => state);
    // Const
    const idMeet = meetSelectedStore ? meetSelectedStore.idMeet : "";
    const [bills, setBills] = useState<BillDto[]>([]);

    const findListBillsByIdMeet = async (idMeet: string) => {
        if (!idMeet) {
            setBills([]);
        } else {
            const billsFromDB = await listBillsByidMeetApi(idMeet);
            setBills(billsFromDB ? billsFromDB : []);
        }
    };

    useEffect(() => {
        findListBillsByIdMeet(idMeet);
    }, [idMeet]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Referencia</TableHead>
                    <TableHead>Agregado</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bills.map((b) => (
                    <TableRow key={b.idMeet}>
                        <TableCell className="font-medium">
                            {b.reference}
                        </TableCell>
                        <TableCell>{b.createdBy}</TableCell>
                        <TableCell>
                            <div className="flex flex-col items-center justify-between">
                                {b.receipt.amount}
                                <div className="text-xs">
                                    {b.receipt.currency.name}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="rounded-full flex flex-row justify-end items-center space-x-3">
                                <Pencil1Icon></Pencil1Icon>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
