import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    const adminEmail = "anshitvam@gmail.com";

    const adminExists = await User.findOne({ where: { email: adminEmail } });

    if (!adminExists) {
      await User.create({
        name: "Anshitvam (Admin)",
        email: adminEmail,
        password: "mishra@n@",
        role: "Admin",
      });
      console.log("✅ Custom Admin User Created Successfully!");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
