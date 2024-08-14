"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { BillDto } from "@/app/server/types/definitions";
import { Pencil1Icon } from "@radix-ui/react-icons";

export default function ListBills({
    nameMeet,
    bills,
}: {
    nameMeet: string | undefined;
    bills: BillDto[];
}) {
    console.log(">>> Listado de bills");

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
                            <Link
                                key={b.idMeet}
                                href={`/settle/bills?name=${b.reference}`}>
                                {b.reference}
                            </Link>
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
