import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
        required:[true,"Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        // required: true,
        minlength:[8,"Password must be atleast 8 characters"],
    },
    amountDonated: {
        type: Number,
        default: 0
    },
    donationsArray: [
        {
            fundraiser: {
                type: String,
                required: true
            },
            fundraiserImg: {
                type: String,
                // required: true
            },
            amount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
        }
    ],
    avatar: {
        public_id: String,
        url: String,
    },
    createdFunds : [],
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Sign access token method
UserSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', {
        expiresIn: "5m",
    });
};

// Sign refresh token method
UserSchema.methods.SignRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', {
        expiresIn: "3d",
    });
};

// Compare password method
UserSchema.methods.comparePassword = function(enteredPassword){
    return bcrypt.compareSync(enteredPassword,this.password)
}


export default mongoose.models.User || mongoose.model('User', UserSchema);
