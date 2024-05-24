import mongoose from "mongoose";

const AstrologerRequestsSchema = mongoose.Schema(
  {
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
    },
    chat_price: {
      type: String,
      default: "0", // Default value should be a string since the field type is String
    },
    call_price: {
      type: String,
      default: "0", // Default value should be a string since the field type is String
    },
    startTime: {
      type: Date,
      default: Date.now, // Default value should be a function returning current date
    },
    endTime: {
      type: Date,
      default: Date.now, // Default value should be a function returning current date
    },
    preferredDays: [
      {
        type: String,
        default: "", // Default value should be an empty string
      },
    ],
  },
  { collection: "AstrologerRequests", timestamps: true }
);

export default mongoose.model("AstrologerRequests", AstrologerRequestsSchema);
