import mongoose from "mongoose";

export const connectMongoDB = async () => {
    if (mongoose.connections[0].readyState) {
        return true
    }

    const MONGODB_URI = process.env.MONGODB_URI
    if (MONGODB_URI) {
        try {
            // Por defecto ya es true estos dos campos, se agregan para saber que existen.
            const option = {
                autoIndex: true,
                autoCreate: true
            }
            const connect = await mongoose.connect(MONGODB_URI, option)
            //console.log(">>> MongoDB is connected!!")
            return connect
        } catch (error) {
            console.log(">>> Error: " + error)
            return false
        }
    } else {
        console.log(">>> Error: Mongo URI not found.")
    }
}

export const disconnectMongoDB = async () => {
    //console.log(">>> MongoDB is disconnected!!")
    await mongoose.disconnect();
}

