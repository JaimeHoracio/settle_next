import { Suspense } from "react";

import HeadBill from "@/app/settle/bills/components/head-bill";
import ListBills from "@/app/settle/bills/components/list-bills";
import CurrentMeet from "@/app/settle/components/current-meet";

export default function BillsHome() {
    return (
        <article>
            <Suspense fallback={<div>Loading...</div>}>
                <CurrentMeet></CurrentMeet>
            </Suspense>
            <HeadBill></HeadBill>
            <Suspense fallback={<div>Loading...</div>}>
                <ListBills></ListBills>
            </Suspense>
        </article>
    );
}
