import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type jobCardProps = {avlink:string; avName:string;jobTags:Array<string>;jobTitle:string;jobDiscription:string;country:string;states:string;saleryStart:string;saleryEnd:string;}
  
  export function JobCard({avlink,avName,jobTitle,jobTags,jobDiscription,country,states,saleryStart,saleryEnd}:jobCardProps){
    return (
        <Card>
            <div className="flex items-center ml-3">
                <div className="m-2">
                <Avatar>
                    <AvatarImage className="h-20 w-20" src={avlink} />
                    <AvatarFallback className="h-20 w-20 rounded-2xl text-4xl font-bold">{avName[0]}</AvatarFallback>
                </Avatar>
                </div>
                <CardHeader>
                    <CardTitle>{jobTitle}</CardTitle>
                    <CardDescription>{jobDiscription}</CardDescription>
                </CardHeader>
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
                </div>
            </CardContent>
        </Card>

    )
  }