'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import * as z from "zod"
import dotenv from 'dotenv'
dotenv.config({path:'.env.local' })


const resumeNameType = z.object({
    resumeName:z.string().min(2,{message:'Required atleast two charecters'})
})
export default function AddResume() {
    const [resumeName,setResumeName] = useState<z.infer<typeof resumeNameType>>()
    const handleFormSubmit = () => {
        if (resumeName?.resumeName) {
          axios.post(`${process.env.NEXT_PUBLIC_URL_LINK}/api/userResume`, { resumeName: resumeName.resumeName })
            .then((data) => {
              if (data.status === 200) {
                toast.success('Successfully added Resume');
              } else {
                console.log(data.data);
              }
            })
        } else {
          toast.error('Resume Name is required');
        }
      }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer ">Add Resume</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Resume</DialogTitle>
          <DialogDescription>
            Please add the name of Your Resume
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Resume Name
            </Label>
            <Input
              id="name"
              placeholder="Full Stack"
              className="col-span-3"
              onChange={(e)=>(setResumeName({resumeName: e.target.value}))}
              
            />
          </div>
        </div>
        <DialogFooter>
        <DialogClose >
          <Button type="submit" onClick={handleFormSubmit}>Submit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
