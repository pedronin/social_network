export { default } from 'next-auth/middleware';

// export const config = { matcher: ['/'] };


// import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';
// import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// export default async function middleware(req: NextRequest, event: NextFetchEvent) {
//   const token = await getToken({ req });
//   const isAuthenticated = !!token;

//   const config = { matcher: ['/'] };

//   if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   const authMiddleware = await withAuth({
//     pages: {
//       signIn: `/login`,
//     },
//   });

//   // @ts-expect-error
//   return authMiddleware(req, event);
// }

// export async function а(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;
//   const protectedPaths = ["/", "/admin"];
//   const isPathProtected = protectedPaths?.some((path) => pathname == path);
//   const res = NextResponse.next();
//   if (isPathProtected) {
//     const token = await getToken({ req });
//     if (!token) {
//       const url = new URL(`/login`, req.url);
//       url.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(url);
//     }
//   }
//   return res;
// }