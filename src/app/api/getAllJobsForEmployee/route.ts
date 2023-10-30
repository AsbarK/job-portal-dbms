import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function GET(request:NextRequest){
    try {
        const reqHeader = request.headers
        let empId = reqHeader.get('empId')
        const q = "SELECT jobType,jobDescription,jobTitle,startDate,endDate FROM Job WHERE Job.posted_employee=?"
        const data:any = await Promise.all([
        new Promise((resolve,reject)=>{
            db.query(q,[empId],(err,data)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        })
    ])
    if(!data[0][0]){
        return NextResponse.json({msg:"No Jobs Available for Employee"},{status: 404})
    }
    return NextResponse.json({msg:"Job's for the given Employee are",data:data[0][0]},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}