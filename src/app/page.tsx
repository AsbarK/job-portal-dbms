'use client'
import NavBar from '@/components/navBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

export default function Home() {
  const cookieStore = useCookies();
  const [userDetails, setUserDetails] = useState<{ firstName: string; lastName?: string; email: string }>({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    if (cookieStore.get('userId')) {
      axios.get('http://localhost:3000/api/getUserDetails').then((data) => (setUserDetails(data.data.result)));
    } else {
      axios.get('http://localhost:3000/api/getEmployeeDetails').then((data) => (setUserDetails({ firstName: data.data.result.empName, email: data.data.result.emp_email })));
    }
  }, []);

  return (
    <>
      <NavBar firstName={userDetails.firstName} lastName={userDetails.lastName} email={userDetails.email} />
      <div className="flex flex-col h-screen justify-between bg-transparent">
        <header className="bg-transparent py-8 text-center rounded-sm">
          <h1 className="text-4xl font-bold">Job Portal</h1>
          <p>Find your dream job with us</p>
        </header>
        <section className="flex justify-around py-16 mx-auto max-w-6xl">
          <div className="max-w-md p-6 bg-background rounded-lg shadow-lg hover:shadow-xl transition duration-300 m-3 border border-border">
            <h2 className="text-2xl font-bold mb-2 ">Search Jobs</h2>
            <p>Explore thousands of job opportunities from various industries.</p>
          </div>
          <div className="max-w-md p-6 bg-background rounded-lg shadow-lg hover:shadow-xl transition duration-300 m-3 border border-border">
            <h2 className="text-2xl font-bold mb-2 ">Apply Online</h2>
            <p>Apply for jobs with just a few clicks and get noticed by employers.</p>
          </div>
          <div className="max-w-md p-6 bg-background rounded-lg shadow-lg hover:shadow-xl transition duration-300 m-3 border border-border">
            <h2 className="text-2xl font-bold mb-2 ">Get Hired</h2>
            <p>Connect with top companies and start your new career.</p>
          </div>
        </section>
        <footer className="bg-background text-white text-center py-4 border-t border-border">
          <p>&copy; 2023 Job Portal. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
