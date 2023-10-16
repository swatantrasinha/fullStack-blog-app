import prisma from '@/prisma'
import { NextResponse } from "next/server";
import { main } from "../route";

export const GET= async (req:Request, res:NextResponse) => {
    console.log('GET => fetch a blog by its id');
    
    try {
        const id= req.url.split("/blog/")[1];
        await main()
        const post= await prisma.post.findFirst({where: {id}})
        console.log('post fetched from DB : ', post);
        
        if(!post) {
            console.log('post not fetched from DB : show error !!!');
            return NextResponse.json({message: 'Not found'}, {status: 404})    
        }
        console.log('post fetched from DB : success !!!');
        return NextResponse.json({message: 'Success', post}, {status: 200})    
    } catch (err) {
        console.log('catch block - some error !!!');
        return NextResponse.json({message: 'Error', err}, {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}

export const PUT= async (req:Request, res:NextResponse) => {
    console.log('PUT => edit a blog by its id');
    
    try {
        const id= req.url.split("/blog/")[1];
        const {title, description}= await req.json()
        await main()
        const post= await prisma.post.update({data: {title, description}, where: {id}})    
        return NextResponse.json({message: 'Success', post}, {status: 200})    
    } catch (err) {
        console.log('catch block - some error !!!');
        return NextResponse.json({message: 'Error', err}, {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}

export const DELETE= async (req:Request, res:NextResponse) => {
    console.log('DELETE => delete a blog by its id');
    
    try {
      const id= req.url.split("/blog/")[1];
      await main()
      const post= await prisma.post.delete({where: {id}})
      return NextResponse.json({message: 'Success', post}, {status: 200})    
    } catch (err) {
        console.log('catch block - some error !!!');
        return NextResponse.json({message: 'Error', err}, {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}