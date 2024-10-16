import React, { Suspense } from "react";

import CurrentMeet from "../../components/current-meet";
import AddBill from "./components/add-bill";
import HeadAddBill from "./components/head-add-bill";

export default function AddBillPage() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <CurrentMeet></CurrentMeet>
            </Suspense>
            <HeadAddBill></HeadAddBill>
            <Suspense fallback={<div>Loading...</div>}>
                <AddBill></AddBill>
            </Suspense>
        </>
    );
}
