"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { ResetIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import SelectCurrency from "@/app/settle/currency/select-currency";
import {
    FriendsUserLogged,
    UserStore,
    useUserLoggedStore,
} from "@/app/store/user-logged";
import CurrentMeet from "@/app/settle/components/current-meet";

export default function AddBillPage() {
    const { userLogged } = useUserLoggedStore((state) => state);
    const nameUserLogged = userLogged?.name as string;

    // Query params
    const searchParams = useSearchParams();
    console.log(">>> Search Params - AddBillPage: " + searchParams);

    // Const
    const nameMeet = searchParams.get("name")?.toString();
    // Estos datos existen si se esta haciendo una modificación solamente.
    const defualt_reference = searchParams.get("reference")?.toString();
    const default_amount = searchParams.get("amount")?.toString();

    const friends: UserStore[] | undefined = FriendsUserLogged();
    console.log(">>> add bill");

    const listFriends: Option[] = friends.map((f) => ({
        label: f.label,
        value: f.value,
    }));

    const ownOpcion: Option[] = [];
    const ownUser = friends.find((f) => f.label === nameUserLogged);
    if (ownUser) {
        ownOpcion.push({ value: ownUser.value, label: ownUser.label });
    }

    // useState
    const [loading, setLoading] = useState(false);
    const [usersPaid, setUsersPaid] = useState<Option[]>(ownOpcion);
    const [usersDebt, setUsersDebt] = useState<Option[]>(listFriends);

    // const
    const HOME_BILL_URL = "/settle/bills";
    const router = useRouter();

    // useRef
    const reference = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);

    // Methods
    const addBillMethod = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        //se guarda el gasto

        goBack();
        setLoading(false);
    };

    const selectedCurrencyHandler = (selectedMeet: string) => {
        console.log("Desde el padre - meet selected: " + selectedMeet);
    };

    const goBack = () => {
        router.push(HOME_BILL_URL);
    };

    return (
        <article>
            <CurrentMeet nameMeet={nameMeet}></CurrentMeet>
            <div className="flex flex-row justify-between py-4">
                <Label>Agregar Gasto</Label>
                <Link className="pr-2" href={HOME_BILL_URL}>
                    <ResetIcon></ResetIcon>
                </Link>
            </div>

            <form onSubmit={addBillMethod}>
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
                        defaultValue="UYU"
                        selectedCurrencyFromChild={
                            selectedCurrencyHandler
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
                            Vacío.
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
                            Vacío.
                        </p>
                    }></MultipleSelector>

                <Button
                    variant="link"
                    className="text-left text-indigo-500 hover:underline">
                    Opciones
                </Button>

                <div className="flex flex-row justify-end space-x-4 py-4">
                    <Button onClick={goBack}>Cancelar</Button>
                    <Button type="submit" disabled={loading}>
                        Agregar Gasto
                    </Button>
                </div>
            </form>
        </article>
    );
}
