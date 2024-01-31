import express from "express";
// import { isAutheticated } from "../middleware/auth.js";
import { createFundraiserRequest, editFundraiser, getAllFundraisers, getAllFundraisersByUrgency, getFundraisersByUser, updateFundraiserAmount } from "../controllers/fundraiser.controller.js";
import { isAutheticated } from "../middleware/auth.js";
import { addBenefitterImg, addCoverImg, deleteBenefitterImg, deleteCoverImg } from "../services/fundraiser.services.js";
const fundraiserRouter=express.Router();

fundraiserRouter.post('/createFundraiser',isAutheticated,createFundraiserRequest);
fundraiserRouter.put("/edit-fund/:id",isAutheticated,editFundraiser);
fundraiserRouter.put("/update-fund-amount/:id",updateFundraiserAmount);

fundraiserRouter.get('/getAllFunds',getAllFundraisers);
// fundraiserRouter.get('/getAllFundsRandom',getAllFundraisersRandom);
fundraiserRouter.get('/getAllFundsUrgency',getAllFundraisersByUrgency);

fundraiserRouter.post('/getUserCreatedFunds',isAutheticated,getFundraisersByUser);
fundraiserRouter.post('/addBenefitterImg',addBenefitterImg);
fundraiserRouter.post('/deleteBenefitterImg',deleteBenefitterImg);
fundraiserRouter.post('/addCoverImg',addCoverImg);
fundraiserRouter.post('/deleteCoverImg',deleteCoverImg);

export default fundraiserRouter;