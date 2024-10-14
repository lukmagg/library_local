import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, CREATE_USER, USERS, UPDATE_USER, TypeUser } from '@/src/Constants';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocale, useTranslations } from 'next-intl';
import { parseTypeUser } from '@/src/lib/parseTypeUser';

const initialUserState = () => {
  return {
    id: '',
    name: '',
    email: '',
    phone: '',
    typeUser: TypeUser.STUDENT,
  };
};

function UserForm(props: User) {
  const t = useTranslations('Library');
  const locale = useLocale();

  const [userProps, setUserProps] = useState<User>(initialUserState());
  const [users, setUsers] = useState<User[]>([]);

  const [errorTitle, setErrorTitle] = useState('');
  const [errorAuthor, setErrorAuthor] = useState('');

  const [errorLendTo, setErrorLendTo] = useState('');

  // Esta variable de estado es porque al actualizar un libro cambia el estado
  // y se re-renderiza la pagina, pero como los parametros iniciales no cambiaron
  // se recarga el estado con valores viejos y hay que hacer una segunda re-renderizacion
  // para que carguen los valores nuevos.
  // para evitar esto, cambio el valor de stopLoadProps a true.

  const [stopLoadProps, setStopLoadProps] = useState(false);

  const router = useRouter();
  const createMode = props.id === '';

  const { data: dataUsers } = useSuspenseQuery(USERS);

  const notifyCreate = () => toast('Libro creado correctamente!');
  const notifyUpdate = () => toast('Libro actualizado correctamente!');
  const notifyAuthError = () => toast.error('Permisos insuficientes!');

  // Define mutations
  const [createUser, { data: dataCreate, loading: loadingCreate, error: errorCreate }] =
    useMutation(CREATE_USER);

  const [updateUser, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_USER, {
      onError: (error) => {
        if (error.message === 'Unauthorized') router.push('logout');
      },
    });

  useEffect(() => {
    if (props.name !== '') setStopLoadProps(true);
    if (!stopLoadProps) setUserProps({ ...userProps, ...props });
  }, [props]);

  useEffect(() => {
    if (!dataUsers) return;
    setUsers(dataUsers.users);
  }, [dataUsers]);

  useEffect(() => {
    if (!dataCreate && !dataUpdate) return;
    if (dataCreate) {
      notifyCreate();
    } else if (dataUpdate) {
      notifyUpdate();
    }
  }, [dataCreate, dataUpdate, errorUpdate]);

  // validation
  const validateForm = () => {
    let isValid = true;

    if (!userProps.name.trim()) {
      setErrorTitle('El titulo es requerido');
      isValid = false;
    } else {
      setErrorTitle('');
    }

    if (!userProps.email.trim()) {
      setErrorAuthor('El nombre de author es requerido');
      isValid = false;
    } else {
      setErrorAuthor('');
    }

    return isValid;
  };

  async function handleSubmit(e: { target: any; preventDefault: () => void }) {
    e.preventDefault();

    let formJson = {
      ...userProps,
    };

    if (validateForm()) {
      if (createMode) {
        delete formJson.id;
        try {
          await createUser({
            variables: {
              createUserInput: {
                ...formJson,
              },
            },
          });
        } catch (error) {
          if (errorCreate?.message === 'Forbidden resource') {
            notifyAuthError();
          }
        }
      } else {
        updateUser({
          variables: {
            updateUserInput: {
              ...formJson,
            },
          },
        });
      }
    }
  }

  const typeUserValues = Object.values(TypeUser);

  return (
    <>
      <div className="relative mx-24 mt-14 overflow-x-auto shadow-md sm:rounded-lg">
        <form>
          <div className="space-y-12 px-3">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="pt-2 text-base font-semibold leading-7 text-gray-900">
                {t('CreateUser.information')}
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateUser.name')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={userProps.name !== undefined ? userProps.name : ''}
                      onChange={(e) => setUserProps({ ...userProps, name: e.target.value })}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="user_name"
                    />
                  </div>
                  {errorTitle && <p className="p-2 text-sm font-bold text-red-600">{errorTitle}</p>}
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateUser.email')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={userProps.email !== undefined ? userProps.email : ''}
                      onChange={(e) => setUserProps({ ...userProps, email: e.target.value })}
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="family-name"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="user_email"
                    />
                  </div>
                  {errorAuthor && (
                    <p className="p-2 text-sm font-bold text-red-600">{errorAuthor}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="typeUser"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateUser.rol')}
                  </label>
                  <div className="mt-2">
                    <select
                      id="typeUser"
                      name="typeUser"
                      value={userProps.typeUser !== null ? userProps.typeUser : TypeUser.STUDENT}
                      onChange={(e) =>
                        setUserProps({ ...userProps, typeUser: parseTypeUser(e.target.value) })
                      }
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6"
                      data-cy="user_area"
                    >
                      {typeUserValues.map((typeUser, index) => {
                        return <option key={index}>{typeUser}</option>;
                      })}
                    </select>
                  </div>
                </div>

                {/* <div className="col-span-2 sm:col-start-3">
                  <label
                    htmlFor="edition"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateUser.edition')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={userProps.edition !== null ? userProps.edition : ''}
                      onChange={(e) => setUserProps({ ...userProps, edition: e.target.value })}
                      type="text"
                      name="edition"
                      id="edition"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="user_edition"
                    />
                  </div>
                </div> */}

                {/* <div className="sm:col-span-1 sm:col-end-6">
                  <label
                    htmlFor="inventory"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateUser.inventory')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={userProps.inventory !== null ? userProps.inventory : 0}
                      onChange={(e) =>
                        setUserProps({ ...userProps, inventory: parseInt(e.target.value, 10) })
                      }
                      type="number"
                      name="inventory"
                      id="inventory"
                      autoComplete="address-level2"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="user_inventory"
                    />
                  </div>
                </div> */}

                {/* <div className="sm:col-span-1 sm:col-end-7">
                  <label
                    htmlFor="pages"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateUser.pages')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={userProps.pages !== null ? userProps.pages : 0}
                      onChange={(e) =>
                        setUserProps({ ...userProps, pages: parseInt(e.target.value, 10) })
                      }
                      type="number"
                      name="pages"
                      id="pages"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="user_pages"
                    />
                  </div>
                </div> */}

                {/* <div className="sm:col-span-2">
                  <label
                    htmlFor="lend"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateUser.state')}
                  </label>
                  <div className="mt-2">
                    <select
                      id="lend"
                      name="lend"
                      value={handleLend()}
                      onChange={(e) =>
                        setUserProps({ ...userProps, lend: parseLend(e.target.value) })
                      }
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6"
                      data-cy="user_area"
                    >
                      
                      <option>{Lend.DISPONIBLE}</option>
                      <option>{Lend.PRESTADO}</option>
                    </select>
                  </div>
                </div> */}

                {/* {userProps?.lend === Lend.PRESTADO && (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="user"
                      className="text-md block font-medium leading-6 text-gray-900"
                    >
                      User
                    </label>
                    <div className="mt-2">
                      <select
                        id="user"
                        name="user"
                        //value={!userProps.userId ? undefined : userProps.userId}
                        value={
                          userProps.userId
                            ? convertUserIdIntoEmailAndName(userProps.userId)
                            : undefined
                        }
                        onChange={(e) =>
                          setUserProps({ ...userProps, userId: convertEmailIntoId(e.target.value) })
                        }
                        // onChange={(e) => convertEmailIntoId(e.target.value)}
                        className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6"
                        data-cy="users_area"
                      >
                        {users.map((user) => (
                          <option key={user.id}>
                            {user.email} / {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )} */}

                {/* {userProps?.id && (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="id"
                      className="text-md block font-medium leading-6 text-gray-900"
                    >
                      User ID
                    </label>
                    <div className="mt-2">
                      <input
                        disabled
                        value={userProps.id !== undefined ? userProps.id : ''}
                        onChange={(e) => setUserProps({ ...userProps, id: e.target.value })}
                        id="id"
                        name="id"
                        type="text"
                        className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      />
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 p-4">
            <button
              type="button"
              className="mr-auto hover:underline"
              onClick={() => router.push(`/${locale}/users`)}
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={() => router.push(`/${locale}/users`)}
              className="text-md font-semibold leading-6 text-gray-900"
              data-cy="user_cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-md w-[100px] rounded-md px-3 py-2 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:bg-gray-800"
              data-cy="user_save"
            >
              Save
            </button>
          </div>
        </form>
        <ToastContainer position="bottom-center" autoClose={2000} draggable />
      </div>
    </>
  );
}

export default UserForm;
