import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    Location:{
        type: String,
        required: true,
    },
    Phonenumber:{
        type: Number,
        required: true,
    },
    Password:{
        type: String,
        required: true,
        minlength: 6,
    },
    Profilepicture:{
        type: String,

        default: "",
    },
    //createdad, updatedat
}, {timstamps: true});

const User = mongoose.model("User", UserSchema);
export default User;