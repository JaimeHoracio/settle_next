
import mongoose, { Schema } from "mongoose";

const meetSchema = new Schema({
    idMeet: String,
    createdBy: {
        idUser: String,
        name: String,
    },
    name: String,
    details: String,
    active: Boolean
}, {
    timestamps: true
})

const MeetsModel = mongoose.models.Meets || mongoose.model("Meets", meetSchema)
export default MeetsModel

