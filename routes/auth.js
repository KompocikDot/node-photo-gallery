import { Router } from "express";
import passport from "passport";
import { userModel } from "../models/userModel.js";

const authRouter = Router();

authRouter.get("/register", (req, res) => {
    res.render("register_page");
});

authRouter.post("/register", (req, res) => {
    userModel.register(
        new userModel({username: req.body.username}),
        req.body.password,
        (err, acc) => {
            if (err) {
                return res.render('register_page', { error: err });
            }
            passport.authenticate('local')(req, res, () => {
                res.redirect('../posts');
            });
        });
});

authRouter.get("/login", (req, res) => {
    res.render("login");
});

authRouter.post("/login", passport.authenticate("local", { failureRedirect: "./login" }), (req, res) => {
    res.redirect("/posts")
});

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export { authRouter };