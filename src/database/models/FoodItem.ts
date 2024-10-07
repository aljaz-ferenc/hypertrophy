import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nutrition: {
        calories: Number,
        protein: Number,
        fat: Number,
        carbs: Number
    },
    type: {
        enum: ['item', 'meal'],
        required: true
    }
})

const FoodItem = mongoose.models.FoodItem || mongoose.model('FoodItem', foodItemSchema)
export default FoodItem