import express from "express";
import {Signup, Login, Logout} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/api/auth/Signup", Signup);

router.get("/api/auth/Login", Login);

router.get("/api/auth/Logout", Logout);



export default  router;