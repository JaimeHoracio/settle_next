"use client";

import { removeFriendToUserLoggedApi } from "@/app/server/apis/user-api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { goToPath } from "@/app/utils/go-to-path";
import { UserStore, useUserLoggedStore } from "@/app/store/user-logged";

export default function RemoveUser({
    nameUserLogged,
    oldFriend,
}: {
    nameUserLogged: string;
    oldFriend: UserStore;
}) {
    const removeFriendToUserStore = useUserLoggedStore(
        (state) => state.removeFriendToUserStore
    );
    const [isOpen, setIsOpen] = useState(false);

    // Maneja el clic del botón
    const handleButtonClick = async () => {
        await removeFriendToUserLoggedApi(nameUserLogged, {
            idUser: oldFriend.value,
            name: oldFriend.label,
        });
        removeFriendToUserStore(oldFriend.value);
        setIsOpen(false); // Cierra el diálogo
        const user_path = `/settle/users/${nameUserLogged}`;
        goToPath(user_path);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <TrashIcon onClick={() => setIsOpen(true)}></TrashIcon>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Se aliminará el usuario de forma permanente
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-row justify-center space-x-4 py-4">
                    <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
                    <Button onClick={handleButtonClick}>Eliminar</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}