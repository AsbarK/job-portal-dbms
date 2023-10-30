import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function POST(request:NextRequest){
    try {
        const reqHeader = request.headers
        let userId = reqHeader.get('userId')
        const {jobId,user_resume} = await request.json()
        const registrationId = new Date().getTime()
        const q = "INSERT INTO Registration(registrationId,jobId,userId,user_resume) VALUES(?,?,?,?)"
        const data:any = await Promise.all([
        new Promise((resolve,reject)=>{
            db.query(q,[registrationId,jobId,userId,user_resume],(err,data)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        })
    ])
    return NextResponse.json({msg:"Job registered, Succefully",data:data[0][0]},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}