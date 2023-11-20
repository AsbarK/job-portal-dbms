"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/components/searchBar";
import Jobs from "@/components/jobs";
import Link from "next/link";
import dotenv from 'dotenv'
import { useCookies } from 'next-client-cookies';
import NavBar from "@/components/navBar";
dotenv.config({path:'.env.local' })
type Job={jobTagNames:Array<string>;jobTitle:string;jobDiscription:string;country:string;state:string;salreyStart:string;salreyEnd:string;jobId:string}
export default function AllJobs() {
    const [job, setJob] = useState<Job[]>([]);
    const cookieStore = useCookies();
    const [userDetails, setUserDetails] = useState<{ firstName: string; lastName?: string; email: string }>({ firstName: "", lastName: "", email: "" });
  console.log(process.env.URL_LINK)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_URL_LINK}/api/getALLJob`)
            .then((res) => (setJob(res.data.data)))
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
            if (cookieStore.get('userId')) {
                axios.get(`${process.env.NEXT_PUBLIC_URL_LINK}/api/getUserDetails`).then((data) => (setUserDetails(data.data.result)));
              } else {
                axios.get(`${process.env.NEXT_PUBLIC_URL_LINK}/api/getEmployeeDetails`).then((data) => (setUserDetails({ firstName: data.data.result.empName, email: data.data.result.emp_email })));
              }
    }, []); 

    return (
        <>
        {/* <div className="flex justify-around items-center m-5">
        <Search/>
        <Link href={'/'} className="text-purple-500 underline">Home</Link>
        </div> */}
        <NavBar firstName={userDetails.firstName} lastName={userDetails.lastName} email={userDetails.email} />
        <div className="grid gap-4 grid-cols-3">
            {job && <Jobs jobs={job}/>}
        </div>
        </>
    );
}
