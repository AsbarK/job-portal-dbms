import { NextRequest, NextResponse } from "next/server";
import db from "@/db/dbConnection";
import { uniqueId } from "@/helper/uniqueId";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const jobId = reqBody.jobId;
    const posted_employee = request.cookies.get("empId")?.value;
    console.log(jobId,posted_employee)
    let {
      jobDescription,
      jobTitle,
      startDate,
      endDate,
      salreyStart,
      salreyEnd,
    } = reqBody;

    const updateJobQuery =
      "UPDATE Job SET jobDescription=?, jobTitle=?, startDate=?, endDate=?, salreyStart=?, salreyEnd=? WHERE jobId=? and posted_employee=?";

    // Run the update query
    const updateJobResult = await new Promise((resolve, reject) => {
      db.query(
        updateJobQuery,
        [jobDescription, jobTitle, startDate, endDate, salreyStart, salreyEnd, jobId,posted_employee],
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });

    return NextResponse.json(
      { msg: "Job Updated Successfully", data: JSON.stringify(updateJobResult) },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Database error occurred" }, { status: 500 });
  }
}
