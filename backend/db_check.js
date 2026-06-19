import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/database.js";
import Booking from "./models/Booking.js";
import Package from "./models/Package.js";
import User from "./models/User.js";

async function run() {
  console.log("Connecting to DB...");
  await connectDB();
  console.log("Connected.");

  console.time("Count Users");
  const usersCount = await User.countDocuments();
  console.timeEnd("Count Users");

  console.time("Count Packages");
  const packagesCount = await Package.countDocuments();
  console.timeEnd("Count Packages");

  console.time("Count Bookings");
  const bookingsCount = await Booking.countDocuments();
  console.timeEnd("Count Bookings");

  console.log(`Users: ${usersCount}, Packages: ${packagesCount}, Bookings: ${bookingsCount}`);

  console.time("MTD Bookings Query");
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const mtdBookings = await Booking.find({
    status: "confirmed",
    createdAt: { $gte: firstDayOfMonth }
  });
  console.timeEnd("MTD Bookings Query");

  console.time("Recent Bookings Query");
  const recentBookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("userId", "name email")
    .populate("packageId", "title destination price");
  console.timeEnd("Recent Bookings Query");

  process.exit(0);
}

run().catch(console.error);
