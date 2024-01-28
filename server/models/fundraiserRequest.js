import mongoose, { Schema } from "mongoose";

const FundraiseRequestsSchema = new Schema({
    verified: { 
        type: Boolean, 
        default: false
    },
    donators: [],

    category: { 
        type: String, 
        required: true 
    },
    fundraiserTitle: { 
        type: String, 
        required: true 
    },
    fundraiserStory: { 
        type: String 
    },
    amountRequired: { 
        type: String, 
        required: true 
    },
    endDateToRaise: { 
        type: Date, 
        default: Date.now() 
    },
    includeTaxBenefit: { 
        type: String 
    },

    createdBy: { 
        type: String, 
        required: true 
    },
    creatorMail: { 
        type: String, 
        required: true 
    },
    benefitterImg: { 
        public_id: String,
        url: String, 
    },

    benefitterCreatorRelation: { 
        type: String 
    },
    benefitterName: { 
        type: String 
    },
    benefitterAge: { 
        type: Number 
    },
    benefitterGender: { 
        type: String 
    },
    benefitterAddress: { 
        type: String 
    },
    benefitterContact: { 
        type: String 
    },

    amountRaised: { 
        type: Number, 
        default: 0 
    },

    hospitalName: { 
        type: String 
    },
    hospitalLocation: { 
        type: String 
    },
    ailment: { 
        type: String 
    },

    numberOfDonators: { 
        type: Number, 
        default: 0 
    },

    coverImg: { 
        public_id: String,
        url: String, 
    },
}, { timestamps: true });
export default mongoose.models.FundraiseRequests || mongoose.model('FundraiseRequests', FundraiseRequestsSchema);