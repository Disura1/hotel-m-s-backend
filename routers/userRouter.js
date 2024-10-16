import express from "express";
import { postUsers, loginUsers } from "../controllers/userControllers.js"

const userRouter = express.Router()

userRouter.post("/",postUsers)

userRouter.post("/login",loginUsers)

export default userRouter;