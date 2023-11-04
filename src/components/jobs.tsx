
import { JobCard } from "@/components/jobCard";
type JobType = {jobTagNames:Array<string>;jobTitle:string;jobDiscription:string;country:string;state:string;salreyStart:string;salreyEnd:string;jobId:string}
export default function Jobs(props:{jobs:JobType[]}) {

    return (
        <>
            {props.jobs.map((j:JobType,index) => (
                <JobCard
                    avName={j.jobTitle}
                    avlink=""
                    jobDiscription={j.jobDiscription}
                    country={j.country}
                    states={j.state}
                    jobTags={j.jobTagNames}
                    jobTitle={j.jobTitle}
                    saleryEnd={String(j.salreyEnd)}
                    saleryStart={String(j.salreyStart)}
                    key={index}
                />
            ))}
        </>
    );
}
