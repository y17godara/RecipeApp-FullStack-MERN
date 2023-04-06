import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt,  { hash } from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }); 

     if(user) {
        return res.json({ message: "User Already Exists! Login Please" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword }); /* Actuall Adding Stuff to Database */
    await newUser.save();

    res.json({ message: "User Registered Successfully" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if(!user) {
        return res.json({ message: "Usern Not Exists! Register New Please" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.json({ message: "Username or Password Entered is Incorrect! Re-Check Please" })
    }


    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });

});


export { router as userRouter };








