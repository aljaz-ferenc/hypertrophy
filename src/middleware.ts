import {authMiddleware, redirectToSignIn} from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
    publicRoutes: ['/', '/sign-up', '/sign-in', '/api/webhooks/clerk', '/api/createUser', '/api/users/:userId', '/api/mesocycles/:userId']
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}