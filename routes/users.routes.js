import express from "express";
import { createUser, loginUser } from "../controllers/users.controller.js";

// users routes

const userRoutes = express.Router();

userRoutes.route("/signUp").post(createUser);
userRoutes.route("/login").post(loginUser);

export default userRoutes;
