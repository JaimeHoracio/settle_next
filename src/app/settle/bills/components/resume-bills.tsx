"use client";

import React, { useEffect, useState } from "react";

import ListUsersDebt from "./list-users-debt";
import { BillDto } from "@/app/server/types/bills-type";
import { Expenses, RowExpense } from "@/app/server/types/resume-bills-type";

export default function ResumeBills({ listaBills }: { listaBills: BillDto[] }) {
    const [expenses, setExpenses] = useState<Expenses[]>([]);

    const buildMapFromBills = (bills: BillDto[]) => {
        const map_expenses = new Map<
            string,
            Map<string, Map<string, number>>
        >();
        bills.map((b) => {
            let map_user_paid = new Map<string, Map<string, number>>();
            // Cantidad de pagadores
            const cant_user_paid = b.usersPaid.length;
            b.usersPaid.map((p) => {
                // Me fijo si ya existe lista de pagadores para la moneda.
                if (map_expenses.get(b.receipt.currency.code)) {
                    map_user_paid = map_expenses.get(
                        b.receipt.currency.code
                    ) as Map<string, Map<string, number>>;
                }

                let listDebts = new Map<string, number>();
                if (map_user_paid.get(p.user)) {
                    listDebts = map_user_paid.get(p.user) as Map<
                        string,
                        number
                    >;
                }

                b.usersDebt.map((d) => {
                    // Si el pagador esta entre sus deudores no se toma en cuenta.
                    if (d.user !== p.user) {
                        const amount_debt_map = listDebts.get(d.user);
                        // Divido el monto pagado por cada deudor sobre la cantidad de pagadores
                        const amount_new = Number(d.amount / cant_user_paid);
                        if (amount_debt_map) {
                            listDebts.set(
                                d.user,
                                Number(amount_debt_map) + amount_new
                            );
                        } else {
                            listDebts.set(d.user, amount_new);
                        }
                    }
                });
                map_user_paid.set(p.user, listDebts);
            });
            // Guardo para cada currency la lista de deudores para cada pagador
            map_expenses.set(b.receipt.currency.code, map_user_paid);
        });

        setExpenses(convertMapToObject(map_expenses));
    };

    const convertMapToObject = (
        mapa: Map<string, Map<string, Map<string, number>>>
    ) => {
        let result: Expenses[] = [];
        mapa.forEach((listUserPaid, currency) => {
            const list_row: RowExpense[] = [];
            listUserPaid.forEach((listUserDebt, userPaid) => {
                listUserDebt.forEach((amountDebt, userDebt) => {
                    const row: RowExpense = {
                        nameDebt: userDebt,
                        currency: currency,
                        totalAmount: amountDebt,
                        namePaid: userPaid,
                    };
                    list_row.push(row);
                });
            });
            const row: Expenses = {
                currency: currency,
                list_expenses: list_row,
            };
            result.push(row);
        });
        return result;
    };

    useEffect(() => {
        buildMapFromBills(listaBills);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <article className="grid w-full items-center gap-4 mt-1 border-0">
            <div className="flex flex-col">
                {expenses.map((currencies) => (
                    <ListUsersDebt
                        key={currencies.currency}
                        currency={currencies.currency}
                        list_expenses={
                            currencies.list_expenses
                        }></ListUsersDebt>
                ))}
            </div>
        </article>
    );
}
