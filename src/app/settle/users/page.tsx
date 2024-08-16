"use client";

import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
    FriendsUserLogged,
    UserStore,
    useUserLoggedStore,
} from "@/app/store/user-logged";
import { Input } from "@/components/ui/input";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import {
    addFriendToUserLoggedApi,
    findFriendsByNameApi,
} from "@/app/server/apis/user-api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserDto } from "@/app/server/types/definitions";
import RemoveUser from "@/app/settle/users/components/remove-user";
import { ResetIcon } from "@radix-ui/react-icons";

export default function UsersPage() {
    const { userLogged } = useUserLoggedStore((state) => state);
    const nameUserLogged = userLogged?.name as string;

    const addFriendToUserStore = useUserLoggedStore(
        (state) => state.addFriendToUserStore
    );
    console.log(">>> user logged en Users " + nameUserLogged);

    // Const
    const [inviteFriend, setInviteFriend] = useState("");
    const meet_url = `/settle/meets/${nameUserLogged}`;
    const friends: UserStore[] | undefined = FriendsUserLogged();

    console.log(
        ">>> Consulto listado de users: " +
            nameUserLogged +
            " - " +
            JSON.stringify(friends)
    );

    const isFriendContainedInList = (
        friends: UserStore[],
        labelUser: string
    ) => {
        return friends.find((f) => f.label === labelUser) ? true : false;
    };

    const findFriendHandle = async () => {
        if (!inviteFriend) {
            console.log(">>> Debe escribir nombre del usuario");
        } else if (inviteFriend === nameUserLogged) {
            console.log(">>> No puede invitarse a si mismo");
        } else if (isFriendContainedInList(friends, inviteFriend)) {
            console.log(">>> El usuario ya fue invitado");
        } else {
            const friendDB: UserDto | undefined =
                await findFriendsByNameApi(inviteFriend);
            if (friendDB) {
                await addFriendToUserLoggedApi(nameUserLogged, friendDB);
                //Actualizo lista de usuarios en el storage.
                const friendStore: UserStore = {
                    label: friendDB.name,
                    value: friendDB.idUser + friendDB.name,
                };
                addFriendToUserStore(friendStore);
                setInviteFriend("");
                console.log(">>> friend" + JSON.stringify(friendStore));
            } else {
                console.log(
                    ">>> Usuario no se puede agregar, verifique su nombre."
                );
            }
        }
    };

    return (
        <article>
            <div className="flex flex-row justify-between py-4">
                <Label>Gestion de Usuarios</Label>
                <Link className="pr-2" href={meet_url}>
                    <ResetIcon></ResetIcon>
                </Link>
            </div>
            <div className="shadow-lg rounded mx-2 px-2 mb-2 pb-2">
                <Label htmlFor="details">Invitar amigo</Label>
                <div className="flex justify-between">
                    <Input
                        className="w-full mr-2"
                        type="text"
                        id="paids"
                        value={inviteFriend}
                        onChange={(e) => setInviteFriend(e.target.value)}
                        placeholder="Nombre amigo"
                        required={true}
                    />
                    <Button variant="ghost" onClick={findFriendHandle}>
                        <UserPlusIcon className="h-6 w-6"></UserPlusIcon>
                    </Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Nombre</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {friends?.map(
                        (f, indice) =>
                            f.label !== nameUserLogged && (
                                <TableRow key={indice}>
                                    <TableCell>{f.label}</TableCell>
                                    <TableCell className={"text-right"}>
                                        <div className="rounded-full flex flex-row justify-end items-center space-x-3">
                                            <RemoveUser
                                                nameUserLogged={nameUserLogged}
                                                oldFriend={f}></RemoveUser>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                    )}
                </TableBody>
            </Table>
        </article>
    );
}
