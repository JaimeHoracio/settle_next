import { Suspense } from "react";

import ListMeets from "./components/list-meets";
import HeadListMeet from "./components/header-list-meet";

export default function HomeListMeetsPage() {
    return (
        <article>
            <HeadListMeet></HeadListMeet>
            <Suspense fallback={<div>Loading...</div>}>
                <ListMeets></ListMeets>
            </Suspense>
        </article>
    );
}
