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
import { Pencil1Icon } from "@radix-ui/react-icons";
import { listBillsByidMeetApi } from "@/app/server/apis/bill-api";
import { useMeetSelectedStore } from "@/app/store/meet-selected-store";
import { BillDto } from "@/app/server/types/bills-type";
import ResumeBills from "@/app/settle/bills/components/resume-bills";

export default function ListBills() {
    const { meetSelectedStore } = useMeetSelectedStore((state) => state);
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
            setBills(billsFromDB);
        }
    };

    useEffect(() => {
        const idMeet = meetSelectedStore ? meetSelectedStore.idMeet : "";
        findListBillsByIdMeet(idMeet);
    }, [meetSelectedStore]);

    return (
        <>
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
                                    <Pencil1Icon></Pencil1Icon>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
