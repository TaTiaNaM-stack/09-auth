import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const privateRoutes = ['/profile/:path*', '/notes/:path*'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

   const { pathname } = request.nextUrl
  
  // const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  // const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    if (!accessToken) {
      if (refreshToken) {
        const data = await checkSession();
          const setCookie = data.headers['set-cookie'];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
           if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
         if (pathname.startsWith('/profile/:path*') || pathname.startsWith('/notes/:path*')) {
          return NextResponse.next({
            headers: {
              Cookie: cookieStore.toString(),
            },
          });
        }
      }
    }
    if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
      return NextResponse.next();
    }
    if (pathname.startsWith('/profile/:path*') || pathname.startsWith('/notes/:path*')) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }
  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
   if (pathname.startsWith('/profile/:path*') || pathname.startsWith('/notes/:path*')) {
    return NextResponse.next();
  }
}

export const config = {
    matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};

