import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName: { type: String, require: true },
    description: { type: String, default: "" },
    locationFound: { type: String, require: true },
    dateFound: { type: Date, require: true },
    claimed: { type: Boolean, dafault: false }
}, { timestamps: true });

const Item = new mongoose.model("Item", itemSchema)
 
export default Item