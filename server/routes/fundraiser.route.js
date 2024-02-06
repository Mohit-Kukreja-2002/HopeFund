import express from "express";
// import { isAutheticated } from "../middleware/auth.js";
import { createFundraiserRequest, editFundraiser, getAllFundraisers, getAllFundraisersByUrgency, getDonatedFundsByUser, getFundraisersByUser, updateFundraiserAmount } from "../controllers/fundraiser.controller.js";
import { isAutheticated } from "../middleware/auth.js";
import { addBenefitterImg, addCoverImg, deleteBenefitterImg, deleteCoverImg, fundraiserBySearch, fundraiserByType, getSingleFundraiser } from "../services/fundraiser.services.js";
const fundraiserRouter=express.Router();

fundraiserRouter.put("/edit-fund/:id",isAutheticated,editFundraiser);
fundraiserRouter.put("/update-fund-amount/:id",updateFundraiserAmount);

fundraiserRouter.get('/getAllFunds',getAllFundraisers);
fundraiserRouter.get('/getAllFundsByUrgency',getAllFundraisersByUrgency);
fundraiserRouter.get("/get-fund/:id",getSingleFundraiser);
// fundraiserRouter.get('/getAllFundsRandom',getAllFundraisersRandom);
fundraiserRouter.get('/getUserCreatedFunds',isAutheticated,getFundraisersByUser);
fundraiserRouter.get('/getUserDonatedFunds',isAutheticated,getDonatedFundsByUser);

fundraiserRouter.post('/createFundraiser',isAutheticated,createFundraiserRequest);
fundraiserRouter.post('/addBenefitterImg',addBenefitterImg);
fundraiserRouter.post('/deleteBenefitterImg',deleteBenefitterImg);
fundraiserRouter.post('/addCoverImg',addCoverImg);
fundraiserRouter.post('/deleteCoverImg',deleteCoverImg);
fundraiserRouter.post('/fundraiserByType',fundraiserByType);
fundraiserRouter.post('/fundraiserBySearch',fundraiserBySearch);

export default fundraiserRouter;