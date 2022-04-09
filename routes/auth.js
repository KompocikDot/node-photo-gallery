import { Router } from "express";
import { isLoggedIn } from "../utils/permissions.js";
import passport from "passport";
import { userModel } from "../models/userModel.js";

const authRouter = Router({ mergeParams: true });

authRouter.get("/register", (req, res) => {
    res.render("register", {});
});

authRouter.post("/register", (req, res) => {
    userModel.register(
        new userModel({ username : req.body.username }),
        req.body.password,
        (err, account) => {
            if (err) {
                return res.render('register', { account : account });
            }

            passport.authenticate('local')(req, res, () => res.redirect('/')
            );
        });
});

authRouter.get("/login", (req, res) => {
    res.render("login");
})

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("./");
});

authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect("./");
});

authRouter.get("/", isLoggedIn, (req, res) => {
    res.send("eeee logged");
}) 

export { authRouter, passport };