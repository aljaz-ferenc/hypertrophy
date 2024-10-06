import {authMiddleware, redirectToSignIn} from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
    publicRoutes: ['/', '/sign-up', '/sign-in', '/api/webhooks/clerk', '/api/createUser', '/api/users/:userId', '/api/mesocycles/:userId', '/api/logs/:logId', '/api/nutrition/user/:userId', '/api/nutrition/:nutritionId', '/api/logs/:userId/:logId', '/api/mesocycles/:userId/active']
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}