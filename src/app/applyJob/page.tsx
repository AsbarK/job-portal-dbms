"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"
import { useEffect,useState } from "react"
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation"



const FormSchema = z.object({
  resume: z.object({
    resumeId: z.number(),
    userId: z.number(),
    resumeName: z.string(),
  }),
})

export default function ResumeApplyForm({jobId}:any) {
  const router = useRouter();
  const [resumeNames,setResumeNames] = useState<[{resumeId:number;userId:number;resumeName:string}]>([{resumeId: 0,userId:0,resumeName:''}])

  useEffect(()=>{
    axios.get('http://localhost:3000/api/getUserResume').then((data)=>(setResumeNames(data.data.data)))
  },[])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios.post('http://localhost:3000/api/registerJob',{jobId:parseInt(jobId),user_resume:data.resume.resumeId}).then((data)=>{toast.success('Successfull');router.push('/allJobs');
  }).catch((error) => {
    toast.error("Error")
    console.error(error);
  })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Resume Name</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? resumeNames.find(
                            (resume) => resume.resumeId === field.value.resumeId
                          )?.resumeName
                        : "Select resume"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search resume..." />
                    <CommandEmpty>No resume found.</CommandEmpty>
                    <CommandGroup>
                      {resumeNames.map((resume) => (
                        <CommandItem
                          value={resume.resumeName}
                          key={resume.resumeId}
                          onSelect={() => {
                            form.setValue("resume", resume)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              resume.resumeId === field.value?.resumeId
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {resume.resumeName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
