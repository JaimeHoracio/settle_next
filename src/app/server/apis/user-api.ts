'use server'

import { connectMongoDB, disconnectMongoDB } from "@/app/server/mongo-db/config/mongo-config";
import UserLoggedModel from "@/app/server/mongo-db/models/user-login.model";
import { UserDto } from "@/app/server/types/definitions";

// const userList = users.map(user => ({
//     id: user.id,
//     name: user.name,
//   }));

export async function getUserLoggedApi(name: string, pass: string) {
    try {
        await connectMongoDB()

        const query = { name, password: pass }
        const userLogged = await UserLoggedModel.findOne(query);

        if (userLogged) {
            //Hay que devolver objectos planos no objetos devuelvos por la base.
            const friends = userLogged.friends.map((user: { _id: any; name: any; }) => ({
                idUser: user._id.toString(),
                name: user.name
            }))
            return {
                idUser: userLogged.idUser,
                name: userLogged.name,
                createdAt: userLogged.createdAt,
                friends: friends
            }
        } else {
            console.warn(">>> No se encontró el usuario.")
        }
        return undefined;
    } catch (error) {
        console.error(">>> Error createMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function existUserLoggedByNameApi(name: string) {
    try {
        await connectMongoDB()

        const query = { name }

        const user = await UserLoggedModel.findOne(query);
        return user ? true : false;

    } catch (error) {
        console.error(">>> Error createMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function registerUserLoggedApi(name: string, pass: string) {
    try {
        await connectMongoDB()
        const user = await UserLoggedModel.create({ name, password: pass, createdAt: new Date().toISOString(), friends: [] });
        return {
            idUser: user._id,
            name: user.name,
            createdAt: user.createdAt,
            friends: []
        }

    } catch (error) {
        console.error(">>> Error RegisterUserLoggedApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function findFriendsByNameApi(name: string) {
    try {
        await connectMongoDB()

        const query = { name }
        const userLogged = await UserLoggedModel.findOne(query);

        if (userLogged) {
            //Hay que devolver objectos planos no objetos devuelvos por la base.
            return {
                idUser: userLogged._id,
                name: userLogged.name
            }
        }
        return undefined;
    } catch (error) {
        console.error(">>> Error createMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}


export async function addFriendToUserLoggedApi(nameParent: string, newFriend: UserDto) {
    try {
        await connectMongoDB()

        const query = { name: nameParent }
        const new_friends_db = {
            _id: newFriend.idUser,
            name: newFriend.name
        }
        await UserLoggedModel.updateOne(query, { $push: { friends: new_friends_db } });

    } catch (error) {
        console.error(">>> Error createMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function removeFriendToUserLoggedApi(nameParent: string, oldFriend: UserDto) {
    try {
        await connectMongoDB()

        const query = { name: nameParent }
        const old_friends_db = {
            _id: oldFriend.idUser,
            name: oldFriend.name
        }
        await UserLoggedModel.updateOne(query, { $pull: { friends: old_friends_db } });

    } catch (error) {
        console.error(">>> Error createMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function updateFriendByNameParentApi(nameParent: string, newFriends: UserDto[]) {
    try {
        await connectMongoDB()

        const query = { name: nameParent }
        const new_friends_db = newFriends.map((f) => ({
            _id: f.idUser,
            name: f.name
        }))
        await UserLoggedModel.findOneAndUpdate(query, { friends: new_friends_db });

    } catch (error) {
        console.error(">>> Error createMeetApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}
