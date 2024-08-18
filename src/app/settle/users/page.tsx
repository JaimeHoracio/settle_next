import { Suspense } from "react";
import HomeUsersList from "./components/list-users";

export default function UsersPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeUsersList></HomeUsersList>
        </Suspense>
    );
}
