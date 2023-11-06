"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "@/components/searchBar";
import Jobs from "@/components/jobs";
import Link from "next/link";
type Job={jobTagNames:Array<string>;jobTitle:string;jobDiscription:string;country:string;state:string;salreyStart:string;salreyEnd:string;jobId:string}
export default function AllJobs() {
    const [job, setJob] = useState<Job[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/getALLJob')
            .then((res) => (setJob(res.data.data)))
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, []); 

    return (
        <>
        <div className="flex justify-around items-center">
        <Search/>
        <Link href={'/'} className="text-purple-500 underline">Home</Link>
        </div>
        <div className="grid gap-4 grid-cols-3">
            {job && <Jobs jobs={job}/>}
        </div>
        </>
    );
}
