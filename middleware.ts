import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('token')?.value

  if (pathname.startsWith('/checkout')) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${pathname}`, request.url)
      )
    }

    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED)
      )
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/checkout/:path*',
}
