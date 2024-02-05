import { catchAsyncError } from '../middleware/catchAsyncErrors.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import User from '../models/user.js';
import fundRaiseModel from '../models/fundraiserRequest.js';
import dotenv from 'dotenv';
dotenv.config();
// import path from "path";
// import ejs from "ejs";
// import sendMail from '../sendMail.js';
// import { getAllOrdersService, newOrder } from "../services/order.service";
import Stripe from 'stripe';
import { redis } from '../utils/redis.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// create order
export const createPayment = catchAsyncError(
  async (req, res, next) => {
    try {
      const { email, fundId, payment_info, amount } = req.body;

      if (payment_info) {
        if ("id" in payment_info) {
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );

          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandler("Payment not authorized!", 400));
          }
        }
      }

      let user = await User.findOne({ email});
      const fund = await fundRaiseModel.findById(fundId);

      // console.log(user);

      if(!user){
        user = await User.create({
          email: email,
          name: email.substring(0,email.indexOf("@")),
        })
      }

      if (!fund) {
        return next(new ErrorHandler("Fund not found", 404));
      }

      let toPush;
      if(fund.coverImg?.url){
        toPush = {
          fundraiser: fundId,
          fundraiserImg: fund.coverImg.url,
          amount: amount,
        }
      }else{
        toPush = {
          fundraiser: fundId,
          amount: amount,
        }
      }

      user.donationsArray.push(toPush);
      user.amountDonated+=Number(amount);
      await user.save();
      await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days

      fund.donators.push(user?._id);
      fund.amountRaised+=Number(amount);
      fund.numberOfDonators+=1;
      await fund.save();
      await redis.set(fundId, JSON.stringify(fund), "EX", 604800); // 7days
      // await redis.set(req.user?._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
      })
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//  send stripe publishble key
export const sendStripePublishableKey = catchAsyncError(
  async (req, res) => {
    // console.log("here: ",process.env.STRIPE_PUBLISHABLE_KEY);
    res.status(200).json({
      publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// new payment
export const newPayment = catchAsyncError(
  async (req, res, next) => {
    try {
      // console.log("inside");
      // console.log(req.body.amount);
      const myPayment = await stripe.paymentIntents.create({
        amount: (req.body.amount) * 100,
        currency: "INR",
        description: "HopeFund donation services",
        metadata: {
          company: "HopeFund",
        },
        automatic_payment_methods: {
          enabled: true,
        },
        shipping: {
          name: "Mohit Kukreja",
          address: {
            line1: "2179 Sector 15",
            postal_code: "131001",
            city: "Sonipat",
            state: "Haryana",
            country: "INDIA",
          },
        },
      });
      // console.log(myPayment)
      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
