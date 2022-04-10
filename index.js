import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import express from "express";
import getenv from "getenv";
import { mainRouter } from "./routes/index.js";
import mongoose from "mongoose";
import { passport } from "./utils/index.js";
import session from "express-session";

//loads .env
dotenv.config();

// connect to db
await mongoose.connect(getenv("MONGO_URI"));

const APP = express();
const PORT = getenv("EXPRESS_PORT", 3000);

APP.set("view engine", "pug");

APP.use(express.urlencoded({ extended: false }));
APP.use(express.json());
APP.use(express.static("public"));
APP.use("/photo", express.static("photoStorage"));

APP.use(session({
    secret: getenv("APP_SECRET"),
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ client: mongoose.connection.getClient() })
}));
APP.use(passport.initialize());
APP.use(passport.session());


APP.use("/", mainRouter);
APP.listen(PORT, () => console.log(`App listening on port ${PORT}`));