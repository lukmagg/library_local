import { ApolloWrapper } from '../../lib/apollo-provider.js';
import 'tailwindcss/tailwind.css';
//import '@/styles/globals.css';
import '@/styles/output.css';
import '@fontsource-variable/onest';
import '@fontsource/ubuntu';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function RootLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string}; }) {
  const messages = await getMessages();

  
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Uwu - Library Manager</title>
      </head>
      <body className="bg-gray-200">
        <ApolloWrapper>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
