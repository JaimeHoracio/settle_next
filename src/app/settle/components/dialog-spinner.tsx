"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

export default function DialogSpinner() {
    return (
        <Dialog open={true}>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <DialogContent className="[&>button]:hidden">
                <Spinner size="small" />
            </DialogContent>
        </Dialog>
    );
}
