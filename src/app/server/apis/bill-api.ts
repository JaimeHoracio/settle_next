'use server'

import { connectMongoDB, disconnectMongoDB } from "@/app/server/mongo-db/config/mongo-config";
import BillModel from "@/app/server/mongo-db/models/bill.model";
import { BillDto } from "../types/bills-type";


export async function addBillApi(bill: BillDto) {
    try {
        await connectMongoDB()
        const new_bill = await BillModel.create(bill);

        //console.log(">>> Nuevo pago: " + new_bill)

        return JSON.stringify(new_bill);

    } catch (error) {
        console.error(">>> Error addBillApi:" + error);

        throw new Error("Error, al crear un nuevo pago: " + error);
    } finally {
        await disconnectMongoDB();
    }
}

export async function updateBillApi(bill: BillDto) {
    try {
        await connectMongoDB()

        const query = { _id: bill._id }

        await BillModel.findOneAndUpdate(query, bill);

    } catch (error) {
        console.error(">>> Error updateBillApi:" + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function removeBillApi(idBill: string) {
    try {
        await connectMongoDB()

        const query = { _id: idBill }

        return await BillModel.deleteOne(query);

    } catch (error) {
        console.error(">>> Error removeBillApi:" + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function listBillsByidMeetApi(idMeet: string) {
    try {
        await connectMongoDB()
        let list = await BillModel.find({ idMeet }).exec();
        return JSON.stringify(list)
    } catch (error) {
        console.error(">>> Error :" + error)
    } finally {
        await disconnectMongoDB();
    }
}