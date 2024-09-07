/**
 * Store para el encuentro seleccionado que se quiere agregar gastos
 * SOLO USAR EN COMPONENTES DEL CLIENTE 'use client'
**/
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { MeetSelectedDto } from '@/app/server/types/meets-type';

const default_meetSelectedStore: MeetSelectedDto = {
    idMeet: "",
    nameMeet: ""
}

interface MeetSelectedStore {
    meetSelectedStore: MeetSelectedDto | undefined,
    updateMeetSelectedStore: (new_meet_selected: MeetSelectedDto | undefined) => void,
    resetMeetSelectedStore: () => void
}

export const useMeetSelectedStore = create<MeetSelectedStore>()((set) => ({
    meetSelectedStore: undefined,
    updateMeetSelectedStore: (new_meet_selected: MeetSelectedDto | undefined) => set({ meetSelectedStore: new_meet_selected }),
    resetMeetSelectedStore: () => set({ meetSelectedStore: default_meetSelectedStore })
}));

// Usar useShallow previene la repeticion de renderizado 
export const MeetSelected = () => {
    const { meetSelectedStore } = useMeetSelectedStore(useShallow((state) => ({ meetSelectedStore: state.meetSelectedStore })))
    return meetSelectedStore;
}
