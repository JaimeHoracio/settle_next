import { Suspense } from "react";

import HeadBill from "@/app/settle/bills/components/head-bill";
import ListBills from "@/app/settle/bills/components/list-bills";
import CurrentMeet from "../components/current-meet";

export default function BillsHome() {
    return (
        <article>
            <Suspense fallback={<div>Loading...</div>}>
                <CurrentMeet></CurrentMeet>
                <HeadBill></HeadBill>
                <ListBills></ListBills>
            </Suspense>
        </article>
    );
}
