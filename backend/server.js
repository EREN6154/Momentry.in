import dotenv from "dotenv";
dotenv.config(); // Load environment variables FIRST

import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import User from "./models/User.js";
import Package from "./models/Package.js";
import bcrypt from "bcryptjs";

// Routes
import authRoutes from "./routes/authRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
await connectDB();

// Initialize admin and sample packages
const initializeData = async () => {
  try {
    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        salt,
      );

      const admin = new User({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        isAdmin: true,
      });
      await admin.save();
      console.log("✅ Admin user created");
    }

    // Create sample packages - only if database is empty
    const packagesCount = await Package.countDocuments();
    if (packagesCount === 0) {
      const samplePackages = [
        {
          title: "Triund Trek - Mountain Paradise",
          destination: "Himachal Pradesh",
          price: 6999,
          duration: 2,
          maxParticipants: 20,
          description:
            "Experience the magical sunrise at Triund with breathtaking Himalayan views and pristine nature.",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          highlights: [
            "Mountain Trek",
            "Sunrise View",
            "Local Tea",
            "Photography",
          ],
          isActive: true,
        },
        {
          title: "Kasol - Backpackers' Haven",
          destination: "Himachal Pradesh",
          price: 5999,
          duration: 3,
          maxParticipants: 25,
          description:
            "Discover the bohemian vibes of Kasol with scenic riverside trails and vibrant culture.",
          image:
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop",
          highlights: ["River Trails", "Local Cafes", "Adventure", "Culture"],
          isActive: true,
        },
        {
          title: "Tungnath - Sacred Heights",
          destination: "Uttarakhand",
          price: 8999,
          duration: 3,
          maxParticipants: 15,
          description:
            "Trek to the world's highest Shiva temple at Tungnath with pristine alpine meadows.",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          highlights: ["Temple Trek", "Alpine Meadows", "Spiritual", "Adventure"],
          isActive: true,
        },
        {
          title: "Kedarnath Pilgrimage",
          destination: "Uttarakhand",
          price: 12999,
          duration: 4,
          maxParticipants: 20,
          description:
            "Sacred journey to Kedarnath with stunning mountain views and spiritual experiences.",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          highlights: [
            "Sacred Temple",
            "Mandakini River",
            "Mountain Views",
            "Spiritual",
          ],
          isActive: true,
        },
        {
          title: "Shimla - Hill Station Classic",
          destination: "Himachal Pradesh",
          price: 7999,
          duration: 3,
          maxParticipants: 30,
          description:
            "Explore the charming colonial hill station of Shimla with mall roads and scenic landscapes.",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          highlights: [
            "Mall Road",
            "Historic Sites",
            "Scenic Views",
            "Toy Train",
          ],
          isActive: true,
        },
        {
          title: "Spiti Valley - Hidden Gem",
          destination: "Himachal Pradesh",
          price: 16999,
          duration: 6,
          maxParticipants: 12,
          description:
            "Journey through the mystical Spiti Valley with ancient monasteries and surreal landscapes.",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
          highlights: [
            "Monasteries",
            "Scenic Drives",
            "Local Culture",
            "Adventure",
          ],
          isActive: true,
        },
        {
          title: "Manali - Adventure Capital",
          destination: "Himachal Pradesh",
          price: 9999,
          duration: 5,
          maxParticipants: 18,
          description:
            "Adventure activities in Manali including paragliding, river rafting, and trekking.",
          image:
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop",
          highlights: [
            "Paragliding",
            "River Rafting",
            "Trekking",
            "Scenic Views",
          ],
          isActive: true,
        },
        {
          title: "Jaipur - The Pink City",
          destination: "Rajasthan",
          price: 5999,
          duration: 3,
          maxParticipants: 30,
          description:
            "Explore the iconic pink city of Jaipur with magnificent forts and palaces.",
          image:
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop",
          highlights: ["City Palace", "Hawa Mahal", "Local Markets", "Heritage"],
          isActive: true,
        },
        {
          title: "Udaipur - Venice of India",
          destination: "Rajasthan",
          price: 11999,
          duration: 4,
          maxParticipants: 25,
          description:
            "Experience the romantic beauty of Udaipur with palace lakes and royal architecture.",
          image:
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=300&fit=crop",
          highlights: [
            "City Palace",
            "Lake Pichola",
            "Boat Cruise",
            "Royal Experience",
          ],
          isActive: true,
        },
        {
          title: "Goa Beach Paradise",
          destination: "Goa",
          price: 8999,
          duration: 5,
          maxParticipants: 20,
          description:
            "Experience the vibrant culture of Goa with beautiful beaches, water sports, and amazing nightlife.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
          highlights: [
            "Beach Resort",
            "Water Sports",
            "Nightlife",
            "Local Cuisine",
          ],
          isActive: true,
        },
      ];

      await Package.insertMany(samplePackages);
      console.log("✅ Sample packages created");
    } else {
      console.log("✅ Packages already exist in database, skipping sample creation");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

await initializeData();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
