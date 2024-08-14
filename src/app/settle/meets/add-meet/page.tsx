"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResetIcon } from "@radix-ui/react-icons";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createMeetApi, updateMeetApi } from "@/app/server/apis/meets-api";
import { MeetDto, UserDto } from "@/app/server/types/definitions";
import { goToPath } from "@/app/utils/go-to-path";
import { useUserLoggedStore } from "@/app/store/user-logged";

const MEET_URL = "/settle/meets";

export default function AddMeetPage() {
    const { userLogged } = useUserLoggedStore((state) => state);
    const nameUserLogged = userLogged?.name as string;

    // Query params
    const searchParams = useSearchParams();
    console.log(">>> Search Params: " + searchParams);

    // Const
    // Estos datos existen si se esta haciendo una modificación solamente.
    const idMeet = searchParams.get("idMeet")?.toString();
    const default_name = searchParams.get("name")?.toString();
    const default_details = searchParams.get("details")?.toString();

    //useState
    const [loading, setLoading] = useState(false);

    // useRef
    const name = useRef<HTMLInputElement>(null);
    const details = useRef<HTMLInputElement>(null);
    const primary = useRef<string | null>(null);

    console.log(
        ">>>> idMeet " +
            idMeet +
            " - name:" +
            name.current?.value +
            " - details: " +
            details.current?.value
    );

    //Methods
    const addMeetMethod = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!name.current?.value) {
            console.log("El nombre es obligatorio.");
        } else {
            try {
                const user: UserDto = { idUser: "", name: nameUserLogged };
                if (idMeet) {
                    await updateMeetApi({
                        idMeet,
                        createdBy: user,
                        name: name.current?.value,
                        details: details.current?.value,
                        primary: primary ? true : false,
                    });
                } else {
                    const meetdto: MeetDto = {
                        idMeet: new Date().toISOString(),
                        createdBy: user,
                        name: name.current?.value,
                        details: details.current?.value,
                        active: true,
                    };
                    await createMeetApi(meetdto);
                }

                //Vuelvo al home de Settle
                goBack();
            } catch (error) {
                console.log(">>> Error: " + error);
            }
        }
        setLoading(false);
    };

    const goBack = () => {
        goToPath(MEET_URL);
    };

    return (
        <article>
            <div className="flex flex-row justify-between py-4">
                <Label>Agregar encuentro</Label>
                <Link className="pr-2" href={MEET_URL}>
                    <ResetIcon></ResetIcon>
                </Link>
            </div>

            <form onSubmit={addMeetMethod}>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Nombre"
                    ref={name}
                    defaultValue={default_name}
                    //value={name}
                    //onChange={(e) => setName(e.target.value)}
                />
                <Label htmlFor="details">Descripción</Label>
                <Input
                    type="text"
                    id="details"
                    placeholder="Descripción"
                    ref={details}
                    defaultValue={default_details}
                />

                <div className="flex flex-row justify-end space-x-4 py-4">
                    <Button onClick={goBack}>Cancelar</Button>
                    <Button type="submit" disabled={loading}>
                        {idMeet ? "Actualizar" : "Crear"}
                    </Button>
                </div>
            </form>
        </article>
    );
}
