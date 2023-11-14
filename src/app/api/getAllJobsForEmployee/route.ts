import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function GET(request:NextRequest){
    try {
        const cockieStore = request.cookies
        let empId = parseInt(cockieStore.get('empId')?.value!)
        // const q = "SELECT jobType,jobDescription,jobTitle,startDate,endDate FROM Job WHERE Job.posted_employee=?"
        const q = "CALL GetJobsByEmployeeId(?);"
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
    if(data[0]){
        const res = data[0][0]
        const groupedJobs = res.reduce((groups:any, job:any) => {
            const { jobId, posted_employee, jobDescription, jobTitle, startDate, endDate, validJob, salreyStart, salreyEnd, country, state } = job;
            const key = `${jobId}-${posted_employee}-${jobDescription}-${jobTitle}-${startDate}-${endDate}-${validJob}-${salreyStart}-${salreyEnd}-${country}-${state}`;
            if (!groups[key]) {
              groups[key] = {
                jobId,
                posted_employee,
                jobDescription,
                jobTitle,
                startDate,
                endDate,
                validJob,
                salreyStart,
                salreyEnd,
                country,
                state,
                jobTagNames: []
              };
            }
            groups[key].jobTagNames.push(job.jobTagName);
            return groups;
          }, {});
            return NextResponse.json({msg:"Job retrieved Successfully",data:Object.values(groupedJobs)},{ status: 200 })
    }
    return NextResponse.json({msg:"No Jobs available"},{ status: 200 })
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}