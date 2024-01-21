import { catchAsyncError } from '../middleware/catchAsyncErrors.js';
import fundRaiseModel from '../models/fundraiserRequest.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// create fundraiser
export const createFundraiser = catchAsyncError(async (data, res,next) => {
    try{
        const fundraise = await fundRaiseModel.create(data);
        res.status(200).json({
            success: true,
            fundraise
        });
    }
    catch(err){
        console.log(err);
        return next(new ErrorHandler(err.message,400));
    }
})


