import Router from "express";
import { authRouter } from "./index.js";
import { userRouter } from "./user.js";

const mainRouter = Router();

mainRouter.get("/", (req, res) =>  {
    res.render("mainpage.pug", {title: "Mainpage"});
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/", userRouter)
export {mainRouter};