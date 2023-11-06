"use client"
import NavBar from '@/components/navBar'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function Home() {
  const cockieStore = useCookies()
  const [userDetails,setUserDetails] = useState<{firstName:string;lastName?:string;email:string}>({firstName:"",lastName:"",email:""})
  useEffect((()=>{
    if(cockieStore.get('userId')){
      axios.get('http://localhost:3000/api/getUserDetails').then((data)=>(setUserDetails(data.data.result)))
    }
    else{
      axios.get('http://localhost:3000/api/getEmployeeDetails').then((data)=>(setUserDetails({firstName:data.data.result.empName,email:data.data.result.emp_email})))
    }
  }),[])
  return (
    <>
      <NavBar firstName={userDetails.firstName} lastName={userDetails.lastName} email={userDetails.email}/>
    </>
  )
}
