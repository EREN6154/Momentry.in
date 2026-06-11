import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  maxParticipants: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: String,
  highlights: [String],
  itinerary: [
    {
      day: Number,
      title: String,
      description: String,
    },
  ],
  departureDate: {
    type: Date,
  },
  bookingEndDate: {
    type: Date,
  },
  difficulty: {
    type: String,
    default: "Moderate",
  },
  leadGuide: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Package", PackageSchema);
