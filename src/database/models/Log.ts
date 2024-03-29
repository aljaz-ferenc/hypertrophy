import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
    mesoTitle: {
        type: String,
    },
    mesoId: {
       type:  mongoose.SchemaTypes.ObjectId,
        ref: 'Mesocycle'
    },
    duration: {
        type: Number,
    },
    weeks: {
        type: Array
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
})

const Log = mongoose.models.Log || mongoose.model('Log', logSchema)
export default Log