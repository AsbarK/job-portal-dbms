import { JobCard } from '@/components/jobCard'
import { ModeToggle } from '@/components/modeToggle'

export default function Home() {
  return (
    <>
    <ModeToggle></ModeToggle>
    <div className='grid gap-4 grid-cols-3'>
    <JobCard avName='job1' avlink='https://github.com/shadcn.png' key={'job1'}/>
    <JobCard avName='job2' avlink='https://github.com/shadcn.png' key={'job2'}/>
    <JobCard avName='job3' avlink='https://github.com/shadcn.png' key={'job3'}/>
    </div>
    
    This is test</>
  )
}
