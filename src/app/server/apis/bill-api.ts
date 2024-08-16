'use server'

import { connectMongoDB, disconnectMongoDB } from "@/app/server/mongo-db/config/mongo-config";
import BillModel from "@/app/server/mongo-db/models/bill.model";
import { BillDto } from "@/app/server/types/definitions";


export async function addBillApi(bill: BillDto) {
    try {
        await connectMongoDB()
        return await BillModel.create(bill);

    } catch (error) {
        console.log(">>> Error addBillApi:" + error)
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
        console.log(">>> Error updateBillApi:" + error)
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
        console.log(">>> Error removeBillApi:" + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function listBillsByidMeetApi(idMeet: string) {
    try {
        await connectMongoDB()
        let list = await BillModel.find({ idMeet }).exec();
        return list
    } catch (error) {
        console.log(">>> Error :" + error)
    } finally {
        await disconnectMongoDB();
    }
}