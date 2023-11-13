import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'
import * as zod from 'zod'

const prisma = new PrismaClient()

const loginSchema = zod.object({
    email: zod.string().min(1, 'Email is required').email('Invalid email address'),
    password: zod.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters').regex(/[A-Z]/, 'Password requires one uppercase letter'),
})

const registerSchema = loginSchema.extend({
    nickname: zod.string().min(1, 'Nickname is required').max(20, 'Nickname cannot be longer than 20 characters'),
    color: zod.string()
})


export const POST = async req => {
    const {mode, ...body} = await req.json()
    if(mode === "register"){
        try{
            registerSchema.parse(body)

            const existingUser = await prisma.user.findFirst({where: {OR: [{email: body.email}, {nickname: body.nickname}]}})
            if(existingUser) return NextResponse.json({message: 'User with this email or nickname already exists'}, {status: 409})

            const hash = await bcrypt.hash(body.password, 12)
            const newUser = await prisma.user.create({
                data:{
                    email: body.email,
                    password: hash,
                    nickname: body.nickname,
                    settings: {
                        create: {
                            color: body.color
                        }
                    }
                },
                select: {id: true, email: true, nickname: true, settings:true}
            })

            return NextResponse.json({newUser},{status: 200})
        }catch(error){
            const errors = getValErrMsg(error)
            return NextResponse.json({errors}, {status: 409})
        }
    }
    if(mode === "login"){
        try{
            loginSchema.parse(body)

            const existingUser = await prisma.user.findFirst({where: {email: body.email}, include: {settings: true} }).catch(err=>console.log(err))
            if(!existingUser) return NextResponse.json({message: 'User not found'}, {status: 409})

            const passwordMatch = await bcrypt.compare(body.password, existingUser.password)
            if(!passwordMatch) return NextResponse.json({message: 'Incorrect password'}, {status: 409})

            const {password, ...rest} = existingUser
            return NextResponse.json({rest},{status: 200})
        }catch(error){
            const errors = getValErrMsg(error)
            return NextResponse.json({errors}, {status: 409})
        }
    }
}

const getValErrMsg = error => {
    if(error.errors && error.errors.length > 0){
        const errorMessages = {email: [], password: [], nickname: [], color: []}

        error.errors.forEach(error => {
            const path = error.path.join('.')
            if(path.includes('email')) errorMessages.email.push(error.message)
            else if(path.includes('password')) errorMessages.password.push(error.message)
            else if(path.includes('nickname')) errorMessages.nickname.push(error.message)
            else if(path.includes('color')) errorMessages.color.push(error.message)
        })

        return errorMessages
    }
}
