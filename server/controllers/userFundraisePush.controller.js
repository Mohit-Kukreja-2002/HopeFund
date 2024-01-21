// import connectDb from "../../middleware/db";
// import Fetchuser from "../../middleware/fetchUser";
// import User from "../../models/User";
// import nextConnect from 'next-connect';

// const handler = async (req, res) => {
//     if (req.method !== "PUT") {
//         return res.status(405).end(); //! Method Not Allowed
//     }

//     try {
//         const { fundraiser, amount, email,extension } = req.body;
//         let updatedFundraiser = {};
//         let user = await User.findOne({ email: email });
//         updatedFundraiser.donationsArray = user.donationsArray.concat({ fundraiser: fundraiser, amount: parseInt(amount),extension:extension });
//         updatedFundraiser.amountDonated=user.amountDonated+parseInt(amount);

//         user = await User.findOneAndUpdate({ _id: user._id }, updatedFundraiser, { new: true });

//         res.json({ success: true, user });
//     } catch (error) {
//         res.status(500).json({ "error": error });
//         console.log(error);
//     }
// };

// export default connectDb(handler)

// // export default nextConnect().use(connectDb).use(Fetchuser).post(handler);
