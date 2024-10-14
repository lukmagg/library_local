'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useLocale } from 'next-intl';

export default function logout() {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="container w-[540px] p-8 h-auto mx-auto mt-[90px] flex flex-col items-center justify-center border  rounded-md">
      <h2 className="font-bold text-xl">Tu sesion ha finalizado. Debes volver a loguearte</h2>

      <div className="mt-8">
        <button
          onClick={() => {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            router.push(`/${locale}/login`);
          }}
          className="text-xl text-black bg-green-700 hover:bg-black hover:text-gray-300 border border-black hover:border-gray-300 rounded-md px-3 py-2 font-medium"
        >
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
}
