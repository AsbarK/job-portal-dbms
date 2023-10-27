import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function GET(request:NextRequest){
    try {
        const reqHeader = request.headers
        let jobId = reqHeader.get('jobid')
        const q = "SELECT jobType,jobDescription,jobTitle,startDate,endDate,empName,emp_email,emp_mobile FROM Job INNER JOIN Employee ON Job.posted_employee = Employee.empId WHERE Job.jobId=?"
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
    if(!data[0][0]){
        return NextResponse.json({msg:"Job Not Present"},{status: 404})
    }
    return NextResponse.json({msg:"Job Posted Successfully",data:data[0][0]},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}