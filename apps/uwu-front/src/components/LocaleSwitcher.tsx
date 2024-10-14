'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const pathnameParts = pathname.split('/');

  function switchLocale(locale: string) {
    let newPath = '';

    if (pathnameParts.length === 2) {
      newPath = `/${locale}`;
    } else {
      pathnameParts[1] = locale;
      newPath = pathnameParts.join('/');
    }
    router.push(newPath);
  }

  return (
    <div className="mx-10 mt-2 flex flex-row-reverse">
      <button className="mx-2" onClick={() => switchLocale('fr')}>
        <span className="text-black">French</span>
      </button>

      <button className="mx-2" onClick={() => switchLocale('en')}>
        <span className="text-black">English</span>
      </button>

      <button className="mx-2" onClick={() => switchLocale('es')}>
        <span className="text-black">Spanish</span>
      </button>
    </div>
  );
}
