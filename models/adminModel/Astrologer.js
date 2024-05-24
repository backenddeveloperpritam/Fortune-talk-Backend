import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const astrologerSchema = new mongoose.Schema(
  {
    astrologerName: {
      type: String,
      required: [true, 'astrologerName is required']
    },
    phoneNumber: {
      type: String,
      required: [true, 'phoneNumber is required']
    },
    alternateNumber: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: [true, 'Gender is required']
    },
    email: {
      type: String,
      required: [true, 'email is required']
    },
    profileImage: {
      type: String,
      default: "",
    },
    chat_price: {
      type: Number,
      default: 0,
    },
    call_price: {
      type: Number,
      default: 0,
    },
    experience: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: "",
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    status: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Number,
      default: 0,
    },
    isSignupCompleted: {
      type: Number,
      default: 0,
    },
    country_phone_code: {
      type: String,
      default: "",
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
    },
    address: {
      type: String,
      default: "",
    },
    free_min: {
      type: Number,
      default: "",
    },
    id_proof_image: {
      type: String,
      default: "",
    },
    pan_proof_image: {
      type: String,
      default: "",
    },
    bank_proof_image: {
      type: String,
      default: "",
    },
    otp: {
      type: Number,
      default: "",
    },
    fcmToken: {
      type: String,
      default: "",
    },
    unique_id: {
      type: String,
      default: "",
    },
    isOtpVerified: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false, // Default status is offline
    },
    isLive: {
      type: Boolean,
      default: false, // Default status is offline
    },
    preferredDays: [
      {
        type: String,
        default: "",
      },
    ],

    language: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },
    avg_rating: {
      type: Number,
      default: "",
    },
    consultation_price: {
      type: String,
      default: 0,
    },
    commission_call_price: {
      type: String,
      default: 0,
    },
    commission_chat_price: {
      type: String,
      default: 0,
    },
    commission_remark: {
      type: String,
      default: "",
    },
    startTime: {
      type: Date,
      default: "",
    },
    endTime: {
      type: Date,
      default: "",
    },
    skill: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill", // Assuming it's a valid reference to Skill model
      },
    ],
    subSkill: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSkill", // Assuming it's a valid reference to SubSkill model
      },
    ],

    expertise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expertise", // Assuming it's a valid reference to Expertise model
      },
    ],

    mainExpertise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MainExpertise", // Assuming it's a valid reference to MainExpertise model
      },
    ],
    remedies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Remedies", // Assuming it's a valid reference to Remedies model
      },
    ],
    workingOnOtherApps: {
      type: String, // Assuming it's an array of strings, adjust type if it's different
      default: "No",
    },
    activeBankAcount: {
      type: String,
      default: "No",
    },
    activeBankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankAccount",
    },
    bankAcount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
      },
    ],
    panCard: {
      type: String,
      default: "",
    },
    wallet_balance: {
      type: Number,
      default: 0,
    },
    account_holder_name: {
      type: String,
      default: "",
    },
    account_name: {
      type: String,
      default: "",
    },
    account_type: {
      type: String,
      default: "",
    },
    account_number: {
      type: String,
      default: "",
    },
    IFSC_code: {
      type: String,
      default: "",
    },
    youtubeLink: {
      type: String,
      default: "",
    },
    short_bio: {
      type: String,
      default: "",
    },
    long_bio: {
      type: String,
      default: "",
    },
    astrologers_status: {
      type: String,
      default: "",
    },
    chat_status: {
      type: String, // offline, online, busy
      default: "Offline",
    },
    call_status: {
      type: String, // offline, online, busy
      default: "Offline",
    },
    aadharNumber: {
      type: String,
      default: "",
    },
    follower_count: {
      type: String,
      default: 0,
    },
    enquiry: {
      type: Boolean,
      default: true,
    },
    device_id: {
      type: String,
      default: "",
    },
    live_notification: {
      type: Boolean,
      default: true,
    },
    chat_notification: {
      type: Boolean,
      default: true,
    },
    call_notification: {
      type: Boolean,
      default: true,
    },
    total_minutes: {
      type: Number,
      default: 0,
    },
    refreshToken: {
      type: String
    }
  },
  { collection: "Astrologer", timestamps: true }
);


astrologerSchema.pre('find', function () {
  this.where({ isDeleted: { $ne: true } });
});


astrologerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

astrologerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

astrologerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      astrologerName: this.astrologerName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

astrologerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}



astrologerSchema.plugin(mongoosePaginate);

const Astrologer = mongoose.model("Astrologer", astrologerSchema);

export default Astrologer;
