import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function POST(request:NextRequest){
    try {
        const reqHeader = request.headers
        let userId = reqHeader.get('userId')
        const {resumeName} = await request.json()
        const resumeId = new Date().getTime()
        const q = "INSERT INTO UserResume(resumeId,userId,resumeName) VALUES(?,?,?)"
        const data:any = await Promise.all([
        new Promise((resolve,reject)=>{
            db.query(q,[resumeId,userId,resumeName],(err,data)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        })
    ])
    return NextResponse.json({msg:"User Resume added Succefully",data:data[0][0]},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}