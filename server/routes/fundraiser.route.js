import express from "express";
// import { isAutheticated } from "../middleware/auth.js";
import { createFundraiserRequest, editFundraiser, getAllFundraisers, getAllFundraisersByUrgency, updateFundraiserAmount } from "../controllers/fundraiser.controller.js";
import { isAutheticated } from "../middleware/auth.js";
const fundraiserRouter=express.Router();

fundraiserRouter.post('/createFundraiser',isAutheticated,createFundraiserRequest);
fundraiserRouter.put("/edit-fund/:id",isAutheticated,editFundraiser);
fundraiserRouter.put("/update-fund-amount/:id",updateFundraiserAmount);

fundraiserRouter.get('/getAllFunds',getAllFundraisers);
// fundraiserRouter.get('/getAllFundsRandom',getAllFundraisersRandom);
fundraiserRouter.get('/getAllFundsUrgency',getAllFundraisersByUrgency);

export default fundraiserRouter;