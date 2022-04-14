import mongoose from "mongoose";
import passport_local_mongoose from "passport-local-mongoose";

const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
});

userSchema.plugin(passport_local_mongoose);

const userModel = model("userModel", userSchema);
export {userModel};