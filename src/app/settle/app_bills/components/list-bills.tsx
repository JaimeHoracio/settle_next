"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { listBillsByidMeetApi } from "@/app/server/apis/bill-api";
import { useMeetSelectedStore } from "@/app/store/meet-selected-store";
import { BillDto } from "@/app/server/types/bills-type";
import { useBillSelectedStore } from "@/app/store/bills-store";
import { ADD_BILL_URL } from "@/app/settle/components/constants";
import ResumeBills from "@/app/settle/app_bills/components/resume-bills";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function ListBills() {
    const { meetSelectedStore } = useMeetSelectedStore((state) => state);
    const { updateBillSelectedStore } = useBillSelectedStore((state) => state);

    // Const
    const [bills, setBills] = useState<BillDto[]>([]);

    const findListBillsByIdMeet = async (idMeet: string) => {
        if (!idMeet) {
            setBills([]);
        } else {
            let billsFromDB: BillDto[];
            const responseListBills = await listBillsByidMeetApi(idMeet);

            if (responseListBills) billsFromDB = JSON.parse(responseListBills);
            else billsFromDB = [];

            // SI LA LISTA DE BILLS NO ES VACIA DEBO OBTENER DE AQUI LA LISTA DE FRIENDS Y PERSISTIRLA EN EL STORAGE.

            setBills(billsFromDB);
        }
    };

    const goEditBill = (editBill: BillDto) => {
        console.log(">>> Edit bill ... ");

        updateBillSelectedStore(editBill);
    };

    useEffect(() => {
        const idMeet = meetSelectedStore ? meetSelectedStore.idMeet : "";
        findListBillsByIdMeet(idMeet);
    }, [meetSelectedStore]);

    return (
        <article>
            {bills.length == 0 && <DialogSpinner></DialogSpinner>}
            {/* Muestro el resumen solo si hay pagos realizados. */}
            {bills.length > 0 && <ResumeBills listaBills={bills}></ResumeBills>}

            <Table className="mt-1">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Referencia</TableHead>
                        <TableHead>Agregado</TableHead>
                        <TableHead>Monto</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bills.map((b, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {b.reference}
                            </TableCell>
                            <TableCell>{b.createdBy}</TableCell>
                            <TableCell>
                                <div className="flex flex-row items-center justify-start">
                                    {b.receipt.amount}
                                    <div className="text-xs ml-1">
                                        {b.receipt.currency.code}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="rounded-full flex flex-row justify-end items-center space-x-3">
                                    <Link href={ADD_BILL_URL}>
                                        <Pencil1Icon
                                            onClick={() =>
                                                goEditBill(b)
                                            }></Pencil1Icon>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    );
}
