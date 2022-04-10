import mongoose from "mongoose";

const {Schema, model, ObjectId} = mongoose;

const photoCollectionSchema = new Schema({
    collectionName: String,
    collectionOwner: ObjectId
});

const photoCollectionModel = model("photoCollectionModel", photoCollectionSchema);

export {photoCollectionModel};