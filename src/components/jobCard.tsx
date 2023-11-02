import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type jobCardProps = {avlink:string; avName:string;jobTags:Array<string>;jobTitle:string;jobDiscription:string;jobLocation:[string,string];saleryStart:string;saleryEnd:string;}
  
  export function JobCard({avlink,avName,jobTitle,jobTags,jobDiscription,jobLocation,saleryStart,saleryEnd}:jobCardProps){
    return (
        <Card>
            <div className="flex items-center ml-3">
                <Avatar>
                    <AvatarImage src={avlink} />
                    <AvatarFallback>{avName}</AvatarFallback>
                </Avatar>
                <CardHeader>
                    <CardTitle>{jobTitle}</CardTitle>
                    <CardDescription>{jobDiscription}</CardDescription>
                </CardHeader>
            </div>
            <CardContent>
                <div>
                <div className="flex gap-1">
                    {jobTags.map((tag: string) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>
                    <div className="flex gap-1">
                        {jobLocation[0]} ,{jobLocation[1]}
                    </div>
                    <div className="flex gap-1">
                        Rs{saleryStart}-Rs{saleryEnd}
                    </div>
                </div>
            </CardContent>
        </Card>

    )
  }