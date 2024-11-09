import {authMiddleware, redirectToSignIn} from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
    publicRoutes: ['/', '/sign-up', '/sign-in', '/api/nutrition', '/api/webhooks/clerk', '/api/muscleGroups', '/api/exercises', '/api/createUser', '/api/users/:userId', '/api/mesocycles/:userId', '/api/logs/:logId', '/api/nutrition/user/:userId', '/api/nutrition/:nutritionId', '/api/logs/:userId/:logId', '/api/mesocycles/:userId/active', '/api/foodItems', '/api/foodItems/user/:userId']
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}