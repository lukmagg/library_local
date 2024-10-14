'use client';

import { Navigator } from '@/src/components';
import { Routes } from '@/routes';
import React from 'react';
import { TypeUser } from '@/src/Constants';
import NoSSR from 'react-no-ssr';
import LocaleSwitcher from '@/src/components/LocaleSwitcher';
import UserForm from '../components/UserForm';

function page() {
  return (
    <>
      <Navigator pathNames={[Routes.HOME, Routes.USERS]} />
      <LocaleSwitcher />
      <NoSSR>
        <UserForm id="" name="" email="" phone="" typeUser={TypeUser.STUDENT} />
      </NoSSR>
    </>
  );
}

export default page;
