/**
 * Se persisten los gastos para evitar ir al server cada vez que se muetran
 * SOLO USAR EN COMPONENTES DEL CLIENTE 'use client'
**/
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { BillDto } from '../server/types/bills-type';

interface BillSelectedStore {
    billSelectedStore: BillDto | undefined,
    updateBillSelectedStore: (edit_bill: BillDto) => void,
    resetBillSelectedStore: () => void
}

export const useBillSelectedStore = create<BillSelectedStore>((set) => ({
    billSelectedStore: undefined,
    updateBillSelectedStore: (edit_bill: BillDto) => {
        set((state) => {
            return { billSelectedStore: edit_bill }
        })
    },
    resetBillSelectedStore: () => {
        set((state) => {
            return { billSelectedStore: undefined }
        })
    }
}));

export const BillSelectedStore = () => {
    const { billSelectedStore } = useBillSelectedStore(useShallow((state) => ({ billSelectedStore: state.billSelectedStore })))
    return billSelectedStore;
}