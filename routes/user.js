import { isLoggedIn, upload } from "../utils/index.js";
import { photoCollectionModel, userModel, userPhoto } from "../models/index.js";
import { rmdirSync, unlinkSync } from "fs";

import Router from "express";
import path from "path";
import process from "process";
import { resolve } from "path";

const userRouter = Router();


userRouter.get("/posts", isLoggedIn, async (req, res) => {
    let posts = await photoCollectionModel.aggregate([{
        $lookup: {
            from: userModel.collection.name,
            localField: "collectionOwner",
            foreignField: "_id",
            as: "user_id",
            pipeline: [{$project: {hash: 0, salt: 0}}]
        }
    }]);

    res.render("posts", { posts, user: req.user });
});

userRouter.get("/add-collection", isLoggedIn, (req, res) => {
    res.render("add_collection", { user: req.user });
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
    const collectionData = await userPhoto.find({ photoCollection: req.params.id });
    const collectionMetaData = await photoCollectionModel.findById(req.params.id);
    res.render("collection_page", { collectionData, collectionMetaData, id: req.params.id, user: req.user });
});

userRouter.get("/photo/:collectionID", async (req, res) => {
    res.render("add_photo", { collectionID: req.params.collectionID, user: req.user });
});

userRouter.post("/photo/:collectionID", [isLoggedIn, upload.array("photos", 30)], async (req, res) => {  
    let photoObjects = req.files.map(file => ({
        photoPath: `/photo/${req.params.collectionID}/${file.originalname}`,
        photoCollection: req.params.collectionID
    }));

    await userPhoto.insertMany(photoObjects);
    res.redirect(`/collection/${req.params.collectionID}`);
});

userRouter.get("/delete-photo/:photoId", async (req, res) => {
    const deleted = await userPhoto.findByIdAndDelete(req.params.photoId);
    unlinkSync(path.join(process.cwd(), deleted.photoPath.replace("photo", "photoStorage")));
    
    res.redirect("back");
});

userRouter.get("/delete-collection/:id", async (req, res) => {
    await photoCollectionModel.findByIdAndDelete(req.params.id);
    const deletedPhotos = await userPhoto.find({photoCollection: req.params.id});
    await userPhoto.deleteMany({photoCollection: req.params.id});
    
    deletedPhotos.forEach(photo => {
        unlinkSync(path.join(process.cwd(), photo.photoPath.replace("photo", "photoStorage")));
    });
    if (deletedPhotos.length > 0) {
        rmdirSync(resolve(path.join(process.cwd(), deletedPhotos[0].photoPath.replace("photo", "photoStorage")), ".."));
    }
    res.redirect("/posts");
});

export {userRouter};