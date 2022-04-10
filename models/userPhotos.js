import mongoose from "mongoose";
const {Schema, model, ObjectId} = mongoose;

const userPhotoSchema = new Schema({
    photoOwner: ObjectId,
    photoName: String,
    photoPath: String,
    photoCollection: ObjectId,
});

const userPhoto = model("userPhoto", userPhotoSchema);

export {userPhoto};