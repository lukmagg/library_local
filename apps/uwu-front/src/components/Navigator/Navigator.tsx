'use client';

import React from 'react';
import { Route } from '@/routes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Plus2 from '@/public/svg/Plus';
import { useLocale } from 'next-intl';
import { deleteCookie } from '@/src/lib/cookieUtils';
import { useTranslations } from 'next-intl';

interface Props {
  pathNames: Route[];
}

function Navigator({ pathNames }: Props) {
  const t = useTranslations('Library');

  const router = useRouter();
  const locale = useLocale();

  const pathname = usePathname();

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {pathNames.map((pathName) => (
                    <Link
                      key={pathName.path}
                      href={{
                        pathname: `/${locale}/${pathName.path}`,
                      }}
                      className="rounded-md px-3 py-2 text-xl font-medium text-white hover:bg-gray-500 hover:text-black"
                    >
                      {t('Navigator.' + pathName.name)}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      deleteCookie('token', locale);
                      router.replace(`/${locale}/login/`);
                    }}
                    className="rounded-md px-3 py-2 text-xl font-medium text-white hover:bg-gray-500 hover:text-black"
                  >
                    {t('Navigator.logout')}
                  </button>
                </div>
              </div>
              {pathname === `/${locale}/books/` && (
                <div className="ml-auto hidden rounded-md border border-white bg-pink-700 hover:border hover:border-white hover:bg-pink-600 sm:block">
                  <button
                    id="buttonAdd"
                    onClick={() => {
                      router.push(`/${locale}/books/create-book`);
                    }}
                    className="flex items-center justify-center rounded-md px-3  py-2 text-xl font-medium text-white"
                  >
                    <Plus2 color={'white'} />

                    <p className="ml-1">{t('Navigator.addBook')}</p>
                  </button>
                </div>
              )}
              {pathname === `/${locale}/users/` && (
                <div className="ml-auto hidden rounded-md border border-white bg-pink-700 hover:border hover:border-white hover:bg-pink-600 sm:block">
                  <button
                    id="buttonAdd"
                    onClick={() => {
                      router.push(`/${locale}/users/create-user`);
                    }}
                    className="flex items-center justify-center rounded-md px-3  py-2 text-xl font-medium text-white"
                  >
                    <Plus2 color={'white'} />

                    <p className="ml-1">{t('Navigator.addUser')}</p>
                  </button>
                </div>
              )}
              {/* <div className="ml-auto text-white text-xl flex justify-center items-center">Add</div> */}
            </div>

            {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="/swartz.jpg" alt=""></img>
                  </button>
                </div>


                <div className="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                </div> 
              </div>
            </div> */}
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Team
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Projects
            </a>
            <a
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigator;
