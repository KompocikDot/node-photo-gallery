import { isLoggedIn, upload } from "../utils/index.js";
import { photoCollectionModel, userPhoto } from "../models/index.js";

import Router from "express";
import mongoose from "mongoose";

const userRouter = Router();


userRouter.get("/posts", isLoggedIn, async (req, res) => {
    const posts = await photoCollectionModel.find({});
    res.render("logged", { posts });
});

userRouter.get("/add-collection", isLoggedIn, (req, res) => {
    res.render("add_collection");
});

userRouter.post("/add-collection", isLoggedIn, (req, res) => {
    const collection = new photoCollectionModel({
        collectionName: req.body.collection_name,
        collectionOwner: req.user.id
    });
    
    collection.save();
    res.redirect("/posts");
});

userRouter.get("/collection/:id", async (req, res) => {
    console.log(req.params.id)
    const collectionData = await userPhoto.find({ photoCollection: mongoose.mongo.ObjectId(req.params.id) });
    res.render("collection_page", { collectionData });
});

userRouter.get("/add-photo/:collectionID", (req, res) => {
    res.render("add_photo", { collectionID: req.params.collectionID });
});

userRouter.post("/add-photo/:collectionID", upload.array("photos", 30), async (req, res) => {
    const photoObjects = [];
    req.files.forEach(file => {
        photoObjects.push({
            photoOwner: req.user.id,
            photoPath: `/photo/${req.params.collectionID}/${file.originalname}`,
            photoCollection: req.params.collectionID
        });   
    });
    
    await userPhoto.insertMany(photoObjects);
    res.sendStatus(200);
});

export {userRouter};