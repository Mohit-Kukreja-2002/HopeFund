import express from "express";
import { registrationUser,activateUser, loginUser,logoutUser, updateAccessToken, getUserInfo, socialAuth, updateUserInfo, updateProfilePicture, getUser} from "../controllers/user.controller.js";
import { isAutheticated } from "../middleware/auth.js";
const userRouter=express.Router();

userRouter.post('/registration',registrationUser);
userRouter.post('/activate-user',activateUser);
userRouter.post('/login',loginUser);
userRouter.post('/socialAuth',socialAuth);

userRouter.get('/logout',isAutheticated,logoutUser);
userRouter.get('/refresh',isAutheticated,updateAccessToken);
userRouter.get('/getUser',getUser);
userRouter.get('/me',isAutheticated,getUserInfo);

userRouter.put('/update-user-info',isAutheticated,updateUserInfo);
userRouter.put('/update-user-avatar',isAutheticated,updateProfilePicture);


export default userRouter;