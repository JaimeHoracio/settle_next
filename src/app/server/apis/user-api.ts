'use server'

import { connectMongoDB, disconnectMongoDB } from "@/app/server/mongo-db/config/mongo-config";
import UserLoggedModel from "@/app/server/mongo-db/models/user-logged.model";
import { UserDto } from "@/app/server/types//users-type";

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
            const friends = userLogged.friends.map((user: { idUser: any; name: any; }) => ({
                idUser: user.idUser,
                name: user.name
            }))
            return {
                idUser: userLogged.idUser,
                name: userLogged.name,
                createdAt: userLogged.createdAt,
                friends: friends
            }
        } else {
            console.warn(">>> No se encontró el usuario: " + userLogged.name)
        }
        return undefined;
    } catch (error) {
        console.error(">>> Error getUserLoggedApi: " + error)
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
        console.error(">>> Error existUserLoggedByNameApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function registerUserLoggedApi(name: string, pass: string) {
    try {
        await connectMongoDB()
        const user = await UserLoggedModel.create({ name, password: pass, createdAt: new Date().toISOString(), friends: [] });
        return {
            idUser: user.idUser,
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
                //Debo devolver el id del user logueado.
                idUser: userLogged._id.toString(),
                name: userLogged.name
            }
        }
        return undefined;
    } catch (error) {
        console.error(">>> Error findFriendsByNameApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function addFriendToUserLoggedApi(nameParent: string, newFriend: UserDto) {
    try {
        await connectMongoDB()


        console.info("Add friend: " + JSON.stringify(newFriend))


        const query = { name: nameParent }
        const new_friends_db = {
            idUser: newFriend.idUser,
            name: newFriend.name
        }
        const friend = await UserLoggedModel.updateOne(query, { $push: { friends: new_friends_db } });
        return JSON.stringify(friend)
    } catch (error) {
        console.error(">>> Error addFriendToUserLoggedApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function removeFriendToUserLoggedApi(nameParent: string, oldFriend: UserDto) {
    try {
        await connectMongoDB()

        const query = { name: nameParent }
        const old_friends_db = {
            idUser: oldFriend.idUser,
            name: oldFriend.name
        }
        await UserLoggedModel.updateOne(query, { $pull: { friends: old_friends_db } });

    } catch (error) {
        console.error(">>> Error removeFriendToUserLoggedApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}

export async function updateFriendByNameParentApi(nameParent: string, newFriends: UserDto[]) {
    try {
        await connectMongoDB()

        const query = { name: nameParent }
        const new_friends_db = newFriends.map((f) => ({
            idUser: f.idUser,
            name: f.name
        }))
        const friend = await UserLoggedModel.findOneAndUpdate(query, { friends: new_friends_db });
        return JSON.stringify(friend)
    } catch (error) {
        console.error(">>> Error updateFriendByNameParentApi: " + error)
    } finally {
        await disconnectMongoDB();
    }
}
