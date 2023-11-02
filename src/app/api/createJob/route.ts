import { NextRequest,NextResponse } from "next/server";
import db from "@/db/dbConnection";
import { uniqueId } from "@/helper/uniqueId";

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const jobId = uniqueId()
        let {posted_employee,jobDescription,jobTitle,startDate,endDate,salreyStart,salreyEnd,jobTags,jobLocations} = reqBody
        console.log(posted_employee,jobDescription,jobTitle,startDate,endDate,salreyStart,salreyEnd,jobTags,jobLocations)
        if(typeof(posted_employee) === "string"){
            posted_employee = parseInt(posted_employee)
        }
        const q = "INSERT INTO Job(jobId,posted_employee,jobDescription,jobTitle,startDate,endDate,salreyStart,salreyEnd) VALUES(?,?,?,?,?,?,?,?)"
        const q1 = 'INSERT INTO jobLocation (jobId, country,state,locId) VALUES (?, ?,?,?)'
        const q2 = 'INSERT INTO jobTag (jobId,jobTagName,tagId) VALUES (?, ?,?)'
        const data:any = await new Promise((resolve,reject)=>{
            db.query(q,[jobId,posted_employee,jobDescription,jobTitle,startDate,endDate,salreyStart,salreyEnd],(err,data)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(data)
                }
            })
        }).then(async()=>{
                await Promise.all([
                jobLocations.map((loc:[string,string])=>{
                    new Promise((resolve,reject)=>{
                        db.query(q1,[jobId,loc[0],loc[1],uniqueId()],(err,data)=>{
                            if(err){
                                reject(err)
                            }
                            else{
                                resolve(data)
                            }
                        })
                    })
                }),
                jobTags.map((tag:string)=>{
                    new Promise((resolve,reject)=>{
                        db.query(q2,[jobId,tag,uniqueId()],(err,data)=>{
                            if(err){
                                reject(err)
                            }
                            else{
                                resolve(data)
                            }
                        })
                    })
                })
            ])
        })
        return NextResponse.json({msg:"Job Posted Successfully",data:JSON.stringify(data)},{ status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}