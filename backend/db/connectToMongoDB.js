import mongoose from "mongoose";
export function connectToMongoDB() {
const connectToMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
    } catch (error) {
        console.log("error connecting to MongoDB", error.message);
    }
    };
}