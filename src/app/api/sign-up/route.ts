import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        }) 
        
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {
                status: 400
            })
        }

       const existingUserByEmail = await UserModel.findOne({email})

       if (existingUserByEmail) {
        true
       }
       else {
        await bcrypt.hash(password, 10)
       const expiryDate = new Date();
       expiryDate.setHours(expiryDate.getHours() + 1)
    }
    } catch (error) {
        console.error('error registering user', error)
        return Response.json({
            success: false,
            message: "Error registering user"
        },
    {
        status: 500
    })
    }
}