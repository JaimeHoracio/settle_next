"use client";

import React, { useState } from "react";
import { UserStore, useUserLoggedStore } from "@/app/store/user-logged-store";
import {
    addFriendToUserLoggedApi,
    findFriendsByNameApi,
} from "@/app/server/apis/user-api";
import { UserDto } from "@/app/server/types/users-type";
import {
    comparateStrStrict,
    convertStrToLower,
} from "@/app/utils/strings-utils";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { randomID } from "@/app/utils/uuid-utils";
import DialogAddExistsUser from "./dialog-add-exists_user";
import DialogAddNewUser from "./dialog-add-new_user";

export default function SearchUsers({
    friends,
    nameUser,
}: {
    friends: UserStore[];
    nameUser: string;
}) {
    const { toast } = useToast();
    const addFriendToUserStore = useUserLoggedStore(
        (state) => state.addFriendToUserStore
    );
    const [inviteFriend, setInviteFriend] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [showDialogAddNew, setShowDialogAddNew] = useState(false);
    const [showDialogAddExists, setShowDialogAddExists] = useState(false);
    const [friendFromDB, setFriendFromDB] = useState<UserDto>();

    const isFriendContainedInList = (
        friends: UserStore[],
        labelUser: string
    ) => {
        return friends.find((f) => f.nameUserStore === labelUser)
            ? true
            : false;
    };

    const showToast = (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            duration: 1500,
        });
    };

    const associateFriendToUserLogged = async (friendDB: UserDto) => {
        await addFriendToUserLoggedApi(nameUser, friendDB);
        //Actualizo lista de usuarios en el storage.
        const friendStore: UserStore = {
            idUserStore: friendDB.idUser,
            nameUserStore: friendDB.name,
        };
        addFriendToUserStore(friendStore);
        setInviteFriend("");
    };

    const findFriendHandle = async () => {
        setLoading(true);
        if (!inviteFriend) {
            console.warn(">>> Debe escribir nombre del usuario");
            showToast("Warning", "Debe escribir nombre del usuario.");
        } else if (comparateStrStrict(inviteFriend, nameUser)) {
            console.warn(">>> No puede invitarse a si mismo");
            showToast("Warning", "No puede invitarse a si mismo.");
        } else if (isFriendContainedInList(friends, inviteFriend)) {
            console.warn(">>> El usuario ya esta agregado");
            showToast("Warning", "El usuario ya esta agregado.");
        } else {
            const friendDB: UserDto | undefined =
                await findFriendsByNameApi(inviteFriend);
            if (friendDB) {
                setFriendFromDB(friendDB);
                setShowDialogAddExists(true);
            } else {
                console.warn(">>> El usuario no se encontró, verifique.");
                //showToast("Warning", "El usuario no se encontró, verifique.");
                setShowDialogAddNew(true);
            }
        }
        setLoading(false);
    };

    const addFriendResponse = (response: boolean) => {
        if (response) {
            if (showDialogAddNew) {
                const new_friend: UserDto = {
                    idUser: randomID(),
                    name: inviteFriend as string,
                };
                associateFriendToUserLogged(new_friend);
            }
            if (showDialogAddExists) {
                associateFriendToUserLogged(friendFromDB as UserDto);
            }
        }
        setShowDialogAddNew(false);
        setShowDialogAddExists(false);
        setInviteFriend("");
    };

    return (
        <>
            <DialogAddExistsUser
                isOpen={showDialogAddExists}
                addFriendAction={addFriendResponse}></DialogAddExistsUser>
            <DialogAddNewUser
                isOpen={showDialogAddNew}
                addFriendAction={addFriendResponse}></DialogAddNewUser>
            <div className="shadow-lg rounded mx-2 px-2 mb-2 pb-2">
                <Label htmlFor="details">Invitar amigo</Label>
                <div className="flex justify-between">
                    <Input
                        className="w-full mr-2"
                        type="text"
                        id="paids"
                        value={inviteFriend}
                        onChange={(e) =>
                            setInviteFriend(convertStrToLower(e.target.value))
                        }
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
        </>
    );
}
