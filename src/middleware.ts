import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/loginUser' || path === '/loginEmployee'

  const user = request.cookies.get('userId')?.value || ''
  const emp = request.cookies.get('empId')?.value  ||''
//   console.log(request.nextUrl)
  if (!isPublicPath && !user && !emp) {
    console.log('in')
    return NextResponse.redirect(new URL('/loginUser', request.nextUrl))
  }

}

 
export const config = {
  matcher: [
    '/',
    '/createJob',
    '/allJobs',
    '/applyJob',
    '/loginUser',
  ]
}