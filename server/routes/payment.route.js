import { createPayment, newPayment, sendStripePublishableKey } from "../controllers/payment.controller.js";
import express from "express";

const paymentRouter = express.Router();

paymentRouter.post("/make-payment", createPayment);
paymentRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);
paymentRouter.post("/payment", newPayment);

export default paymentRouter;
