// import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { catchAsyncError } from '../middleware/catchAsyncErrors.js';
import { body, validationResult } from 'express-validator';
import User from '../models/user.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import sendMail from '../sendMail.js';
import cloudinary from "cloudinary";
import { sendToken } from '../utils/jwt.js';
import { getUserById } from '../services/user.services.js';
import { redis } from '../utils/redis.js';
import { accessTokenOptions, refreshTokenOptions } from '../utils/jwt.js';
dotenv.config();

export const registrationUser = catchAsyncError(
    async (req, res, next) => {
        if (req.method !== 'POST') {
            return res.status(405).json({
                success: false,
                message: `Method expected POST`,
            }); //! Method Not Allowed
        }
        const validationMiddleware = [
            body('email', 'Enter a valid email').isEmail(),
            body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
        ];

        // Run validation middleware
        await Promise.all(validationMiddleware.map((middleware) => middleware.run(req)));
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password } = req.body;
            const isEmailExist = await User.findOne({ email });
            if (isEmailExist) {
                return next(new ErrorHandler("Email already exists", 400));
            }

            let user = ({
                name: name,
                password: password,
                email: email,
            });

            const activationToken = createActivationToken(user);

            const activationCode = activationToken.activationCode;
            const data = { user: { name: user.name }, activationCode };

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            console.log(path.join(__dirname, "../mails/activation-mail.ejs"));
            const html = await ejs.renderFile(
                path.join(__dirname, "../mails/activation-mail.ejs"),
                data
            );
            try {
                await sendMail({
                    email: user.email,
                    subject: "Account Activation Mail",
                    template: "activation-mail.ejs",
                    data,
                });
                res.status(201).json({
                    success: true,
                    message: `Please check your email: ${user.email} to activate your account`,
                    activationToken: activationToken.token,
                });
            } catch (error) {
                return next(new ErrorHandler(error.message, 400));
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign(
        {
            user,
            activationCode,
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "5m",
        }
    );
    return { token, activationCode };
};

export const activateUser = catchAsyncError(
    async (req, res, next) => {
        try {
            const { activation_token, activation_code } = req.body;
            const newUser = jwt.verify(
                activation_token,
                process.env.ACTIVATION_SECRET
            );

            if (newUser.activationCode != activation_code) {
                return next(new ErrorHandler("Invalid activaton code", 400));
            }

            const { name, email, password } = newUser.user;
            const existUser = await User.findOne({ email });
            if (existUser) {
                return next(new ErrorHandler(`${email} already exists`, 400));
            }
            // Create a new user and save it in the database
            const user = await User.create({
                name,
                email,
                password,
            });
            res.status(201).json({
                success: true,
            });
        } catch (err) {
            return next(new ErrorHandler(err.message, 400));
        }
    }
);

export const loginUser = catchAsyncError(
    async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(new ErrorHandler("Please enter email and password", 400));
            }
            const user = await User.findOne({ email }).select("+password");
            // console.log(user);
            if (!user) {
                return next(new ErrorHandler("Invalid email or password", 400));
            }

            const isPasswordMatch = await user.comparePassword(password.trim());
            if (!isPasswordMatch) {
                return next(new ErrorHandler("Incorrect Password", 400));
            }
            sendToken(user, 200, res);
        } catch (err) {
            return next(new ErrorHandler(err.message, 400));
        }
    }
);

export const logoutUser = catchAsyncError(
    async (req, res, next) => {
        try {
            res.cookie("access_token", "", { maxAge: 1 });
            res.cookie("refresh_token", "", { maxAge: 1 });
            const userId = req.user?._id || "";
            redis.del(userId);
            res.status(200).json({
                success: true,
                message: "Logged out successfully",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const updateAccessToken = catchAsyncError(
    async (req, res, next) => {
        try {
            const refresh_token = req.cookies.refresh_token;
            const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

            const message = "Could not refresh token";
            if (!decoded) {
                return next(new ErrorHandler(message, 400));
            }
            const session = await redis.get(decoded.id);

            if (!session) {
                return next(
                    new ErrorHandler("Please login for access this resources!", 400)
                );
            }

            const user = JSON.parse(session);

            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: "5m", });

            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, { expiresIn: "3d", });

            req.user = user;

            res.cookie("access_token", accessToken, accessTokenOptions);
            res.cookie("refresh_token", refreshToken, refreshTokenOptions);

            await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days.
            res.status(200).json({
                status: "success",
                accessToken,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const getUserInfo = catchAsyncError(
    async (req, res, next) => {
        try {
            const userId = req.user?._id;
            getUserById(userId, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const socialAuth = catchAsyncError(
    async (req, res, next) => {
        try {
            const { email, name, avatar } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const newUser = await User.create({ email, name, avatar });
                sendToken(newUser, 200, res);
            } else {
                sendToken(user, 200, res);
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const updateUserInfo = catchAsyncError(
    async (req, res, next) => {
        try {
            const { name } = req.body;

            const userId = req.user?._id;
            const user = await User.findById(userId);

            if (name && user) {
                user.name = name;
            }

            await user?.save();

            await redis.set(userId, JSON.stringify(user));

            res.status(201).json({
                success: true,
                // user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const updateUserFundIdArray = catchAsyncError(
    async (req, res, next) => {
        try {
            const { id } = req.body;

            const userId = req.user?._id;
            const user = await User.findById(userId);

            user.createdFunds.push(id);
            await user?.save();
            await redis.set(userId, JSON.stringify(user));

            res.status(201).json({
                success: true,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const updateProfilePicture = catchAsyncError(
    async (req, res, next) => {
        try {
            const { avatar } = req.body;

            const userId = req.user?._id;

            const user = await User.findById(userId).select("+password");

            if (avatar && user) {
                // if user have one avatar then call this if
                if (user?.avatar?.public_id) {
                    // first delete the old image
                    await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

                    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                        folder: "avatars",
                        width: 150,
                    });
                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    };
                } else {
                    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                        folder: "avatars",
                        width: 150,
                    });
                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    };
                }
            }

            await user?.save();

            await redis.set(userId, JSON.stringify(user));

            res.status(200).json({
                success: true,
                // user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const getUser = catchAsyncError(
    async (req, res, next) => {
        if (req.method !== "GET") {
            return res.status(405).end(); //! Method Not Allowed
        }
        try {
            const { email } = req.body;
            let user = await User.findOne({ email: email });
            if (user) {
                res.status(200).json({
                    success: true,
                    user
                });
            } else {
                res.status(400).json({
                    success: false,
                    "error": "not found"
                })
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
)

export const getUserPic = catchAsyncError(
    async (req, res, next) => {
        try {
            const { email } = req.body;
            // console.log(email)
            let user = await User.findOne({email});
            if (user) {
                let userPic;
                if(user.avatar)userPic = user.avatar.url;
                res.status(200).json({
                    success: true,
                    userPic,
                });
            }else{
                let userPic = null;
                res.status(200).json({
                    success: false,
                    userPic,
                });
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
)
