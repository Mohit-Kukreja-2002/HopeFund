import { body, validationResult } from 'express-validator';
import { catchAsyncError } from '../middleware/catchAsyncErrors.js';
import { createFundraiser } from '../services/fundraiser.services.js';
import { redis } from '../utils/redis.js';
import fundRaiseModel from '../models/fundraiserRequest.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import cloudinary from "cloudinary";

export const createFundraiserRequest = catchAsyncError(
  async (req, res, next) => {
    if (req.method !== 'POST') {
      return res.status(405).end(); //! Method Not Allowed
    }
    //! Checking if the inputs are valid or not
    const validationMiddleware = [
      body('creatorMail', 'Enter a valid email').isEmail(),
    ];

    // Run validation middleware
    await Promise.all(validationMiddleware.map((middleware) => middleware.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = req.body;
      const coverImg = data.coverImg;
      if (coverImg) {
        const myCloud = await cloudinary.v2.uploader.upload(coverImg, {
          folder: "fundraisers",
        });

        data.coverImg = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createFundraiser(data, res, next);
    }
    catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
)

// edit fund
export const editFundraiser = catchAsyncError(
  async (req, res, next) => {
    try {
      const data = req.body;
      const coverImg = data.coverImg;

      const fundId = req.params.id;
      const fundraiserData = await fundRaiseModel.findById(fundId);

      if (coverImg && !coverImg.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(fundraiserData.coverImg.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(coverImg, {
          folder: "fundraisers",
        });

        data.coverImg = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (coverImg && coverImg.startsWith("https")) {
        data.coverImg = {
          public_id: fundraiserData?.coverImg.public_id,
          url: fundraiserData?.coverImg.url,
        };
      }

      const fund = await fundRaiseModel.findByIdAndUpdate(
        fundId,
        {
          $set: data,
        },
        { new: true }
      );
      await redis.set(fundId, JSON.stringify(fund)); // update course in redis
      res.status(201).json({
        success: true,
        fund,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const updateFundraiserAmount = catchAsyncError(
  async (req, res, next) => {
    if (req.method !== 'PUT') {
      return res.status(405).end(); //! Method Not Allowed
    }
    try {
      const fundId = req.params.id;
      const data = req.body;

      let fundraiser = await fundRaiseModel.findById(fundId);
      if (!fundraiser) {
        return res.status(404).send({ success: false, error: "Fundraiser Not Found" });
      }
      console.log(fundraiser);
      console.log(data.amount);
      console.log(fundraiser.amountRaised);

      if (data.amount) {
        fundraiser.amountRaised = fundraiser.amountRaised+parseInt(data.amount);
        fundraiser.numberOfDonators = 1 + fundraiser.numberOfDonators;
      }
      const updatedFundraiser = await fundraiser.save(); // Save the changes

      // await redis.set(fundId, JSON.stringify(updatedFundraiser)); // update fund in redis
      res.status(201).json({
        success: true,
        updatedFundraiser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
)

// Get All Fundraisers in order of creation
export const getAllFundraisers = catchAsyncError(
  async (req, res, next) => {
    try {
      const fundraisers = await fundRaiseModel.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        fundraisers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get All Fundraisers Sorted by endDatetoRaise in Ascending Order
export const getAllFundraisersByUrgency = catchAsyncError(
  async (req,res,next) => {
    try {
      const fundraisers = await fundRaiseModel.aggregate([
        { $sort: { endDatetoRaise: 1 } }
      ]);

      res.status(200).json({
        success: true,
        fundraisers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get All Fundraisers in Random Order
// export const getAllFundraisersRandom = catchAsyncError(
//   async (req,res,next) => {
//     try {
//       const fundraisers = await fundRaiseModel.aggregate([]);

//       res.status(200).json({
//         success: true,
//         fundraisers,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );