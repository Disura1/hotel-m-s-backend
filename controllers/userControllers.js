import User from "../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export function postUsers(req,res){
    const user = req.body;

    const password = req.body.password;       //Password hashing
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    user.password = passwordHash

    const newUser = new User(user)
    newUser.save().then(
        ()=>{
            res.json({
                message : "User Created Successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "User Creation Failed"
            })
        }
    )
}

export function loginUsers(req,res){
    const credentials = req.body

    User.findOne({email: credentials.email}).then(
        (user)=>{
            if(user == null){
                res.status(403).json({
                    message: "User not found"
                })
            }else{
                const isPasswordValid = bcrypt.compareSync(credentials.password, user.password)
                
                if(!isPasswordValid){
                    res.status(403).json({
                        message: "Incorrect Password"
                    })
                }else{
                    const payload = {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        type: user.type
                    };

                    const token = jwt.sign(payload, "secret", { expiresIn: "48h"});   //asign user information to the "token" , "secret" is the password
                
                    res.json({
                        message: "User found",
                        user: user,
                        token: token   //send the token to the frontend
                    })
                }
            }
        }
    )
}