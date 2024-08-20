"use client";

import { useState } from "react";
import { ResetIcon } from "@radix-ui/react-icons";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import {
    existUserLoggedByNameApi,
    registerUserLoggedApi,
} from "@/app/server/apis/user-api";
import { UserStore, useUserLoggedStore } from "@/app/store/user-logged";
import { UserLoggedDto } from "@/app/server/types/definitions";
import Link from "next/link";
import { HOME_MEETS_URL } from "@/app/settle/components/constants";

export default function FormRegister() {
    const router = useRouter();
    const { updateUserLoggedStore, updateFriendsUserStore } =
        useUserLoggedStore((state) => state);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [registered, setRegistered] = useState(false);

    const registerUserHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (registered) {
            if (!password) {
                setError("La Contraseña es obligatoria.");
            } else {
                if (password === confirmPassword) {
                    try {
                        const new_user: UserLoggedDto | undefined =
                            await registerUserLoggedApi(
                                name.trim().toLowerCase(),
                                password.trim().toLowerCase()
                            );

                        if (new_user) {
                            //Guardo en el estado el usuario logueado.
                            updateUserLoggedStore(new_user);

                            // Se agrega a si mismo a la lista de amigos.
                            const ownUser: UserStore = {
                                idUserStore: new_user.idUser,
                                nameUserStore: new_user.name,
                            };
                            updateFriendsUserStore([ownUser]);

                            router.push(HOME_MEETS_URL);
                        } else {
                            console.error(
                                "Error al registrar el usuario, intente en unos minutos."
                            );
                        }
                    } catch (error) {
                        setError(
                            "Error al registrar el usuario, intente en unos minutos."
                        );
                    }
                } else {
                    setError("Las contraseñas no coinciden.");
                }
            }
        }

        if (!name) {
            setError("El Nombre es obligatorio.");
        } else {
            const userFromServer: boolean = (await existUserLoggedByNameApi(
                name.trim().toLowerCase()
            )) as boolean;

            if (userFromServer) {
                setError("Ya existe un usuario con este nombre.");
            } else {
                setRegistered(true);
            }
        }
    };

    const handleInputName = (n: string) => {
        setName(n);
        setError("");
        setRegistered(false);
    };

    const handleInputPass = (p: string) => {
        setPassword(p);
        setError("");
    };

    const handleInputConfirmPass = (p: string) => {
        setConfirmPassword(p);
        setError("");
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
            <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
                <div className="flex flex-row justify-between pb-4">
                    <h1 className="font-semibold text-2xl">Registrar</h1>
                    <Link className="pr-2" href="/">
                        <ResetIcon></ResetIcon>
                    </Link>
                </div>
                <form
                    onSubmit={registerUserHandler}
                    className="space-y-12 w-full sm:w-[400px]">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            className="w-full"
                            required
                            value={name}
                            placeholder="Nombre"
                            onChange={(e) => handleInputName(e.target.value)}
                            id="name"
                            type="text"
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            className="w-full"
                            required
                            value={password}
                            placeholder="Contraseña"
                            onChange={(e) => handleInputPass(e.target.value)}
                            id="password"
                            type="password"
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="password">Confirmar Contraseña</Label>
                        <Input
                            className="w-full"
                            required
                            value={confirmPassword}
                            placeholder="Confirmar Contraseña"
                            onChange={(e) =>
                                handleInputConfirmPass(e.target.value)
                            }
                            id="confirmPassword"
                            type="password"
                            disabled={!registered}
                        />
                    </div>
                    {error && <Alert>{error}</Alert>}
                    <div className="w-full">
                        <Button className="w-full" size="lg">
                            Registrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
