import express from "express";
import {Signup, Login, Logout} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/auth/Signup", Signup);

router.post("/api/auth/Login", Login);

router.post("/api/auth/Logout", Logout);



export default  router;