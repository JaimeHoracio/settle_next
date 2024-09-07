import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./user.model";

export const UserLoggedSchema = new Schema({
    name: String,
    password: String,
    createdAt: Date,
    friends: [UserSchema]
})

const UserLoggedModel = mongoose.models.UserLogged || mongoose.model("UserLogged", UserLoggedSchema);
export default UserLoggedModel;