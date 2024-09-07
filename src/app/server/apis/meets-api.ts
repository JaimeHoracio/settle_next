'use server'

import { connectMongoDB, disconnectMongoDB } from "@/app/server/mongo-db/config/mongo-config";
import MeetModel from "@/app/server/mongo-db/models/meet.model";
import { MeetDto, MeetSelectedDto } from "../types/meets-type";


export async function createMeetApi(meet: MeetDto) {
    try {
        await connectMongoDB()
        const new_meet = await MeetModel.create({ idMeet: meet.idMeet, createdBy: meet.createdBy, name: meet.name, details: meet.details, active: true });
        return JSON.stringify(new_meet)
    } catch (error) {
        console.error(">>> Error createMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function updateMeetApi(meet: MeetDto) {
    try {
        await connectMongoDB()

        const query = { idMeet: meet.idMeet }
        await MeetModel.findOneAndUpdate(query, { name: meet.name, details: meet.details, updatedAt: new Date() });

    } catch (error) {
        console.error(">>> Error updateMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function closeMeetApi(idMeet: string) {
    try {
        await connectMongoDB()

        const query = { idMeet }
        const update = { $set: { active: false } }

        await MeetModel.findOneAndUpdate(query, update);

    } catch (error) {
        console.error(">>> Error closeMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function removeMeetApi(idMeet: string) {
    try {
        await connectMongoDB()
        await MeetModel.deleteOne({ idMeet });
    } catch (error) {
        console.error(">>> Error removeMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}


export async function listMeetsActiveByUserNameApi(nameUser: string) {
    try {
        await connectMongoDB()
        let list = await MeetModel.find({ "createdBy.name": nameUser, active: true }).exec();
        if (!list) {
            return []
        }
        // Hay que hacer una copia porque no le gusta que se devuelva objectos.
        const meetsList = list.map(meet => ({
            idMeet: meet.idMeet,
            createdBy: {
                idUser: meet.createdBy.idUser,
                name: meet.createdBy.name
            },
            name: meet.name,
            details: meet.details,
            active: meet.active,
            createdAt: meet.createdAt,
            updatedAt: meet.updatedAt
        }));

        return meetsList
    } catch (error) {
        console.error(">>> Error listMeetsActiveByUserNameApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}


export async function listMeetsActiveByUserNameForSelectApi(nameUser: string) {
    try {
        await connectMongoDB()
        const list: MeetDto[] = await listMeetsActiveByUserNameApi(nameUser) as MeetDto[];
        if (!list) {
            return []
        }
        const result: MeetSelectedDto[] = []
        list.map((m) => {
            result.push({ idMeet: m.idMeet, nameMeet: m.name, primary: m.primary ? false : m.primary as boolean })
        })
        return result
    } catch (error) {
        console.error(">>> Error listMeetsActiveByUserNameForSelectApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function listMeetsNonActiveByIdUserApi(nameUser: string) {
    try {
        await connectMongoDB()
        let list = await MeetModel.find({ "createdBy.name": nameUser, active: false }).exec();
        return list
    } catch (error) {
        console.error(">>> Error listMeetsNonActiveByIdUserApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}
