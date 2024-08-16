'use server'

import { connectMongoDB, disconnectMongoDB } from "@/app/server/mongo-db/config/mongo-config";
import { MeetDto, MeetSelectDto } from "@/app/server/types/definitions";
import MeetModel from "@/app/server/mongo-db/models/meet.model";


export async function createMeetApi(meet: MeetDto) {
    try {

        console.log(">>> add meet: " + JSON.stringify(meet))

        await connectMongoDB()
        await MeetModel.create({ idMeet: meet.idMeet, createdBy: meet.createdBy, name: meet.name, details: meet.details, active: true });

    } catch (error) {
        console.log(">>> Error createMeetApi: " + error)
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
        console.log(">>> Error updateMeetApi: " + error)
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
        console.log(">>> Error closeMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function removeMeetApi(idMeet: string) {
    try {
        await connectMongoDB()
        await MeetModel.deleteOne({ idMeet });
    } catch (error) {
        console.log(">>> Error removeMeetApi: " + error)
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
        console.log(">>> Error listMeetsActiveByUserNameApi: " + error)
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
        const result: MeetSelectDto[] = []
        list.map((m) => {
            result.push({ idMeet: m.idMeet, name: m.name, primary: m.primary ? false : m.primary as boolean })
        })
        return result
    } catch (error) {
        console.log(">>> Error listMeetsActiveByUserNameForSelectApi: " + error)
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
        console.log(">>> Error listMeetsNonActiveByIdUserApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}
