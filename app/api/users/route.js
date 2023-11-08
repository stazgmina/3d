import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const POST = async req => {
    const {mode, email, password, nickname, color} = await req.json()
    if(mode === "register"){
        const data = await prisma.user.create({
            data: {
                email: email,
                password: password,
                nickname: nickname,
                settings: {
                    create: {
                        color: color,
                    }
                }
            }
        })
        return NextResponse.json({data})
    }
    if(mode === "login"){
        const data = await prisma.user.findUnique({
            where: {
                email: email,
                password: password
            }
        })
        const data2 = await prisma.userSettings.findUnique({
            where: {
                userId: data.id
            }
        })
        return NextResponse.json({data,data2})
    }
}