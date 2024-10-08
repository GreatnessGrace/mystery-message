import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({
            username: decodedUsername
        })

        if (!user) {
            return Response.json({
                success: false,
                message: "Username not found"
            },
                {
                    status: 500
                })

        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json({
                success: true,
                message: "Account Verified successfully"
            },
                {
                    status: 200
                })

        }
        else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Code Expired, please sign up again to get a new code"
            },
                {
                    status: 400
                })

        }
        else {
            return Response.json({
                success: false,
                message: "Code is incorrect"
            },
                {
                    status: 400
                })

        }
    } catch (error) {
        console.log("Error verifying user", error)
        return Response.json({
            success: false,
            message: "Error checking username"
        },
            {
                status: 500
            })
    }
}