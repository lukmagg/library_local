import { Routes } from '@/routes';
import { Navigator } from '@/src/components';
import LocaleSwitcher from '@/src/components/LocaleSwitcher';

export default function Page() {
  return (
    <main>
      <Navigator pathNames={[Routes.BOOKS, Routes.USERS]} />
      <LocaleSwitcher />

      <div className="flex flex-col h-screen pb-[280px] sm:pb-[100px] bg-gray-300  items-center justify-end">
        <div className="grow flex flex-col-reverse mb-6">
          <h2 className="text-xl font-bold">Uwu - Library Manager</h2>
        </div>

        <div className=" w-[400px] flex flex-col-reverse mb-10">
          <p className="text-center">
            Software para el manejo de las bibliotecas en Escuelas experimentales de la ciudad de
            Ushuaia, Tierra del fuego.
          </p>
        </div>
      </div>
    </main>
  );
}
