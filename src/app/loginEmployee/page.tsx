'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useCookies } from 'next-client-cookies';
import {
  Form,
} from "@/components/ui/form"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import dotenv from 'dotenv'
dotenv.config({path:'.env.local' })



const formSchemaLogin = z.object({
  userName: z.string().min(2, {
  message: "Username must be at least 2 characters.",
}).email('This is not Valid Email'),
password: z.string().min(4,{message:'Incorret password'})

})
const formSchemaRegister = z.object({
  email: z.string().min(2, {
  message: "Username must be at least 2 characters.",
}).email('This is not Valid Email'),
password: z.string().min(4),
mobile: z.string().min(10).max(10,{message:'Incorret mobile Number'}),
employeeName:z.string().min(2, {
  message: "Username must be at least 2 characters.",
})

})

export default function LoginUser() {
  const cockieStore = useCookies()
  const router = useRouter()
  const formLogin = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
        userName: "",
        password:''
    },
  })
  const formRegister = useForm<z.infer<typeof formSchemaRegister>>({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
        email: "",
        password:'',
        mobile:'',
        employeeName:''
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
  function onSubmitLogin(values: z.infer<typeof formSchemaLogin>) {
    axios.post(`${process.env.NEXT_PUBLIC_URL_LINK}/api/loginEmployee`,values).then((data)=>(console.log(data.status),data.status === 200 ? (cockieStore.set('empId',data.data.empId), toast.success('Success'),router.push('/')): (console.log(data.status), toast.error('Employee Exits'))))
    console.log(values)
  }
  function onSubmitRegister(value: z.infer<typeof formSchemaRegister>) {
    axios.post(`${process.env.NEXT_PUBLIC_URL_LINK}/api/registerEmployee`,value).then((data)=>(console.log(data),cockieStore.set('empId',data.data.id),toast.success('Success'),router.push('/')))
    console.log(value)
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
     <Form {...formLogin}>
      <Tabs defaultValue="Login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Login">Login</TabsTrigger>
        <TabsTrigger value="Register">Register</TabsTrigger>
      </TabsList>
    <form onSubmit={formLogin.handleSubmit(onSubmitLogin)} className="space-y-8">
      <TabsContent value="Login">
        <Card className="h-2/4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" {...formLogin.register('userName')} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Password">Password</Label>
              <Input id="Password" placeholder="Enter your Password" {...formLogin.register('password')} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      </form>
      <form onSubmit={formRegister.handleSubmit(onSubmitRegister)} className="space-y-8">
      <TabsContent value="Register">
        <Card className="h-2/4">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Welcome. Please Register here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your Name" {...formRegister.register('employeeName')} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" placeholder="Enter your mobile number" {...formRegister.register('mobile')} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" {...formRegister.register('email')} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your Password" {...formRegister.register('password')} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      </form>
    </Tabs>
  </Form>
  <span>
    User?
  <Link href='/loginUser' className="text-purple-700 uppercase underline">Click Here</Link>
  </span>

    </div>
    
  )
}
