import { catchAsyncError } from '../middleware/catchAsyncErrors.js';
import contactModel from '../models/contact.js';
import ErrorHandler from '../utils/ErrorHandler.js';
export const contactController = catchAsyncError(
    async (req, res, next) => {
        if (req.method !== 'POST') {
            return res.status(405).end(); //! Method Not Allowed
        }
        try {
            const data = req.body;
            // console.log(data)
            const contactUs = await contactModel.create(data);
            res.status(201).json({
                success: true,
                // contactUs
            });
        }
        catch (error) {
            return next(new ErrorHandler(error.message,400));
        }
    }
)