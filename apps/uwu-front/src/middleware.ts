import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import createMiddleware from 'next-intl/middleware';
import locales from './config';
import { DecodedToken } from './Constants';

export default async function middleware(request: NextRequest) {
  const [, locale, ...segments] = request.nextUrl.pathname.split('/');

  // /
  if (request.nextUrl.pathname.endsWith(`/${locale}/`)) {
    let token = request.cookies.get('token')?.value;

    if (!token) {
      request.nextUrl.pathname = `/${locale}/login/`;
    }
  }

  // /books with token verify
  if (request.nextUrl.pathname.endsWith(`/${locale}/books/`)) {
    let token = request.cookies.get('token')?.value;

    if (!token) {
      request.nextUrl.pathname = `/${locale}/login/`;
    } else if (token) {
      const decodedToken = decodeJwt(token);

      if (decodedToken) {
        if (decodedToken.exp !== undefined) {
          const now = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < now) {
            request.nextUrl.pathname = `/${locale}/logout/`;
          }
        }
      }
    }
  }

  // /users with token and authorization verify
  if (request.nextUrl.pathname.endsWith(`/${locale}/users/`)) {
    let token = request.cookies.get('token')?.value;

    if (!token) {
      request.nextUrl.pathname = `/${locale}/login/`;
    } else if (token) {
      const decodedToken: DecodedToken = decodeJwt(token);

      if (decodedToken) {
        if (decodedToken.exp !== undefined) {
          const now = Math.floor(Date.now() / 1000);

          if (decodedToken.exp < now) {
            request.nextUrl.pathname = `/${locale}/logout/`;
          }
        }
        if (!decodedToken.roles.includes('admin')) {
          request.nextUrl.pathname = `/${locale}`;
        }
      }
    }
  }

  // /login
  if (request.nextUrl.pathname.endsWith(`/${locale}/login/`)) {
    let token = request.cookies.get('token')?.value;

    if (token) {
      request.nextUrl.pathname = `/${locale}/`;
    }
  }

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: 'es',
  });

  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|fr)/:path*'],
};
