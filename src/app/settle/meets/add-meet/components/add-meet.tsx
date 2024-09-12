"use client";

import React from "react";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createMeetApi, updateMeetApi } from "@/app/server/apis/meets-api";
import { goToPath } from "@/app/utils/go-to-path";
import { UserLogged } from "@/app/store/user-logged-store";
import { HOME_MEETS_URL } from "@/app/settle/components/constants";
import { UserDto } from "@/app/server/types/users-type";
import { MeetDto } from "@/app/server/types/meets-type";
import { Spinner } from "@/components/ui/spinner";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

export default function AddMeet() {
    const { toast } = useToast();
    const userLogged = UserLogged();
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
            showToast("Warning", "El nombre del encuentro es obligatorio.");
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
                    let uuidMeet = uuidv4();
                    const meetdto: MeetDto = {
                        idMeet: uuidMeet,
                        createdBy: user,
                        name: name.current?.value,
                        details: details.current?.value,
                        active: true,
                    };
                    const meet_created = await createMeetApi(meetdto);
                    console.info(">>> Meet creado: " + meet_created);
                }

                //Vuelvo al home de Settle
                goBack();
            } catch (error) {
                console.error(">>> Error: " + error);
                showToast("Error", "No se pudo crear el encuentro.");
            }
        }
        setLoading(false);
    };

    const goBack = () => {
        goToPath(HOME_MEETS_URL);
    };

    const showToast = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            duration: 1500,
        });
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
                {loading && (
                    <div className="text-center mt-1">
                        <Spinner size="small" />
                    </div>
                )}
            </div>
        </form>
    );
}
