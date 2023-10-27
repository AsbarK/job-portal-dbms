import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function DELETE(request:NextRequest){
    try {
        const reqBody = await request.json()
        let {jobId} = reqBody
        if(!jobId){
            return NextResponse.json({msg:"No jobId in body"},{ status: 404 })
        }
        const q = "DELETE FROM Job WHERE Job.jobId=?"
        const data:any = await Promise.all([
        new Promise((resolve,reject)=>{
            db.query(q,[jobId],(err,data)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        })
    ])

    return NextResponse.json({msg:`Deleted Job with id ${jobId}`,data:data[0][0]},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}