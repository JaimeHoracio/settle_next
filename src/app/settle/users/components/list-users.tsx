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
    UserLogged,
    UserStore,
    useUserLoggedStore,
} from "@/app/store/user-logged-store";
import { Input } from "@/components/ui/input";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import {
    addFriendToUserLoggedApi,
    findFriendsByNameApi,
} from "@/app/server/apis/user-api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ResetIcon } from "@radix-ui/react-icons";
import { HOME_BILLS_URL } from "@/app/settle/components/constants";
import { UserDto } from "@/app/server/types/users-type";
import { LowerStr } from "@/app/utils/strings-utils";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import RemoveUser from "@/app/settle/users/components/remove-user";

export default function HomeUsersList() {
    const { toast } = useToast();
    const userLogged = UserLogged();
    const nameUserLogged = userLogged?.name as string;

    const addFriendToUserStore = useUserLoggedStore(
        (state) => state.addFriendToUserStore
    );

    // Const
    const [inviteFriend, setInviteFriend] = useState("");
    const [loading, setLoading] = useState(false);
    const friends: UserStore[] | undefined = FriendsUserLogged();

    const isFriendContainedInList = (
        friends: UserStore[],
        labelUser: string
    ) => {
        return friends.find((f) => f.nameUserStore === labelUser)
            ? true
            : false;
    };

    const findFriendHandle = async () => {
        setLoading(true);
        if (!inviteFriend) {
            console.warn(">>> Debe escribir nombre del usuario");
            showToast("Warning", "Debe escribir nombre del usuario.");
        } else if (LowerStr(inviteFriend) === LowerStr(nameUserLogged)) {
            console.warn(">>> No puede invitarse a si mismo");
            showToast("Warning", "No puede invitarse a si mismo.");
        } else if (isFriendContainedInList(friends, inviteFriend)) {
            console.warn(">>> El usuario ya esta agregado");
            showToast("Warning", "El usuario ya esta agregado.");
        } else {
            const friendDB: UserDto | undefined = await findFriendsByNameApi(
                LowerStr(inviteFriend)
            );
            if (friendDB) {
                await addFriendToUserLoggedApi(nameUserLogged, friendDB);
                //Actualizo lista de usuarios en el storage.
                const friendStore: UserStore = {
                    idUserStore: friendDB.idUser + friendDB.name,
                    nameUserStore: friendDB.name,
                };
                addFriendToUserStore(friendStore);
                setInviteFriend("");
            } else {
                console.warn(
                    ">>> Usuario no se puede agregar, verifique su nombre."
                );
                showToast("Warning", "El usuario no se encontró, verifique.");
            }
        }
        setLoading(false);
    };

    const showToast = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            duration: 1500,
        });
    };

    return (
        <article>
            <div className="flex flex-row justify-between py-4">
                <Label>Gestion de Usuarios</Label>
                <Link className="pr-2" href={HOME_BILLS_URL}>
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
                        {loading && (
                            <div className="text-center">
                                <Spinner size="small" />
                            </div>
                        )}
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
                            f.nameUserStore !== nameUserLogged && (
                                <TableRow key={indice}>
                                    <TableCell>{f.nameUserStore}</TableCell>
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
