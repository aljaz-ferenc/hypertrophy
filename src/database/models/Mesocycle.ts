import mongoose from 'mongoose'

const mesocycleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Mesocycle title is required']
    },
    duration: {
        type: Number,
        required: [true, 'Mesocycle duration is required']
    },
    units: {
        type: String,
        enum: ['kg', 'lb']
    },
    workouts:{
        type: Array
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'Mesocycle user required']
    }
})

const Mesocycle = mongoose.models.Mesocycle || mongoose.model('Mesocycle', mesocycleSchema)
export default Mesocycle