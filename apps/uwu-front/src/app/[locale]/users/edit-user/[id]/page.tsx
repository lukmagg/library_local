'use client';

import { useParams } from 'next/navigation';
import { Navigator } from '@/src/components';
import { Routes } from '@/routes';
import UserForm from '../../components/UserForm';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { useEffect, useState } from 'react';
import { USER, User, TypeUser } from '@/src/Constants';
import LocaleSwitcher from '@/src/components/LocaleSwitcher';

function page() {
  const params = useParams();

  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    typeUser: TypeUser.STUDENT,
  });

  const { data } = useSuspenseQuery(USER, {
    variables: {
      id: params.id,
    },
  });

  useEffect(() => {
    setUser(data.user);
  }, [data]);

  return (
    <>
      <Navigator pathNames={[Routes.HOME]} />
      <LocaleSwitcher />
      <UserForm id={user.id} name={user.name} email={user.email} phone={user.phone} />
    </>
  );
}

export default page;
