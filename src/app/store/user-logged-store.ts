/**
 * Store para usuarios logueados
 * SOLO USAR EN COMPONENTES DEL CLIENTE 'use client'
**/
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { UserLoggedDto } from '@/app/server/types/users-type';

const default_userLogged: UserLoggedDto = {
    idUser: "",
    name: "",
    friends: []
}

export interface UserStore {
    idUserStore: string
    nameUserStore: string
}

interface UserLoggedStore {
    userLogged: UserLoggedDto | undefined,
    updateUserLoggedStore: (new_user: UserLoggedDto | undefined) => void,
    resetUserLoggedStore: () => void,

    friends: Array<UserStore>,
    updateFriendsUserStore: (new_friends: Array<UserStore>) => void,
    addFriendToUserStore: (new_friend: UserStore) => void,
    removeFriendToUserStore: (value_old_friend: string) => void,
}

export const useUserLoggedStore = create<UserLoggedStore>()((set) => ({
    userLogged: undefined,
    updateUserLoggedStore: (new_user: UserLoggedDto | undefined) => set({ userLogged: new_user }),
    resetUserLoggedStore: () => set({ userLogged: default_userLogged }),

    friends: [],
    updateFriendsUserStore: (new_friends: Array<UserStore>) => set({
        friends: new_friends
    }),
    addFriendToUserStore: (new_friend: UserStore) => set((state) => ({
        friends: [...state.friends, new_friend]
    })),
    removeFriendToUserStore: (idUser_old_friend: string) => set((state) => ({
        friends: state.friends.filter(f => f.idUserStore !== idUser_old_friend)
    })),
}));

export const UserLogged = () => {
    const { userLogged } = useUserLoggedStore(useShallow((state) => ({ userLogged: state.userLogged })))
    return userLogged;
}

export const FriendsUserLogged = () => {
    const { friends } = useUserLoggedStore(useShallow((state) => ({ friends: state.friends })))
    return friends;
}