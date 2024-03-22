'use server'

import { Document } from "mongoose"
import User from "./database/models/User"
import { connectToDatabase } from "./database/mongoose"

export async function createUser(user: any){
    try{
        await connectToDatabase()
        const newUser: Document = await User.create(user)
        console.log('newUser ', newUser)

    }catch(err: unknown){
        if(err instanceof Error){
            console.log(err.message)
        }
    }
}