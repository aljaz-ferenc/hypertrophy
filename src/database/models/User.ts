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
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            units: {
                type: String,
                required: true
            }
        },
        height: {
            value: {
                type: Number,
                required: true
            },
            units: {
                type: String,
                required: true
            }
        },
        bmr: {
            type: Number,
        },
        dob: {
            type: Date
        }
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User