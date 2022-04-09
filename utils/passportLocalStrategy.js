import LocalStrategy from "passport-local";
import passport from "passport";
import { userModel } from "../models/userModel.js";

passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


export {passport};