import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema({
    idUser: String,
    name: String
})

// Se utiliza para el campo friends de usuarios logueados.
const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default UserModel;