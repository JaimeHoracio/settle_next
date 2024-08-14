import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./user.model";

export const UserLoggedSchema = new Schema({
    name: String,
    password: String,
    createdAt: Date,
    friends: [UserSchema]
})

const UserLoggedModel = mongoose.models.UsersLogin || mongoose.model("UsersLogin", UserLoggedSchema);
export default UserLoggedModel;