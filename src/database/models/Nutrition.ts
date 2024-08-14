import mongoose from 'mongoose'

const nutritionSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
    },
    nutrition: {
        type: Object
    }
})

export default mongoose.models.Nutrition || mongoose.model('Nutrition', nutritionSchema)