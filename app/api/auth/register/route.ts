import { NextResponse} from "next/server";
import bcrypt from "bcrypt"
import prismaClient from "@/lib/prisma"


export const POST  = async (request: Request) => {
   const body = await request.json()
   const {userName, password} = body

   if(!userName || !password) return new NextResponse("User name or password  is not valid", { status: 400})


   const passwordHash = await bcrypt.hash(password, 10)


   const user = await prismaClient.user.create({
      data: {
         email: userName,
         passwordHash
      }
   })
   return NextResponse.json(user)
}
