export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";
 
// This middleware checks if the user is authenticated and redirects them accordingly.
export async function middleware(request: NextRequest) {

    const token = await getToken({ req: request});
    const url = request.nextUrl;

    if (token && (
        url.pathname.startsWith('/') ||
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify')
 
    )) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
        
    }
 
    // if (!token && url.pathname.startsWith('/dashboard')) {
    //     return NextResponse.redirect(new URL('/sign-in', request.url));
      
    // }
    return NextResponse.next();
  // return NextResponse.redirect(new URL('/home', request.url))
}
 

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*',
  ],

}