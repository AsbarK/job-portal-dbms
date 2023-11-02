import {NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function GET(){
    try {
        const q = "SELECT JOB.*,country,state,jobTagName FROM JOB INNER JOIN (SELECT jobTag.jobId,state,country,jobTagName FROM jobTag INNER JOIN jobLocation ON jobTag.jobId=jobLocation.jobId) AS mergeTable ON JOB.jobId=mergeTable.jobId WHERE JOB.validJob = 1"
        const data:any = await Promise.all([
            new Promise((resolve,reject)=>{
                db.query(q,(err,data)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(data)
                    }
                })
            })
        ])
        return NextResponse.json({msg:"Job retrieved Successfully",data:(data[0])},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}