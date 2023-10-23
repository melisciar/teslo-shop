import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string
    user: {
      role?: string
    } & DefaultSession['user']
  }
  interface User {
    id?: string
    _id?: string
    role?: string
  }
}
