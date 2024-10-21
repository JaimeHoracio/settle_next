"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { DialogRemoveMeetApi } from "@/app/server/apis/meets-api";

export default function DialogRemoveMeet({
    idMeet,
    response,
}: {
    idMeet: string;
    response: (x: boolean) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Maneja el clic del botón
    const handleButtonClick = async (isAllowRemove: boolean) => {
        setLoading(true);
        if (isAllowRemove) {
            await DialogRemoveMeetApi(idMeet);
            response(true);
            setIsOpen(false);
        }
        setLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <TrashIcon onClick={() => setIsOpen(true)}></TrashIcon>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Seguro de elimnar el encuentro?</DialogTitle>
                    <DialogDescription>
                        Se eliminará el encuentro permanentemente.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row justify-center space-x-4 py-4">
                    <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            handleButtonClick(true);
                        }}>
                        Eliminar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
