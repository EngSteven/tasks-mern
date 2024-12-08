import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../libs/jwt.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email already exists"]);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, 
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save(); // se guarda el usuario en mongo 
        const token = await createAccessToken({ id: savedUser._id });   //crea el token
        
        res.cookie('token', token); // se guarda el token en una cookie
        res.json({
            message: "User created successfully",
            id: savedUser._id, 
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        });

    }
    catch (error) {
        res.status(500).json({ message: err-or.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {

        const foundedUser = await User.findOne({ email });
        if (!foundedUser) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, foundedUser.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = await createAccessToken({ id: foundedUser._id });   //crea el token
        
        res.cookie('token', token); // se guarda el token en una cookie
        res.json({
            message: "User logged successfully",
            id: foundedUser._id, 
            username: foundedUser.username,
            email: foundedUser.email,
            createdAt: foundedUser.createdAt,
            updatedAt: foundedUser.updatedAt
        });

    }
    catch (error) {
        res.status(500).json({ message: err-or.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) =>  {  
    const foundedUser = await User.findById(req.user.id);
    if(!foundedUser) return res.status(400).json({ message: "User not found" });
    res.json(
        {
            id: foundedUser._id,
            username: foundedUser.username,
            email: foundedUser.email,
            createdAt: foundedUser.createdAt,
            updatedAt: foundedUser.updatedAt
        }
    );
}