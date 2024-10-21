import { Suspense } from "react";
import HomeUsersList from "@/app/settle/app_users/components/list-users";
import DialogSpinner from "@/app/settle/components/dialog-spinner";

export default function UsersPage() {
    return (
        <Suspense fallback={<DialogSpinner></DialogSpinner>}>
            <HomeUsersList></HomeUsersList>
        </Suspense>
    );
}
