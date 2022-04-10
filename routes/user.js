import Router from "express";
import { isLogggedIn } from "../utils/isLoggedIn.js";
import mongoose from "mongoose";
import { photoCollectionModel } from "../models/photoCollectionModel.js";
import { upload } from "../utils/customStorage.js";
import { userPhoto } from "../models/userPhotos.js";

const userRouter = Router();


userRouter.get("/posts", isLogggedIn, async (req, res) => {
    const posts = await photoCollectionModel.find({});
    res.render("logged", { posts });
});

userRouter.get("/add-collection", isLogggedIn, (req, res) => {
    res.render("add_collection");
});

userRouter.post("/add-collection", isLogggedIn, (req, res) => {
    const collection = new photoCollectionModel({
        collectionName: req.body.collection_name,
        collectionOwner: req.user.id
    });
    
    collection.save();
    res.redirect("/posts");
});

userRouter.get("/collection/:id", async (req, res) => {
    const collectionData = await userPhoto.findById({ photoCollection: req.params.id });
    res.render("collection_page", { collectionData });
});

userRouter.get("/add-photo/:collectionID", (req, res) => {
    res.render("add_photo", { collectionID: req.params.collectionID });
});

userRouter.post("/add-photo/:collectionID", upload.array("photos", 30), (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

export {userRouter};