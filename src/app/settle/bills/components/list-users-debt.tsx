"use client";

import React, { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RowExpense } from "@/app/server/types/resume-bills-type";
import { round2Dec } from "@/app/utils/number-utils";

export default function ListUsersDebt({
    currency,
    list_expenses,
}: {
    currency: string;
    list_expenses: RowExpense[];
}) {
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        if (list_expenses && list_expenses.length > 0) {
            let subTotal = 0;
            list_expenses.map((row) => {
                subTotal += row.totalAmount;
            });
            setTotal(subTotal);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card className="w-auto border-0 m-0">
            <CardContent>
                <Table className="text-xs border-0 m-0">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Deudor</TableHead>
                            <TableHead>Monto</TableHead>
                            <TableHead></TableHead>
                            <TableHead className="text-right">
                                Acreedor
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {list_expenses.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {row.nameDebt}
                                </TableCell>
                                <TableCell>{`${row.currency} ${round2Dec(row.totalAmount)}`}</TableCell>
                                <TableCell className="text-right">{`->`}</TableCell>
                                <TableCell className="text-right">
                                    {row.namePaid}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">{`${currency} ${round2Dec(total)}`}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    );
}
