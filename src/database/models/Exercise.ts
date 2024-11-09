import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'MuscleGroup'
    }
})

const ExerciseModel = mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema)
export default ExerciseModel