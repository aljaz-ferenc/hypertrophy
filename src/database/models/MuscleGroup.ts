import mongoose from "mongoose";

const muscleGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const MuscleGroup = mongoose.models.MuscleGroup || mongoose.model('MuscleGroup', muscleGroupSchema)
export default MuscleGroup