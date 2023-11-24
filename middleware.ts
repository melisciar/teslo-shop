import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const requestedPage = req.nextUrl.pathname
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  const validRoles = ['admin', 'super-user', 'SEO']

  if (!session) {
    const url = req.nextUrl.clone()
    url.pathname = `/auth/login`
    url.search = `p=${requestedPage}`
    if (requestedPage.startsWith('/api')) {
      return Response.json(
        { success: false, message: 'No está autorizado' },
        { status: 401 }
      )
    }
    return NextResponse.redirect(url)
  }

  if(requestedPage.startsWith('/api/admin') && !validRoles.includes(session.user.role)) {
    return Response.json(
      { success: false, message: 'No está autorizado' },
      { status: 401 }
    )
  }

  if (requestedPage.startsWith('/admin') && !validRoles.includes(session.user.role)) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/checkout/:path*',
    '/orders/:path*',
    '/api/orders/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
