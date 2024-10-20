import React, { Suspense } from "react";

import AddBill from "./components/add-bill";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function AddBillPage() {
    return (
        <Suspense fallback={<DialogSpinner></DialogSpinner>}>
            <AddBill></AddBill>
        </Suspense>
    );
}
