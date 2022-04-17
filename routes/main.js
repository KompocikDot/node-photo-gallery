import Router from "express";
import { authRouter } from "./index.js";
import { userRouter } from "./user.js";

const mainRouter = Router();

mainRouter.get("/", (req, res) =>  {
    res.render("mainpage", { title: "Mainpage", user: req.user });
});

mainRouter.use("/auth", authRouter);
mainRouter.use("/", userRouter);
export { mainRouter };