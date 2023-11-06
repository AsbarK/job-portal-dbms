import { NextRequest, NextResponse } from "next/server";
import db from '@/db/dbConnection'
export async function GET(request:NextRequest) {
    try {
        const empId = request.cookies.get('empId')?.value
        const q = 'SELECT * FROM Employee WHERE empId=?';

        try {
            const result:any = await Promise.all([
                new Promise((resolve,reject)=>{
                    db.query(q, [empId],(err,data)=>{
                        if(err) reject(err)
                        else{
                            resolve(data)
                        }
                    })
                })
            ])
            if (result[0][0].empId) {
                const empId = result[0][0].empId;
                console.log('Employee found with ID:', empId);
                return NextResponse.json({ msg: "Employee found successfully", result:result[0][0] });
            } else {
                console.log('Employee not found');
                return NextResponse.json({ msg: "Employee not found" }, { status: 404 });
            }
        } catch (error) {
            console.error(error);
            return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
    }
}
