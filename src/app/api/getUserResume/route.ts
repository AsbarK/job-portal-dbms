import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function GET(request:NextRequest){
    try {
        const cockieStore = request.cookies
        let userId = cockieStore.get('userId')?.value
        const q = "SELECT * FROM UserResume WHERE userId=?"
        const data:any = await Promise.all([
        new Promise((resolve,reject)=>{
            db.query(q,[parseInt(userId!)],(err,data)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        })
    ])
    console.log(data[0])
    return NextResponse.json({msg:"User Resumes are",data:data[0]},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}