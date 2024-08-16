import { Suspense } from "react";
import AddMeet from "./components/add-meet";
import HeadAddMeet from "./components/head-add-meet";

export default function AddMeetPage() {
    return (
        <article>
            <HeadAddMeet></HeadAddMeet>
            <Suspense fallback={<div>Loading...</div>}>
                <AddMeet></AddMeet>
            </Suspense>
        </article>
    );
}
