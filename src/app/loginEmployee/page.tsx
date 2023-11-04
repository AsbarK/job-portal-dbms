"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { useCookies } from 'next-client-cookies';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).email('This is not Valid Email'),
  password: z.string().min(4,{message:'Incorret password'})

})

export default function LoginUser() {
  const cockieStore = useCookies()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        userName: "",
        password:''
    },
  })
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post('http://localhost:3000/api/loginEmployee',values).then((data)=>(console.log(data),cockieStore.set('empId',data.data.empId)))
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
