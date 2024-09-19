import { request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
      const token = req.cokkies.jwt;
      if(!token) {
        return res.status(401).json({error: "unauthorised - no Token provided"});
      }
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      if(!decoded) {
        return res.status(401).json({error: "unauthorised - invalid Token"});
      }
      const user = await User.findById(decoded.userId).select("-password");
      if(!user) {
        return res.status(404).json({error: "User not found"});
      }
      req.user = user;
      next();
    } catch (error) {
        console.log("Error in protectRoute midlleware: ",error.message);
        res.status(500).json({error: "internal server error"});
    }
};

export default protectRoute;