"use client";

import { BillDto } from "@/app/server/types/definitions";
import { listBillsByidMeetApi } from "@/app/server/apis/bill-api";

import HeadBill from "@/app/settle/bills/components/head-bill";
import ListBills from "@/app/settle/bills/components/list-bills";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CurrentMeet from "../components/current-meet";

export default function BillsHome() {
    const [bills, setBills] = useState<BillDto[]>([]);

    // Query params
    const searchParams = useSearchParams();
    console.log(">>> Search Params - BillsHome: " + searchParams);

    // Const
    const idMeet: string = searchParams.get("idMeet")?.toString() as string;
    const nameMeet = searchParams.get("name")?.toString();

    console.log(">>>> home bill BillsHome :" + idMeet, nameMeet);

    const findListBillsByIdMeet = async (idMeet: string) => {
        const billsFromDB = await listBillsByidMeetApi(idMeet);
        if (billsFromDB === undefined) {
            setBills([]);
        } else {
            setBills(billsFromDB);
        }
    };

    useEffect(() => {
        findListBillsByIdMeet(idMeet);
    }, [idMeet]);

    return (
        <article>
            <CurrentMeet nameMeet={nameMeet}></CurrentMeet>
            <HeadBill nameMeet={nameMeet}/>
            <ListBills nameMeet={nameMeet} bills={bills}></ListBills>
        </article>
    );
}
