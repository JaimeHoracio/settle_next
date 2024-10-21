"use client";

import { removeBillApi } from "@/app/server/apis/bill-api";
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

export default function RemoveBill({
    idBill,
    response,
}: {
    idBill: string;
    response: (x: boolean) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Maneja el clic del botón
    const handleButtonClick = async (isAllowRemove: boolean) => {
        setLoading(true);
        if (isAllowRemove) {
            await removeBillApi(idBill);
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
                    <DialogTitle>Seguro de elimnar el pago?</DialogTitle>
                    <DialogDescription>
                        Se eliminará el pago permanentemente.
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
