import 'next-auth'
import 'next-auth/jwt'
import type { Role } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    role: Role
  }

  interface Session {
    user: User & {
      id: string
      role: Role
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role
  }
}
