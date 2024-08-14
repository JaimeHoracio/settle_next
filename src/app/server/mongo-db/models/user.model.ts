import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema({
    idUser: String,
    name: String
})

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default UserModel;