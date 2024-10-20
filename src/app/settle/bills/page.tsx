import React, { Suspense } from "react";

import ListBills from "@/app/settle/bills/components/list-bills";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function BillsHome() {
    return (
        <Suspense fallback={<DialogSpinner></DialogSpinner>}>
            <ListBills></ListBills>
        </Suspense>
    );
}
