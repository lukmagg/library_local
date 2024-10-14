'use client';

import { useParams } from 'next/navigation';
import { Navigator } from '@/src/components';
import { Routes } from '@/routes';
import BookForm from '../../components/BookForm';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import React, { useEffect, useState } from 'react';
import { BOOK, Book } from '@/src/Constants';
import LocaleSwitcher from '@/src/components/LocaleSwitcher';



function page() {
  const params = useParams();

  const [book, setBook] = useState<Book>({ id: '', title: '', author: '' });

  const { data } = useSuspenseQuery(BOOK, {
    variables: {
      id: params.id,
    },
  });

  useEffect(() => {
    setBook(data.book);
  }, [data]);

  return (
    <>
      <Navigator pathNames={[Routes.HOME]} />
      <LocaleSwitcher />
      <BookForm
        title={book.title}
        id={book.id}
        author={book.author}
        area={book.area}
        edition={book.edition}
        inventory={book.inventory}
        lend={book.lend}
        pages={book.pages}
        userId={book.userId}
        addedAt={book.addedAt}
      />
    </>
  );
}

export default page;
