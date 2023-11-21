import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { faTrashAlt,faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import ResumeApplyForm from "@/app/applyJob/page"
import axios from "axios";
import toast from 'react-hot-toast';
import UpdateJobForm from "@/components/updateJob";

type jobCardProps = {avlink:string; avName:string;jobTags:Array<string>;jobTitle:string;jobDiscription:string;country:string;states:string;saleryStart:string;saleryEnd:string;jobId:string;delete?:boolean;edit?:boolean}
  
  export function JobCard({avlink,avName,jobTitle,jobTags,jobDiscription,country,states,saleryStart,saleryEnd,jobId, delete: showDelete = false,edit: showEditButton = false}:jobCardProps){
    return (
        <Card>
            <div className="flex items-center ml-3">
                <div className="m-2">
                <Avatar>
                    <AvatarImage className="h-20 w-20" src={avlink} />
                    <AvatarFallback className="h-20 w-20 rounded-2xl text-4xl font-bold">{avName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                </div>
                <CardHeader>
                    <CardTitle>{jobTitle}</CardTitle>
                    <CardDescription>{jobDiscription}</CardDescription>
                </CardHeader>
                {showEditButton && <Dialog>
                        <DialogTrigger><Button variant="outline" className="p-5 mr-3"><FontAwesomeIcon icon={faPencilAlt} /></Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update Job Details</DialogTitle>
                                <DialogDescription>
                                    <UpdateJobForm jobId={jobId}/>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>}
            </div>
            <CardContent>
                <div>
                    <div className="flex gap-1 -ml-1.5">
                        {jobTags?.map((job)=>(
                            <Badge key={job[0]} className="cursor-pointer">{job}</Badge>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        {country} ,{states}
                    </div>
                    <div className="flex gap-1">
                        Rs{saleryStart}-Rs{saleryEnd}
                    </div>
                    <div className="flex items-center justify-between m-3">
                    {showDelete && <Button className="bg-red-400 hover:bg-red-600 hover:p-5" onClick={() => (console.log(`Deleting job ${jobId}`),axios.delete(`${process.env.NEXT_PUBLIC_URL_LINK}/api/deleteJob`,{headers:{jobId}})).then(()=>(toast.success('Deleted Sucessfully')))}><FontAwesomeIcon icon={faTrashAlt} /></Button>}
                    {!showDelete &&<Dialog>
                        <DialogTrigger><Button variant="outline" className="p-5">Apply</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Please Provide Your Resume!</DialogTitle>
                                <DialogDescription>
                                    <ResumeApplyForm jobId={jobId}/>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>}

                    </div>
                </div>
            </CardContent>
        </Card>

    )
  }