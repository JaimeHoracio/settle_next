import React, { Suspense } from "react";
import AddMeet from "./components/add-meet";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function AddMeetPage() {
    return (
        <Suspense fallback={<DialogSpinner></DialogSpinner>}>
            <AddMeet></AddMeet>
        </Suspense>
    );
}
