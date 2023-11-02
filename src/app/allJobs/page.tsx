"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { JobCard } from "@/components/jobCard";

export default function AllJobs() {
    const [job, setJob] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/getALLJob')
            .then((res) => (setJob(res.data.data)))
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, []); 

    return (
        <div className="grid gap-4 grid-cols-3">
            {job && job.map((j:{jobTagName:string;jobTitle:string;jobDiscription:string;country:string;state:string;salreyStart:string;salreyEnd:string;jobId:string}) => (
                <JobCard
                    avName={j.jobTitle}
                    avlink="https://github.com/shadcn.png"
                    jobDiscription={j.jobDiscription}
                    country={j.country}
                    states={j.state}
                    jobTags={j.jobTagName}
                    jobTitle={j.jobTitle}
                    saleryEnd={String(j.salreyEnd)}
                    saleryStart={String(j.salreyStart)}
                    key={j.jobId}
                />
            ))}
        </div>
    );
}
