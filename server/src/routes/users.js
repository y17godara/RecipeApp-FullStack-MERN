import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }); 

    if(user) {
        return res.json({ message: "User Already Exists! Login Pls" });
    }

    res.json(user);
});

router.post("/login");


export { router as userRouter };








