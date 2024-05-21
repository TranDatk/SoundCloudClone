import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request :NextRequest) {
    // const sescret = request.nextUrl.searchParams.get('sescret');
    const tag = request.nextUrl.searchParams.get('tag');
    const referer = request.headers.get('referer');

    if(!referer || !referer.includes(`${process.env.NEXTAUTH_URL}`)){
        return NextResponse.json({message:'Invalid secret token'}, {status:401});
    }

    if(!tag){
        return NextResponse.json({message:'Missing tag param'}, {status:400});
    }

    revalidateTag(tag)

    return NextResponse.json({revalidated:true, now:Date.now()}, {status:200})
    
} 