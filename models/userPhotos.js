import mongoose from "mongoose";

const {Schema, model, ObjectId} = mongoose;

const userPhotoSchema = new Schema({
    photoPath: String,
    photoCollection: ObjectId,
});

const userPhoto = model("userPhoto", userPhotoSchema);

export {userPhoto};