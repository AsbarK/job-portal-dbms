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
        if(data[0]){
            const res = data[0]
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