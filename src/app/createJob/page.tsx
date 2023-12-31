
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { useCookies } from "next-client-cookies"
import { useRouter } from "next/navigation"
import dotenv from 'dotenv'
dotenv.config({path:'.env.local' })



// Define form schema
const formSchema = z.object({
  jobDescription: z.string(),
  jobTitle: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  salreyStart: z.string().min(5,{message:"Minimum Ammount is 10,000"}),
  salreyEnd: z.string().min(5,{message:"Minimum Ammount is 10,000"}),
  jobTags: z.string(),
  country: z.string(),
  state: z.string(),
  // jobTags:z.array(z.string())
})

// Job openings input form component
export default function JobForm() {
  const cockieStore = useCookies()
  const router = useRouter();
  if(cockieStore.get('userId')){
    return(
      <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-6xl">404</h1>
        <h2 className="text-xl">Not Found</h2>
      </div>
      </>
    )
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // Form submission handler
  function onSubmit(data: z.infer<typeof formSchema>) {
    // console.log(format(data.startDate,"yyyy-MM-dd"))

    axios.post(`${process.env.NEXT_PUBLIC_URL_LINK}/api/createJob`,{
      ...data,jobTags:data.jobTags.split(','),jobLocations:[[data.country,data.state]],startDate:format(data.startDate,"yyyy-MM-dd"),endDate:format(data.endDate,"yyyy-MM-dd")
    }).then(()=>(
      toast.success('Successfully Created Job'),
      router.push('/allJobs')
    )).catch(()=>(
      toast.error('Error in Creating Job Please Try Again')
    ))
    console.log(data);
  }

  return (
    <Form {...form}>
        <div className="flex flex-col justify-center items-center h-screen">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-1/2 border border-border rounded-md p-4">
        <div className="flex items-center justify-around">
        <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Job Title" {...field} className="m-1 p-3 border rounded-md w-72" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Job Description</FormLabel>
              <FormControl>
                <Input placeholder="Job Description" {...field} className="mt-1 p-2 border rounded-md w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex items-center justify-around">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Start Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={
                          "w-[240px] pl-3 text-left font-normal mt-1 p-2 border rounded-md" +
                          (!field.value ? "text-gray-500" : "text-gray-900")
                        }
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date("2700-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">End Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={
                            "w-[240px] pl-3 text-left font-normal mt-1 p-2 border rounded-md" +
                            (!field.value ? "text-gray-500" : "text-gray-900")
                          }
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date()  || date > new Date("2700-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
        <div className="flex items-center justify-around">
        <FormField
          control={form.control}
          name="salreyStart"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Salary Start</FormLabel>
              <FormControl>
                <Input placeholder="Salary Start" type="number" {...field} className="mt-1 p-2 border rounded-md w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salreyEnd"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Salary End</FormLabel>
              <FormControl>
                <Input placeholder="Salary End" type="number" {...field} className="mt-1 p-2 border rounded-md w-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        </div>
        <div className="flex items-center justify-around">
        <FormField
          control={form.control}
          name="jobTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Job Tags</FormLabel>
              <FormControl>
              <Input placeholder="Tags" type="text" {...field} className="mt-1 p-2 border rounded-md flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter Country" type="text" {...field} className="mt-1 p-2 border rounded-md flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium text-gray-700">Place</FormLabel>
              <FormControl>
                <Input placeholder="Enter Place" type="text" {...field} className="mt-1 p-2 border rounded-md flex-1" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex items-center justify-around">
        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md">
          Submit
        </Button>
        </div>
        
      </form>
        </div>
      
    </Form>
  )
}
