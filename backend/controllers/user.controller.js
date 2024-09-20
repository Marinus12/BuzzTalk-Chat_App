import User from '../models/user.model.js';

export const getUserForSidebar = async (req, res) => {
    try {
    
    const LoggedInUserId = req.user._id

    const allUsers = await User.find().select("-password");

      res.status(200).json(allUsers); 
    } catch (error) {
        console.log("Error in getUserForSidebar: ", error.message)
        res.status(500).json({ error: "internal server error"});
    }   
    }
    export default getUserForSidebar;
