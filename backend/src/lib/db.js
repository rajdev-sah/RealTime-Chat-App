import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_url);
        console.log(`MongoDB connection: ${conn.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection error:", error)
    }
}