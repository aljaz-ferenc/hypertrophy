import mongoose from 'mongoose'

const nutritionSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
    },
    amount: {
        type: Number
    },
    itemId: {
        type: String
    },
    item: {
        type: String
    }
})

export default mongoose.models.Nutrition || mongoose.model('Nutrition', nutritionSchema)