import { catchAsyncError } from '../middleware/catchAsyncErrors.js';
import fundRaiseModel from '../models/fundraiserRequest.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import cloudinary from "cloudinary";

// create fundraiser
export const createFundraiser = catchAsyncError(async (data, res, next) => {
    try {
        const fundraise = await fundRaiseModel.create(data);
        res.status(200).json({
            success: true,
            fundraise
        });
    }
    catch (err) {
        console.log(err);
        return next(new ErrorHandler(err.message, 400));
    }
})

export const fundraiserByType = catchAsyncError(
    async (req, res, next) => {
        try {
            const { type } = req.body.type;
            let query = { verified: true };
            if (type === "non-profit") {
                query.category = { $in: ["education", "others"] };
            } else {
                query.category = type;
            }
            const fundraisers = await fundRaiseModel.find(query).sort({ endDatetoRaise: 1 });
            res.status(200).json({
                success: true,
                fundraisers,
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
)

export const fundraiserBySearch = catchAsyncError(
    async (req, res, next) => {
        try {
            const searchTerm = req.body.search.search;
            // console.log(req.body.search);
            const regexTerm = new RegExp(`.*${searchTerm}.*`, "i");
            
            const fundraisers = await fundRaiseModel.find({ 
                verified: true, 
                $or: [
                    {benefitterName:{$regex:regexTerm}},
                    {category:{$regex:regexTerm}},
                    {fundraiserTitle:{$regex:regexTerm}},
                    {benefitterAddress:{$regex:regexTerm}},
                    {ailment:{$regex:regexTerm}},
                    {createdBy:{$regex:regexTerm}},
                    {hospitalLocation:{$regex:regexTerm}},
                ]
            }).sort({ endDatetoRaise: 1 });
            res.status(200).json({
                success: true,
                fundraisers,
            });

        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
)

export const addBenefitterImg = catchAsyncError(
    async (req, res, next) => {
        try {
            const { avatar } = req.body;

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "benefitter",
                width: 150,
            });
            let ans = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };

            res.status(200).json({
                success: true,
                ans
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const deleteBenefitterImg = catchAsyncError(
    async (req, res, next) => {
        try {
            const { public_id } = req.body;

            await cloudinary.v2.uploader.destroy(public_id);

            res.status(200).json({
                success: true,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const addCoverImg = catchAsyncError(
    async (req, res, next) => {
        try {
            const { avatar } = req.body;

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "coverImg",
                width: 150,
            });
            let ans = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };

            res.status(200).json({
                success: true,
                ans
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

export const deleteCoverImg = catchAsyncError(
    async (req, res, next) => {
        try {
            const { public_id } = req.body;

            await cloudinary.v2.uploader.destroy(public_id);

            res.status(200).json({
                success: true,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

