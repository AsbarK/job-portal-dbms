import { NextRequest, NextResponse } from "next/server";
import db from '@/db/dbConnection'
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {userName,password} = reqBody
        const q = 'SELECT empId FROM LoginEmployee WHERE login_username=? and employee_password=?'

        const result:any = await Promise.all([
            new Promise((resolve,reject)=>{
                db.query(q,[userName,password],(err,data)=>{
                    if(err) {reject(err)}
                    else{
                        console.log(data)
                        resolve(data)
                    }
                })
            })
        ])
        if(result[0][0].empId){
            const empId = result[0][0].empId
            return NextResponse.json({msg:"Employee login sucessfull",empId})
        }
        else{
            return NextResponse.json({msg:"Employee Does not exists"},{ status: 404 })
        }
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}