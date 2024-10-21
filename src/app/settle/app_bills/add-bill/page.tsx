import React, { Suspense } from "react";

import AddBill from "./components/add-bill";
import DialogSpinner from "@/app/settle/components/dialog-spinner";
import HeadAddBill from "./components/head-add-bill";

export default function AddBillPage() {
    return (
        <Suspense fallback={<DialogSpinner></DialogSpinner>}>
            <HeadAddBill></HeadAddBill>
            <AddBill></AddBill>
        </Suspense>
    );
}
