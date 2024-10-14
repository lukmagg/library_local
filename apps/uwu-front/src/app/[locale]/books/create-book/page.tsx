'use client';

import { Navigator } from '@/src/components';
import { Routes } from '@/routes';
import BookForm from '../components/BookForm';
import React from 'react';
import { Area, Lend } from '@/src/Constants';
import NoSSR from 'react-no-ssr';
import LocaleSwitcher from '@/src/components/LocaleSwitcher';

function page() {
  return (
    <>
      <Navigator pathNames={[Routes.HOME, Routes.USERS]} />
      <LocaleSwitcher />
      <NoSSR>
        <BookForm
          id=""
          title=""
          author=""
          area={Area.STORY}
          edition=""
          inventory={0}
          lend={Lend.DISPONIBLE}
          userId={null}
          pages={0}
          addedAt={new Date()}
        />
      </NoSSR>
    </>
  );
}

export default page;
