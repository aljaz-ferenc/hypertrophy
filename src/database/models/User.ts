import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        unique: true,
        required: [true, 'clerkId required']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'email required']
    },
    username: {
        type: String,
        required: [true, 'username required']
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String,
    },
    activeMesocycle: {
        type: Boolean
    },
    lastWorkout: {
        type: Date
    },
    stats: {
        weight: {
            value: {
                type: Number,

            },
            date: {
                type: Date,

            },
            units: {
                type: String,

            }
        },
        height: {
            value: {
                type: Number,

            },
            units: {
                type: String,

            }
        },
        bmr: {
            type: Number,
        },
        dob: {
            type: Date
        },
        bodyParts: {
            type: Map, 
            of: [{ date: Date, value: Number }] 
        }
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User