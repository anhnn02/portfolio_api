import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 1
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        minLength: 1
    }
}, { timestamps: true })
export default mongoose.model("Category", categorySchema)