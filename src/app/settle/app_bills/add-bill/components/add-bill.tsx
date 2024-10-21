"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import SelectCurrency from "@/app/settle/currency/select-currency";
import {
    FriendsUserLogged,
    UserLogged,
    UserStore,
} from "@/app/store/user-logged-store";
import { HOME_BILLS_URL } from "@/app/settle/components/constants";
import { isBlank } from "@/app/utils/strings-utils";
import { useMeetSelectedStore } from "@/app/store/meet-selected-store";
import { getCurrencyByCode } from "@/app/utils/currency-utils";
import { addBillApi, updateBillApi } from "@/app/server/apis/bill-api";
import { BillDto, DetailsBillDto } from "@/app/server/types/bills-type";
import {
    BillSelectedStore,
    useBillSelectedStore,
} from "@/app/store/bills-store";
import RemoveBill from "./remove-bill";

export default function AddBill() {
    const { toast } = useToast();
    // Router
    const router = useRouter();

    const userLogged = UserLogged();
    const nameUserLogged = userLogged?.name as string;

    // Meet seleccionado.
    const { meetSelectedStore } = useMeetSelectedStore((state) => state);
    const idMeet = meetSelectedStore ? meetSelectedStore.idMeet : undefined;

    // Resetea el bill persistido en caso de un update.
    const { resetBillSelectedStore } = useBillSelectedStore((state) => state);

    // Const
    let userPaidOption: Option[] = [];
    let userDebtOption: Option[] = [];
    let defualt_reference = undefined;
    let default_amount = undefined;

    const editBill = BillSelectedStore();
    const friends: UserStore[] | undefined = FriendsUserLogged();
    const listFriends: Option[] = friends.map((f) => ({
        value: f.idUserStore,
        label: f.nameUserStore,
    }));

    // Estos datos existen si se esta haciendo una modificación solamente.
    if (editBill) {
        defualt_reference = editBill.reference;
        default_amount = editBill.receipt.amount;
        userDebtOption = getFriendByUsers(listFriends, editBill.usersDebt);
        userPaidOption = getFriendByUsers(listFriends, editBill.usersPaid);
    } else {
        const ownUser = friends.find((f) => f.nameUserStore === nameUserLogged);
        if (ownUser) {
            userPaidOption.push({
                value: ownUser.idUserStore,
                label: ownUser.nameUserStore,
            });
        }
        userDebtOption = listFriends;
    }

    // useState
    const [loading, setLoading] = useState(false);
    const [usersPaid, setUsersPaid] = useState<Option[]>(userPaidOption);
    const [usersDebt, setUsersDebt] = useState<Option[]>(userDebtOption);

    // useRef
    const reference = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);
    const [currency, setCurrency] = useState<string>("UYU");

    // Methods
    const showToast = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            duration: 1500,
        });
    };

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

    const updateBillMethod = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (
            !isBlank(reference.current?.value) &&
            !isBlank(amount.current?.value) &&
            !isBlank(currency) &&
            usersPaid.length > 0 &&
            usersDebt.length > 0
        ) {
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

            try {
                // Verifico si es una actualizacion o insercion
                let is_ok_from_db = undefined;
                if (editBill) {
                    new_bill._id = editBill._id;
                    is_ok_from_db = await updateBillApi(new_bill);
                } else {
                    is_ok_from_db = await addBillApi(new_bill);
                }

                if (!is_ok_from_db) {
                    console.error(
                        ">>> Error, respuesta al agregar un pago: " +
                            is_ok_from_db
                    );
                } else {
                    resetBillSelectedStore();
                    goBack();
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setLoading(false);
            console.log(">>> Complete campos obligatorios.");
            if (
                isBlank(reference.current?.value) ||
                isBlank(amount.current?.value) ||
                isBlank(currency)
            ) {
                showToast("Info", "Complete campos obligatorios.");
            } else if (usersPaid.length === 0) {
                showToast(
                    "Warning",
                    "Debe seleccionar al menos un usuario pagador."
                );
            } else if (usersDebt.length === 0) {
                showToast(
                    "Warning",
                    "Debe seleccionar al menos un usuario deudor."
                );
            }
        }
        //setLoading(false);
    };

    const selectCurrencyHandler = (selectedCurrency: string) => {
        setCurrency(selectedCurrency);
    };

    const removeAction = (reload: boolean) => {
        if (reload) {
            goBack();
        }
    };

    const goBack = () => {
        router.replace(HOME_BILLS_URL);
    };

    return (
        <article>
            <form onSubmit={updateBillMethod}>
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
                <Label htmlFor="usersPaid">Pagador</Label>
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
                <Label htmlFor="usersDebt">Deudores</Label>
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

                <div className="flex flex-row justify-between py-4">
                    <div className="flex flex-row justify-start py-4">
                        {editBill && (
                            <RemoveBill
                                idBill={editBill._id as string}
                                response={removeAction}></RemoveBill>
                        )}
                    </div>
                    <div className="flex flex-row justify-end space-x-4 py-4">
                        <Button type="reset" onClick={goBack}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>
                            {editBill ? "Actualizar Gasto" : "Agregar Gasto"}
                        </Button>
                    </div>
                </div>
            </form>
        </article>
    );
}

function getFriendByUsers(
    listFriends: Option[],
    listUsersDebt: DetailsBillDto[]
): any {
    // throw new Error("Function not implemented.");
    let result: Option[] = [];
    listUsersDebt.map((b) => {
        const friend = listFriends.filter((f) => f.label === b.user);
        if (friend && friend[0] != null) {
            result.push(friend[0]);
        }
    });
    return result;
}
