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
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User