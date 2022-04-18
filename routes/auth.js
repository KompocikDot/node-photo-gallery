import { Router } from "express";
import passport from "passport";
import { userModel } from "../models/index.js";

const authRouter = Router();

authRouter.get("/register", (req, res) => {
    res.render("login_register", { action: "register", user: req.user });
});

authRouter.post("/register", (req, res) => {
    userModel.register(
        new userModel({username: req.body.username}),
        req.body.password,
        (error) => {
            if (error) {
                if (req.headers.referer.includes("/register")) {
                    return res.render("login_register", { message: error, action: "register", user: req.user });
                } 
                else {
                    return res.render("mainpage", { message: error, action: "register", user: req.user });
                }
            }
            passport.authenticate("local")(req, res, () => {
                res.redirect("../posts");
            });
        });
});

authRouter.get("/login", (req, res) => {
    res.render("login_register", {"title": "eee test", action: "login", user: req.user });
});

authRouter.get("/login/incorrect", (req, res) => {
    res.render("login_register", {message: new Error( "Password or username is incorrect"), "title": "eee test", action: "login", user: req.user });
});

authRouter.post("/login", passport.authenticate("local", {failureRedirect: "/auth/login/incorrect"}), (_, res) => {
    res.redirect("/posts");
});

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export { authRouter };