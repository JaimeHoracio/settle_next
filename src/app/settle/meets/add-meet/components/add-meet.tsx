"use client";

import React from "react";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createMeetApi, updateMeetApi } from "@/app/server/apis/meets-api";
import { MeetDto, UserDto } from "@/app/server/types/definitions";
import { goToPath } from "@/app/utils/go-to-path";
import { useUserLoggedStore } from "@/app/store/user-logged";
import { HOME_MEETS_URL } from "@/app/settle/components/constants";

export default function AddMeet() {
    const { userLogged } = useUserLoggedStore((state) => state);
    const nameUserLogged = userLogged?.name as string;

    // Query params
    const searchParams = useSearchParams();

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

    //Methods
    const addMeetMethod = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!name.current?.value) {
            console.warn("El nombre es obligatorio.");
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
                console.error(">>> Error: " + error);
            }
        }
        setLoading(false);
    };

    const goBack = () => {
        goToPath(HOME_MEETS_URL);
    };
    return (
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
                    {idMeet ? "Actualizar Encuentro" : "Crear Encuentro"}
                </Button>
            </div>
        </form>
    );
}
