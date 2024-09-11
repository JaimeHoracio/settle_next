/**
 * Se persisten los gastos para evitar ir al server cada vez que se muetran
 * SOLO USAR EN COMPONENTES DEL CLIENTE 'use client'
**/
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { BillDto } from '../server/types/bills-type';

interface BillsMeetSelected {
    name_meet: string | undefined,
    persisted: boolean, //evita ir al server innecesariamente.
    bills: BillDto[]
}


// PASAR ListBillsStore A HASHMAP

interface ListBillsMeetSelectedStore {
    listBillsStore: BillsMeetSelected[],
    createBillsMeetStore: (name_meet: string) => void,
    updateListBillsStore: (name_meet: string, new_list_bill: BillDto[]) => void,
    addBillToListStore: (name_meet: string, new_bill: BillDto) => void,
    resetListBillsStore: (name_meet: string) => void
}

export const useListBillsMeetSelectedStore = create<ListBillsMeetSelectedStore>((set) => ({
    listBillsStore: [],
    createBillsMeetStore: (name_meet: string) => { set((state) => { return doCreateListBillStore(name_meet, state) }) },
    updateListBillsStore: (name_meet: string, new_list_bill: BillDto[]) => {
        set((state) => {
            return doUpdateListBills(name_meet, new_list_bill, state)
        })
    },
    addBillToListStore: (name_meet: string, new_bill: BillDto) => {
        set((state) => {
            return doAddBillToListBills(name_meet, new_bill, state)
        })
    },
    resetListBillsStore: (name_meet: string) => {
        set((state) => {
            return doResetListBills(name_meet, state)
        })
    }
}));

export const ListBillsStore = (meetName: string) => {
    const { listBillsStore } = useListBillsMeetSelectedStore(useShallow((state) => ({ listBillsStore: state.listBillsStore })))
    return listBillsStore.map(m => m.name_meet === meetName);
}

function doCreateListBillStore(name_meet: string, state: ListBillsMeetSelectedStore) {
    let listBills = state.listBillsStore.filter((m) => m.name_meet === name_meet)

    if (!listBills || listBills.length === 0) {
        const new_list_bill = {
            name_meet: name_meet,
            persisted: false, //booleano que evita ir al server innecesariamente.
            bills: []
        }
        listBills = [new_list_bill]

        return { listBillsStore: listBills };
    } else {
        return { listBillsStore: state.listBillsStore };
    }
}

function doUpdateListBills(name_meet: string, new_list_bills_store: BillDto[], state: ListBillsMeetSelectedStore) {
    const listBills = state.listBillsStore.filter((m) => m.name_meet === name_meet)

    if (listBills && listBills.length === 1) {
        listBills[0].bills = new_list_bills_store
    }

    return { listBillsStore: listBills };
}

function doAddBillToListBills(name_meet: string, new_bill_store: BillDto, state: ListBillsMeetSelectedStore) {
    const listBills = state.listBillsStore.filter((m) => m.name_meet === name_meet)

    if (listBills && listBills.length === 1) {
        listBills[0].persisted = true
        listBills[0].bills.push(new_bill_store)
    }

    return { listBillsStore: listBills };
}

function doResetListBills(name_meet: string, state: ListBillsMeetSelectedStore) {
    const listBills = state.listBillsStore.filter((m) => m.name_meet === name_meet)

    if (listBills && listBills.length === 1) {
        listBills[0].bills = []
    }

    return { listBillsStore: listBills };
}