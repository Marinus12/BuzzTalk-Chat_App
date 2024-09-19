import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';


export const Signup = async(req, res) => {
    try {
        const {Username,Email,Location,PhoneNumber,Password,ConfirmPassword,Profilepicture} = req.body;
    if(Password !== ConfirmPassword) {
        return res.statuss(400).json({error:"Password do not match"})
    }
const user = await User.findOne({Username});

if(user) {
    return res.status(400).json({error:"Username already exist"});
}
//hashed password
const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(Password, salt);

const newUser = new User({
    Username,
    Email,
    Location,
    PhoneNumber,
    Password,
    Profilepicture
});

if(newUser) {
    //generate jwt oken
await generateTokenAndSetCookie(newUser.id, res);
await newUser.save();

res.status(201).json({
_id: newUser._id,
    Username: newUser.username,
    Profilepicture: newUser.Profilepicture,
});

} else {
    res.status(400).json({error: "invalide user data"});
}

 } catch (error) {
    console.log("error in signup controller", error.message);
    res.send(500).json({error: "internal server error"})
 }
};

export const Login = async(req, res) => {
    try {
        const{Username, Password} = req.body;
        const user = await User.findOne({Username});
        const isPasswordCorrect = await bcryptjs.compare(Password, user?.password || "");
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "invalid username or Password"});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            Username: user.username,
            profilepicture: user.profilepicture,
        });

    } catch (error) {
        console.log("Error in login controller, error.message");
        res.status(500).json({error: "internal server Error"});
}

};

export const Logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Ogged out sucessfully"});
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({error: "internal server error"});
}
    };
