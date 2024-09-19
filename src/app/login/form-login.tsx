"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getUserLoggedApi } from "@/app/server/apis/user-api";
import { UserStore, useUserLoggedStore } from "@/app/store/user-logged-store";
import { HOME_MEETS_URL } from "@/app/settle/components/constants";
import { UserLoggedDto } from "@/app/server/types/users-type";
import { LowerStr } from "@/app/utils/strings-utils";
import { Spinner } from "@/components/ui/spinner";

export default function FormLogin() {
    const { updateUserLoggedStore, updateFriendsUserStore } =
        useUserLoggedStore((state) => state);
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userFromServer: UserLoggedDto | undefined =
                await getUserLoggedApi(LowerStr(name), password);

            if (userFromServer) {
                //Busco los amigos para crear encuentros y dividir gastos.
                const usersStore: UserStore[] = userFromServer.friends.map(
                    (u) => ({
                        idUserStore: u.idUser,
                        nameUserStore: u.name,
                    })
                );
                const ownUser: UserStore = {
                    idUserStore: userFromServer.idUser,
                    nameUserStore: userFromServer.name,
                };
                // Se agrega a si mismo a la lista de amigos.
                usersStore.push(ownUser);
                //Actualiza lista de amigos para repartir gastos.
                updateFriendsUserStore(usersStore);
                //Guardo en el storage el usuario logueado.
                updateUserLoggedStore(userFromServer);

                //Me muevo al home de los encuentros
                goHomeMeets();

                // ACA SE PODRIA AGREGAR LA LOGICA QUE SI HAY SOLO UN ENCUENTRO VAYA DIRECTO A LOS GASTOS.
            } else {
                setError("Nombre o contraseña incorrectos");
                setLoading(false);
            }
        } catch (error) {
            console.error(">>> Error: " + error);
            setLoading(false);
        }
    };

    const goHomeMeets = () => {
        router.replace(HOME_MEETS_URL);
    };

    const handleInputName = (n: string) => {
        setName(n);
        setError("");
    };

    const handleInputPass = (p: string) => {
        setPassword(p);
        setError("");
    };

    return (
        <form
            onSubmit={loginHandler}
            className="space-y-12 w-full sm:w-[400px]">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    className="w-full"
                    required
                    value={name}
                    onChange={(e) => handleInputName(e.target.value)}
                    id="name"
                    type="text"
                    disabled={loading}
                />
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                    className="w-full"
                    required
                    value={password}
                    onChange={(e) => handleInputPass(e.target.value)}
                    id="password"
                    type="password"
                    disabled={loading}
                />
            </div>
            {error && <Alert className="bg-red-700">{error}</Alert>}
            <div className="w-full">
                {loading && (
                    <div className="text-center">
                        <Spinner size="small" />
                    </div>
                )}
                <Button className="w-full mt-6" size="lg" disabled={loading}>
                    Login
                </Button>
            </div>
        </form>
    );
}
