/**
 * Se persisten los gastos para evitar ir al server cada vez que se muetran
 * SOLO USAR EN COMPONENTES DEL CLIENTE 'use client'
**/
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { BillDto } from '../server/types/bills-type';

interface EditBillSelectedStore {
    editBillStore: BillDto | undefined,
    updateEditBillStore: (edit_bill: BillDto) => void,
    resetEditBillStore: () => void
}

export const useEditBillSelectedStore = create<EditBillSelectedStore>((set) => ({
    editBillStore: undefined,
    updateEditBillStore: (edit_bill: BillDto) => {
        set((state) => {
            return { editBillStore: edit_bill }
        })
    },
    resetEditBillStore: () => {
        set((state) => {
            return { editBillStore: undefined }
        })
    }
}));

export const EditBillStore = () => {
    const { editBillStore } = useEditBillSelectedStore(useShallow((state) => ({ editBillStore: state.editBillStore })))
    return editBillStore;
}