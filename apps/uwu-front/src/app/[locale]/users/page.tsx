'use client';

import React from 'react';

import { Navigator } from '@/src/components';
import { Routes } from '@/routes';
import Table from './components/Table';
import NoSSR from 'react-no-ssr';
import LocaleSwitcher from '@/src/components/LocaleSwitcher';

function Users() {
  return (
    <>
      <Navigator pathNames={[Routes.HOME, Routes.BOOKS]} />
      <LocaleSwitcher />
      <NoSSR>
        <Table />
      </NoSSR>
    </>
  );
}

export default Users;
