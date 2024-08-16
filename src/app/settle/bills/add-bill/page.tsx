import { Suspense } from "react";

import CurrentMeet from "../../components/current-meet";
import AddBill from "./components/add-bill";
import HeadAddBill from "./components/head-add-bill";

export default function AddBillPage() {
    return (
        <article>
            <Suspense fallback={<div>Loading...</div>}>
                <CurrentMeet></CurrentMeet>
                <HeadAddBill></HeadAddBill>
                <AddBill></AddBill>
            </Suspense>
        </article>
    );
}
