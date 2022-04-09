import Router from "express";
import { authRouter } from "./auth.js";

const mainRouter = Router();
mainRouter.use("/auth", authRouter);

mainRouter.get("/", (req, res) => {
    res.send("wtf")
});

export { mainRouter };