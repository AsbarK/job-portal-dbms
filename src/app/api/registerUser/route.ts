import { NextRequest, NextResponse } from "next/server";
import db from '@/db/dbConnection';
import { uniqueId } from "@/helper/uniqueId";
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { firstName, lastName, password, mobile, email, city } = reqBody;
        const timestamp = uniqueId();

        const q = 'INSERT INTO User (userId, firstName, lastName, mobile, email, city) VALUES (?, ?, ?, ?, ?, ?)';
        const q2 = 'INSERT INTO Login (userId, login_username, user_password) VALUES (?, ?, ?)';

        await Promise.all([
            new Promise((resolve, reject) => {
                db.query(q, [timestamp, firstName, lastName, mobile, email, city], (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            }),
            new Promise((resolve, reject) => {
                db.query(q2, [timestamp, email, password], (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
        ]);
        return NextResponse.json({ msg: "User created successfully",firstName, lastName, mobile, email, city,id:timestamp});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Something went wrong (try With different mobile number)" }, { status: 500 });
    }
}
