import express from "express";
import { postUsers, loginUsers, getUser } from "../controllers/userControllers.js"

const userRouter = express.Router()

userRouter.post("/",postUsers)

userRouter.post("/login",loginUsers)

userRouter.get("/",getUser)

export default userRouter;