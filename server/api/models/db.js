import mongoose from "mongoose";
export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.NEON_DB_URI);
    console.log("db connected");
  } catch (err) {
    console.log(err);
    console.log("db not connected");
  }
};
