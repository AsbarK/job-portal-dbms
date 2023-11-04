import { NextRequest, NextResponse } from "next/server";
import db from '@/db/dbConnection'
export async function GET(request:NextRequest) {
    try {
        const userId = request.cookies.get('userId')?.value
        const q = 'SELECT * FROM User WHERE userId=?';

        try {
            const result:any = await Promise.all([
                new Promise((resolve,reject)=>{
                    db.query(q, [userId],(err,data)=>{
                        if(err) reject(err)
                        else{
                            resolve(data)
                        }
                    })
                })
            ])
            if (result[0][0].userId) {
                const userId = result[0][0].userId;
                console.log('User found with ID:', userId);
                return NextResponse.json({ msg: "User found successfully", result:result[0][0] });
            } else {
                console.log('User not found');
                return NextResponse.json({ msg: "User not found" }, { status: 404 });
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
