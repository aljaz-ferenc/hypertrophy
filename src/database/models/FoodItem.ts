import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    portions: {
        type: Array
    }
})

const FoodItem = mongoose.models.FoodItem || mongoose.model('FoodItem', FoodItemSchema)
export default FoodItem