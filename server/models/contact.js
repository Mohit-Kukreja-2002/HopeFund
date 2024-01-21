import mongoose,{Schema} from "mongoose";
const ContactSchema = new Schema({
    requesterName: {
        type: String,
        required: true
    },
    requesterPhone: { 
        type: Number, 
        required: true
    },
    requesterFundraise: {
        type: String, 
        required: true
    },
    requesterLanguage: {
        type: String, 
        required: true
    },
},{timestamps:true});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);