import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
type jobCardProps = {avlink:string; avName:string}
  
  export function JobCard({avlink,avName}:jobCardProps){
    return (
        <Card>
            <div className="flex items-center ml-3">
                <Avatar>
                    <AvatarImage src={avlink} />
                    <AvatarFallback>{avName}</AvatarFallback>
                </Avatar>
                <CardHeader>
                    <CardTitle>Job Title</CardTitle>
                    <CardDescription>Job Description</CardDescription>
                </CardHeader>
            </div>
            <CardContent>
                <p>Job Content</p>
            </CardContent>
        </Card>

    )
  }