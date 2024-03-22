'use server'

import { Document } from "mongoose"
import User from "./database/models/User"
import { connectToDatabase } from "./database/mongoose"

export async function createUser(user: any){
    try{
        await connectToDatabase()
        const newUser: Document = await User.create(user)
        console.log('newUser: ', newUser)

    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}

export async function deleteUser(clerkId: string){
    try{
        await connectToDatabase()
        const deletedUser = await User.findOneAndDelete({clerkId})
        console.log('deletedUser: ', deleteUser)

    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}

export async function updateUser(user: any){
    try{
        await connectToDatabase()
        const updatedUser = await User.findOneAndUpdate({clerkId: user.clerkId}, user)
        console.log('updatedUser: ', updatedUser)
    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}