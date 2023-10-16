import prisma from '@/prisma';
import {NextResponse} from 'next/server'

export async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return Error('database connection unsucessful !!!!!')
    }
}
export const GET= async (req:Request, res: NextResponse) => {
    console.log('GET');
    try {
        await main();
        const posts= await prisma.post.findMany()
        return NextResponse.json({message:'Success', posts}, {status: 200})
    } catch (err) {
        return NextResponse.json({message: 'Error', err}, {status: 500})
    } finally{
        await prisma.$disconnect()
    }
};

export const POST= async (req:Request, res: NextResponse) => {
    console.log('POST');

    try {
        const {title, description}= await req.json()
        await main();
        const post= await prisma.post.create({data: {description, title}})
        return NextResponse.json({message:'Success', post}, {status: 201})
    } catch (err) {
        return NextResponse.json({message: 'Error', err}, {status: 500})
    } finally{
        await prisma.$disconnect()
    }
};