import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully!");

    const users = await User.find({}, { name: 1, email: 1, isAdmin: 1, createdAt: 1 });
    console.log("Users in Database:");
    console.log(JSON.stringify(users, null, 2));

    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (error) {
    console.error("Error running diagnostics:", error);
  }
}

run();
