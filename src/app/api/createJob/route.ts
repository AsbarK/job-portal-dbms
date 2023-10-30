import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const jobId = new Date().getTime()
        let {posted_employee,jobType,jobDescription,jobTitle,startDate,endDate} = reqBody
        if(typeof(posted_employee) === "string"){
            posted_employee = parseInt(posted_employee)
        }
        const q = "INSERT INTO Job(jobId,posted_employee,jobType,jobDescription,jobTitle,startDate,endDate) VALUES(?,?,?,?,?,?,?)"
        const data:any = await Promise.all([
            new Promise((resolve,reject)=>{
                db.query(q,[jobId,posted_employee,jobType,jobDescription,jobTitle,startDate,endDate],(err,data)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(data)
                    }
                })
            })
        ])
        return NextResponse.json({msg:"Job Posted Successfully",data:JSON.stringify(data)},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}