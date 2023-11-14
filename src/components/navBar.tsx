'use client'
import { ModeToggle } from '@/components/modeToggle'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link  from 'next/link';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useCookies } from 'next-client-cookies';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import AddResume from './addResume';

function NavBar({firstName,lastName,email}:{firstName:string;lastName?:string;email:string}) {
  return (
    <>
        <NavItem firstName={firstName} lastName={lastName} email={email}/>
    </>
  );
}

function NavItem({firstName,lastName,email}:{firstName:string;lastName?:string;email:string}) {
  const cockieStore = useCookies()
  const router = useRouter();
  const emp = cockieStore.get('empId')
  return (
    <>
        <div className='flex justify-between items-center p-3 border-b mb-3 border-border rounded-sm'>
            <h1 className='text-2xl'>
                Job Portal
            </h1>
            <div className='flex gap-4 items-center'>
                <div className='cursor-pointer hover:text-muted-foreground'>Home</div>
                {emp ? <Link className='cursor-pointer hover:text-muted-foreground' href='/allEmpJobs'>Posted By You</Link> : <Link className='cursor-pointer hover:text-muted-foreground' href='/allJobs'>Find Job</Link>}
                {emp ? <Link className='cursor-pointer hover:text-muted-foreground' href='/createJob'>Create Job</Link> : <AddResume />}
                <ModeToggle />
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" className='cursor-pointer h-10 w-10 rounded-full'/>
                      <AvatarFallback>{lastName}</AvatarFallback>
                  </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage  src="https://github.com/shadcn.png" className='cursor-pointer h-10 w-10 rounded-full' />
                        <AvatarFallback>{lastName}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{firstName}</h4>
                        <p className="text-sm">
                          {email}
                        </p>
                        <Button onClick={()=>(emp ? (cockieStore.remove('empId'),router.push('/loginEmployee')) : (cockieStore.remove('userId'),router.push('/loginUser')))}>Logout</Button>
                      </div>
                    </div>
                  </HoverCardContent>
              </HoverCard>
                
            </div>
        </div>
    </>
  );
}
export default NavBar;