import { Follow, User } from "@prisma/client"

export interface NewUser extends User {
    followers: Follow[]
    following: Follow[]
}

export interface CurrentUser extends NewUser {
    _count: {
        posts: number
    }
}