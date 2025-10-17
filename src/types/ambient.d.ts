// Ambient declarations to reduce TS noise in the dev workspace

declare module 'next' {
  export type Metadata = any
  export const headers: any
}

declare module 'next/server' {
  export type NextRequest = any
  export class NextResponse {
    static json(body: any, init?: any): any
  }
}

declare module 'next/navigation' {
  export function redirect(url: string): void
}

declare module 'next/link' {
  const Link: any
  export default Link
}

declare module 'next/font/google' {
  export function Inter(opts?: any): any
}

declare module 'next-auth' {
  export function getServerSession(...args: any[]): any
  export const NextAuth: any
}

declare module 'next-auth/react' {
  export function useSession(): any
  export function signOut(...args: any[]): any
}

declare module 'next-auth/jwt' {
  export function getToken(...args: any[]): any
}

declare module 'next-auth/providers/google' {
  const GoogleProvider: any
  export default GoogleProvider
}

declare module 'next-auth/providers/credentials' {
  const CredentialsProvider: any
  export default CredentialsProvider
}

declare module 'zod' {
  export const z: any
}

declare module 'react' {
  export = any
}

declare module 'next/link' {
  const x: any
  export default x
}

declare module '@playwright/test' {
  export const test: any
  export const expect: any
}

// Allow arbitrary JSX elements
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
