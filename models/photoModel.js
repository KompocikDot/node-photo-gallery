import mongoose from "mongoose";

const { Schema, model } = mongoose;

const photoSchema = new Schema({
    photoOwner: mongoose.ObjectId,
    collectionId: mongoose.ObjectId, 
    photoTitle: String,
    photoDescription: String,
    addDate: Date,
});

const photoModel = model("photoModel", photoSchema);
export { photoModel };