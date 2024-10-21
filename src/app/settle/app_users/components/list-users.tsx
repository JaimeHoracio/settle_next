"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    FriendsUserLogged,
    UserLogged,
    UserStore,
} from "@/app/store/user-logged-store";

import DialogRemoveUser from "@/app/settle/app_users/components/dialog-remove-user";
import HeadListUser from "./head-list-user";
import SearchUsers from "./search-users";

export default function HomeUsersList() {
    const userLogged = UserLogged();
    const nameUserLogged = userLogged?.name as string;
    // Const
    const friends: UserStore[] = FriendsUserLogged();

    return (
        <article>
            <HeadListUser></HeadListUser>
            <SearchUsers
                friends={friends}
                nameUser={nameUserLogged}></SearchUsers>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Nombre</TableHead>
                        <TableHead className="text-right">Acción</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {friends?.map(
                        (friend, indice) =>
                            friend.nameUserStore !== nameUserLogged && (
                                <TableRow key={indice}>
                                    <TableCell>
                                        {friend.nameUserStore}
                                    </TableCell>
                                    <TableCell className={"text-right"}>
                                        <div className="rounded-full flex flex-row justify-end items-center space-x-3">
                                            <DialogRemoveUser
                                                nameUserLogged={nameUserLogged}
                                                oldFriend={
                                                    friend
                                                }></DialogRemoveUser>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                    )}
                </TableBody>
            </Table>
        </article>
    );
}
