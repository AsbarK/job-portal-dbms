import { NextRequest, NextResponse } from "next/server";
import db from '@/db/dbConnection';
import { uniqueId } from "@/helper/uniqueId";
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { employeeName, password, mobile, email } = reqBody;
        const timestamp = uniqueId();

        const q = 'INSERT INTO Employee (empId, empName, emp_mobile, emp_email) VALUES (?, ?, ?, ?)';
        const q2 = 'INSERT INTO LoginEmployee (empId, login_username, employee_password) VALUES (?, ?, ?)';

        await Promise.all([
            new Promise((resolve, reject) => {
                db.query(q, [timestamp, employeeName, mobile, email], (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(data);
                        resolve(data);
                    }
                });
            }),
            new Promise((resolve, reject) => {
                db.query(q2, [timestamp, email, password], (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(data);
                        resolve(data);
                    }
                });
            })
        ]);

        return NextResponse.json({ msg: "Employee created successfully",employeeName,id:timestamp });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Something went wrong (try with a different mobile number)" }, { status: 500 });
    }
}
