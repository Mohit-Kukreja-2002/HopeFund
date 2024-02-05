import express from "express";
import { registrationUser,activateUser, loginUser,logoutUser, updateAccessToken, getUserInfo, socialAuth, updateUserInfo, updateProfilePicture, getUser, updateUserFundIdArray, getUserPic} from "../controllers/user.controller.js";
import { isAutheticated } from "../middleware/auth.js";
const userRouter=express.Router();

userRouter.post('/registration',registrationUser);
userRouter.post('/activate-user',activateUser);
userRouter.post('/login',loginUser);
userRouter.post('/socialAuth',socialAuth);
userRouter.post('/get-user-pic',getUserPic);

userRouter.get('/logout',isAutheticated,logoutUser);
userRouter.get('/refresh',updateAccessToken);
userRouter.get('/getUser',getUser);
userRouter.get('/me',isAutheticated,getUserInfo);

userRouter.put('/update-user-info',isAutheticated,updateUserInfo);
userRouter.put('/update-user-avatar',isAutheticated,updateProfilePicture);
userRouter.put('/update-user-fundArray',isAutheticated,updateUserFundIdArray);

export default userRouter;