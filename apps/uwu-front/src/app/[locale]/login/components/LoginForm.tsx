'use client';

import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { SIGN_IN, SIGN_UP } from '../../../../Constants';

export default function LoginForm() {
  const router = useRouter();
  const locale = useLocale();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [password, setPassword] = useState('');
  const [operation, setOperation] = useState('signin');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorBadCredentials, setErrorBadCredentials] = useState('');
  const [errorUserNotFound, setErrorUserNotFound] = useState('');

  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const nameQuery = operation === 'signin' ? SIGN_IN : SIGN_UP;

  const [auth, { data, loading, error }] = useMutation(nameQuery, {
    onError: (error) => {
      if (error.message === 'Email/Password do not match') {
        setErrorBadCredentials('Bad credentials!');
        setErrorUserNotFound('');
      }
      if (error.message === 'User not found') {
        setErrorUserNotFound('El usuario no existe');
        setErrorBadCredentials('');
      }
    },
  });

  useEffect(() => {
    let token;

    if (data) {
      if (operation === 'signin') {
        token = data.signin.token;
      } else {
        token = data.signup.token;
      }

      setCookie('token', token, { path: '/' });

      router.push(`/${locale}`);
    }
  }, [data]);

  // validation
  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      setErrorEmail('El email es requerido');
      setErrorBadCredentials('');
      isValid = false;
    } else {
      setErrorEmail('');
    }

    if (!password.trim()) {
      setErrorPassword('La contraseña es requerida');
      setErrorBadCredentials('');
      isValid = false;
    } else {
      setErrorPassword('');
    }

    return isValid;
  };

  function handleSubmit(e: { target: any; preventDefault: () => void }) {
    e.preventDefault();

    const formJsonSignin = {
      email,
      password,
    };

    const formJsonSignup = {
      email,
      name,
      password,
    };

    if (validateForm()) {
      operation === 'signin'
        ? auth({
            variables: {
              signinInput: {
                ...formJsonSignin,
              },
            },
          })
        : auth({
            variables: {
              signupInput: {
                ...formJsonSignup,
              },
            },
          });
    }
  }

  return (
    <div className="mt-[210px] w-full max-w-xs">
      <form onSubmit={handleSubmit} className="mb-4 rounded bg-gray-800 p-10 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-pink-400" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
          />
          {errorEmail && <p className="p-2 text-sm font-bold text-red-600">{errorEmail}</p>}
          {errorUserNotFound && (
            <p className="p-2 text-sm font-bold text-red-600">{errorUserNotFound}</p>
          )}
        </div>

        {operation === 'signup' && (
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-pink-400" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="name"
              type="name"
              placeholder="Name"
              name="name"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-pink-400" htmlFor="password">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border border-red-500 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            type="password"
            placeholder="******************"
            name="password"
          />
          {errorPassword && <p className="p-2 text-sm font-bold text-red-600">{errorPassword}</p>}
        </div>

        {
          <div className="mb-6 flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-pink-500 px-4 py-2 font-bold text-white hover:bg-pink-700 focus:outline-none"
              type="submit"
            >
              {operation === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
            <a
              className="inline-block align-baseline text-sm font-bold text-pink-400 hover:text-pink-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        }
        {errorBadCredentials && (
          <p className="p-2 text-sm font-bold text-red-600">{errorBadCredentials}</p>
        )}
        <div className="flex justify-center">
          {operation === 'signin' ? (
            <button type="button" className="text-white" onClick={() => setOperation('signup')}>
              Create acount
            </button>
          ) : (
            <button type="button" className="text-white" onClick={() => setOperation('signin')}>
              I have acount
            </button>
          )}
        </div>
      </form>
      {/* <p className="text-center text-gray-500 text-xs">©2023 Uwu Corp. All rights reserved.</p> */}
    </div>
  );
}
