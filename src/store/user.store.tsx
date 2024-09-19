import { create } from "zustand";

type User = {
    clerkId: string,
    email: string,
    firstName?: string,
    lastName?: string,
    image: string,
    lastWorkout?: Date,
    stats?: object,
    username: string,
    _id: string
}

type UserStore = {
    user: User | null,
    setUser: (user: User) => void
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set({user})
}))

export default useUserStore