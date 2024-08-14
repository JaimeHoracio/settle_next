'use server'

import { connectMongoDB, disconnectMongoDB } from "../mongo-db/config/mongo-config";
import BillModel from "../mongo-db/models/bill.model";
import { BillDB } from "../mongo-db/types/bill-db";


export async function addBillApi(bill: BillDB) {
    try {
        await connectMongoDB()
        return await BillModel.create(bill);

    } catch (error) {
        console.log(">>> Error addBillApi:" + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function updateBillApi(bill: BillDB) {
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