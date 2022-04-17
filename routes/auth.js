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
        (err) => {
            if (err) {
                console.log(err);
                return res.render("login_register", { error: err, action: "register", user: req.user });
            }
            passport.authenticate("local")(req, res, () => {
                res.redirect("../posts");
            });
        });
});

authRouter.get("/login", (req, res) => {
    res.render("login_register", {"title": "eee test", action: "login", user: req.user });
});

authRouter.post("/login", passport.authenticate("local", { failureRedirect: "./login" }), (_, res) => {
    res.redirect("/posts");
});

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export { authRouter };