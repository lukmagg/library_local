import React, { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import Link from 'next/link';
import Filter from './Filter';
import { USERS, User, TOTAL_COUNT } from '@/src/Constants';
import { useLocale, useTranslations } from 'next-intl';

function Table() {
  const locale = useLocale();

  const [users, setUsers] = useState<User[]>([]);
  const [offset, setOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const t = useTranslations('Library');

  interface ParentProps {
    onChildEvent: (message: string) => void;
  }

  const responseTotalCount = useSuspenseQuery(TOTAL_COUNT);
  const totalUsers = responseTotalCount.data.totalCount;

  const { data } = useSuspenseQuery(USERS, {
    variables: {
      search: search,
      offset: offset,
      limit: itemsPerPage,
    },
  });

  useEffect(() => {
    setCurrentPage(offset / itemsPerPage);
    setUsers(data.users);
  });

  const handleChangePage = (newOffset: number) => {
    if (newOffset < 0 || newOffset >= totalUsers) return;
    setOffset(newOffset);
  };

  const handleChildEvent: ParentProps['onChildEvent'] = (message: React.SetStateAction<string>) => {
    setSearch(message);
  };

  return (
    <>
      <div className="mx-10 mt-6">
        <Filter onChildEvent={handleChildEvent} />
      </div>
      <div className="mx-10 mt-6">
        <div className="flex-none overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-400 dark:text-gray-300">
            <thead className="bg-gray-50 uppercase dark:bg-gray-600 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  {t('TableUsers.name')}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t('TableUsers.email')}
                </th>
                <th scope="col" className="px-6 py-3">
                  {t('TableUsers.phone')}
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Inventory
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3">
                  {t('TableUsers.action')}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b bg-white text-[18px] hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-7 font-medium text-gray-900 dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td>{user.roles}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`edit-user/${user.id}`}
                      className="font-medium hover:underline uppercase"
                    >
                      {t('TableUsers.edit')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav
            className="mb-5 ml-2 flex items-center justify-between pt-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-white">
              Showing{' '}
              <span className="font-semibold text-white">
                {offset + 1} - {offset + itemsPerPage}
              </span>{' '}
              of <span className="font-semibold text-white">{totalUsers}</span>
            </span>
            <ul className="inline-flex h-8 -space-x-px text-sm">
              <li>
                <button
                  onClick={() => handleChangePage(offset - itemsPerPage)}
                  className="ml-0 flex h-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleChangePage(offset + itemsPerPage)}
                  className="flex h-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Table;
