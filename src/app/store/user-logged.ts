/**
 * Store para usuarios logueados
 * SOLO USAR EN COMPONENTES DEL CLIENTE 'use client'
**/
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { UserLoggedDto } from '../server/types/definitions';

const default_userLogged = {
    idUser: "",
    name: "",
    friends: []
}

export interface UserStore {
    label: string
    value: string
}

interface UserLoggedStore {
    userLogged: UserLoggedDto | undefined,
    friends: Array<UserStore>,
    updateUserLoggedStore: (new_user: UserLoggedDto | undefined) => void,
    resetUserLoggedStore: () => void,
    updateFriendsUserStore: (new_friends: Array<UserStore>) => void,
    addFriendToUserStore: (new_friend: UserStore) => void,
    removeFriendToUserStore: (value_old_friend: string) => void,
}

export const useUserLoggedStore = create<UserLoggedStore>()((set) => ({
    userLogged: undefined,
    friends: [],
    updateUserLoggedStore: (new_user: UserLoggedDto | undefined) => set({ userLogged: new_user }),
    resetUserLoggedStore: () => set({ userLogged: default_userLogged }),
    updateFriendsUserStore: (new_friends: Array<UserStore>) => set({
        friends: new_friends
    }),
    addFriendToUserStore: (new_friend: UserStore) => set((state) => ({
        friends: [...state.friends, new_friend]
    })),
    removeFriendToUserStore: (value_old_friend: string) => set((state) => ({
        friends: state.friends.filter(f => f.value !== value_old_friend)
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