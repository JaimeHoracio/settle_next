import React, { Suspense } from "react";

import ListMeets from "./components/list-meets";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function HomeListMeetsPage() {
    return (
        <Suspense fallback={<DialogSpinner></DialogSpinner>}>
            <ListMeets></ListMeets>
        </Suspense>
    );
}
