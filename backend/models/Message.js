import mongoose from "mongoose";

export const interestTypes = [
  "General Message",
  "Volunteer",
  "Donation Interest",
  "Partnership",
  "Internship Query"
];

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    interestType: {
      type: String,
      enum: interestTypes,
      default: "General Message"
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"]
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "important"],
      default: "new"
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
