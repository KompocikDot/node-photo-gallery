import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { env } from "process";
import express from "express";
import { authRouter } from "./routes/auth.js";
import { mainRouter } from "./routes/main.js";
import mongoose from "mongoose";
import { passport } from "./utils/passportLocalStrategy.js";
import session from "express-session";

dotenv.config();

const mognoConnection = await mongoose.connect(env.MONGO_URI);


const APP = express();
const PORT = env.EXPRESS_PORT || 3000
APP.set("view engine", "pug");

APP.use(express.urlencoded({ extended: false }));
APP.use(express.json());
APP.use(cookieParser(env.APP_SECRET));
APP.use(session({
    secret: env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
}));

APP.use(passport.initialize());
APP.use(passport.session());
APP.use("/api", mainRouter);

APP.listen(PORT, () => console.log(`App listening on port ${PORT}`));