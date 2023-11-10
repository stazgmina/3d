import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'
import * as zod from 'zod'

const prisma = new PrismaClient()

const userSchema = zod.object({
    email: zod.string().min(1, 'Email is required').email('Invalid email address'),
    password: zod.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters').regex(/[A-Z]/, 'Password requires one uppercase letter'),
    nickname: zod.string().min(1, 'Nickname is required').max(20, 'Nickname cannot be longer than 20 characters'),
    color: zod.string()
})

export const POST = async req => {
    const body = await req.json()
    const {mode} = body

    if(mode === "register"){
        const { email, password, nickname, color} = userSchema.parse(body)
        // const existingUserByEmail = await prisma.user.findUnique({where: { email: email}})
        // if(existingUserByEmail) return NextResponse.json({ user: null, message: "User with this e-mail already exists"}, { status: 409 })

        // const existingUserByNickname = await prisma.user.findUnique({where: { nickname: nickname}})
        // if(existingUserByNickname) return NextResponse.json({ user: null, message: "User with this nickname already exists"}, { status: 409 })

        const hash = await bcrypt.hash(password, 12)
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hash,
                nickname: nickname,
                settings: {
                    create: {
                        color: color,
                    }
                }
            }
        })
        const { password: newUserPassword, ...rest } = newUser
        return NextResponse.json({ user: rest, message: "User created!"},{ status: 201 })
    }
    if(mode === "login"){

        // CHUJ KUYRWA

        return NextResponse.json({id: data.id, email: data.email, nickname: data.nickname, color: data.settings.color })
    }
}