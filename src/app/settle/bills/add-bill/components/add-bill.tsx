"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import SelectCurrency from "@/app/settle/currency/select-currency";
import {
    FriendsUserLogged,
    UserStore,
    useUserLoggedStore,
} from "@/app/store/user-logged";
import { HOME_BILLS_URL } from "@/app/settle/components/constants";
import { isBlank } from "@/app/utils/validationUtils";
import { useMeetSelectedStore } from "@/app/store/meet-selected";
import { getCurrencyByCode } from "@/app/utils/currencyUtils";
import { BillDto, DetailsBillDto } from "@/app/server/types/definitions";
import { addBillApi } from "@/app/server/apis/bill-api";

export default function AddBill() {
    // Router
    const router = useRouter();

    const { userLogged } = useUserLoggedStore((state) => state);
    const nameUserLogged = userLogged?.name as string;

    // Meet seleccionado.
    const { meetSelectedStore } = useMeetSelectedStore((state) => state);
    const idMeet = meetSelectedStore ? meetSelectedStore.idMeet : undefined;

    // Query params
    const searchParams = useSearchParams();

    // Const
    // Estos datos existen si se esta haciendo una modificación solamente.
    const defualt_reference = searchParams.get("reference")?.toString();
    const default_amount = searchParams.get("amount")?.toString();

    const friends: UserStore[] | undefined = FriendsUserLogged();

    const listFriends: Option[] = friends.map((f) => ({
        value: f.idUserStore,
        label: f.nameUserStore,
    }));

    const ownOpcion: Option[] = [];
    const ownUser = friends.find((f) => f.nameUserStore === nameUserLogged);
    if (ownUser) {
        ownOpcion.push({
            value: ownUser.idUserStore,
            label: ownUser.nameUserStore,
        });
    }

    // useState
    const [loading, setLoading] = useState(false);
    const [usersPaid, setUsersPaid] = useState<Option[]>(ownOpcion);
    const [usersDebt, setUsersDebt] = useState<Option[]>(listFriends);

    // useRef
    const reference = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);
    const [currency, setCurrency] = useState<string>("UYU");

    // Methods
    const getUsersPaid = () => {
        if (usersPaid && usersPaid.length > 0) {
            const amountPaidPerUser =
                Number(amount.current?.value) / usersPaid.length;
            const listPaid: DetailsBillDto[] = usersPaid.map((p) => ({
                amount: amountPaidPerUser,
                user: p.label,
            }));
            return listPaid;
        } else return [];
    };

    const getUsersDebt = () => {
        if (usersDebt && usersDebt.length > 0) {
            const amountDebtPerUser =
                Number(amount.current?.value) / usersDebt.length;
            const listDebt: DetailsBillDto[] = usersDebt.map((p) => ({
                amount: amountDebtPerUser,
                user: p.label,
            }));
            return listDebt;
        } else return [];
    };

    const addBillMethod = async (/*e: React.FormEvent*/) => {
        //e.preventDefault();
        setLoading(true);

        //se guarda el gasto
        if (
            !isBlank(reference.current?.value) &&
            !isBlank(amount.current?.value) &&
            !isBlank(currency) &&
            usersPaid.length > 0 &&
            usersDebt.length > 0
        ) {
            console.log(">>> idMeet:" + idMeet);

            if (isBlank(idMeet)) {
                console.log(">>> NO deberia ser nulo idMeet:" + idMeet);
            }
            const new_bill: BillDto = {
                idMeet: idMeet as string,
                createdBy: nameUserLogged,
                reference: reference.current?.value as string,
                receipt: {
                    amount: Number(amount.current?.value),
                    discount: 0,
                    currency: getCurrencyByCode(currency),
                },
                usersPaid: getUsersPaid(),
                usersDebt: getUsersDebt(),
            };

            //Guardo el gasto asociado al encuentro.
            try {
                await addBillApi(new_bill);
                goBack();
            } catch (error) {
                console.error(error);
            }
        } else {
            // Alerta para indicar que son obligatorios los campos
            console.log(">>> Rellene campos obligatorios.");
        }

        //setLoading(false);
    };

    const selectCurrencyHandler = (selectedCurrency: string) => {
        console.log("Desde el padre - meet selected: " + selectedCurrency);
        setCurrency(selectedCurrency);
        console.log(">>> currency: " + currency);
    };

    const goBack = () => {
        router.push(HOME_BILLS_URL);
    };

    return (
        <article>
            <form>
                <Label htmlFor="name">Referencia</Label>
                <Input
                    type="text"
                    id="reference"
                    placeholder="Referencia"
                    ref={reference}
                    defaultValue={defualt_reference}
                />
                <Label htmlFor="details">Monto</Label>
                <div className="flex justify-between">
                    <Input
                        className="w-[100px]"
                        type="number"
                        id="amount"
                        min={0}
                        placeholder="Monto"
                        ref={amount}
                        defaultValue={default_amount}
                    />
                    <SelectCurrency
                        defaultValue={currency}
                        selectedCurrencyFromChild={
                            selectCurrencyHandler
                        }></SelectCurrency>
                </div>
                <Label htmlFor="details">Pagador</Label>
                <MultipleSelector
                    key="usersPaid"
                    value={usersPaid}
                    onChange={setUsersPaid}
                    defaultOptions={listFriends}
                    emptyIndicator={
                        <p className="text-center text-xs leading-10 bg-transparent dark:text-gray-400">
                            No hay usuarios.
                        </p>
                    }></MultipleSelector>
                <Label htmlFor="details">Deudores</Label>
                <MultipleSelector
                    key="usersDebt"
                    value={usersDebt}
                    onChange={setUsersDebt}
                    defaultOptions={listFriends}
                    emptyIndicator={
                        <p className="text-center text-xs leading-10 bg-transparent dark:text-gray-400">
                            No hay usuarios.
                        </p>
                    }></MultipleSelector>

                <div className="flex flex-row justify-end space-x-4 py-4">
                    <Button onClick={goBack}>Cancelar</Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        onClick={addBillMethod}>
                        Agregar Gasto
                    </Button>
                </div>
            </form>
        </article>
    );
}
