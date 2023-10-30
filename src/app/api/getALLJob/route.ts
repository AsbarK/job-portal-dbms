import {NextResponse } from "next/server";
import db from "@/db/dbConnection";

export async function GET(){
    try {
        const q = "SELECT * FROM JOB WHERE JOB.validJob = 1"
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