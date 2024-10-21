import React, { Suspense } from "react";

import ListBills from "@/app/settle/app_bills/components/list-bills";
import DialogSpinner from "@/app/settle/components/dialog-spinner";
import HeadListBill from "./components/head-list-bill";

export default function BillsHome() {
    return (
        <Suspense fallback={<DialogSpinner></DialogSpinner>}>
            <HeadListBill></HeadListBill>
            <ListBills></ListBills>
        </Suspense>
    );
}
