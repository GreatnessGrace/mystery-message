import 'next-auth'
import { DefaultSession } from 'next-auth'


declare module 'next-auth' {
    interface User{
        _id?: string,
        isVerified?: boolean,
        isAcceptyingMessages?: boolean,
        username?: string,
    }

    interface Session {
        user: {
        _id?: string,
        isVerified?: boolean,
        isAcceptyingMessages?: boolean,
        username?: string,
        } & DefaultSession['user']
    }
}


// Alternative method to change the interface
declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string,
        isVerified?: boolean,
        isAcceptyingMessages?: boolean,
        username?: string,
    }
}