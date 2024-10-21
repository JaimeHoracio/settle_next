"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function DialogAddNewUser({
    isOpen,
    addFriendAction,
}: {
    isOpen: boolean;
    addFriendAction: (response: boolean) => void;
}) {
    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Usuario no encontrado</DialogTitle>
                    <DialogDescription>
                        Desea agregar el usuario de todos modos?
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row justify-center space-x-4 py-4">
                    <Button onClick={() => addFriendAction(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={() => addFriendAction(true)}>
                        Agregar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
