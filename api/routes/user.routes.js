import { Router } from "express";
import {
  userLogin,
  userSignUp,
} from "../controllers/patients-user.controller.js";
const userRoute = Router();

userRoute.post("/user/signup", userSignUp);
userRoute.post("/user/login", userLogin);

export default userRoute;
