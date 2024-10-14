import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Book, User, Area, Lend, CREATE_BOOK, USERS, UPDATE_BOOK } from '@/src/Constants';
import { useMutation } from '@apollo/client';
import { parseArea } from '@/src/lib/parseArea';
import { parseLend } from '@/src/lib/parseLend';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocale, useTranslations } from 'next-intl';

const initialBookState = () => {
  return {
    id: '',
    title: '',
    author: '',
    edition: '',
    pages: 0,
    area: Area.STORY,
    inventory: 0,
    lend: Lend.DISPONIBLE,
    userId: null,
    addedAt: new Date(),
  };
};

function BookForm(props: Book) {
  const t = useTranslations('Library');
  const locale = useLocale();

  const [bookProps, setBookProps] = useState<Book>(initialBookState());
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
  const [createBook, { data: dataCreate, loading: loadingCreate, error: errorCreate }] =
    useMutation(CREATE_BOOK);

  const [updateBook, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_BOOK, {
      onError: (error) => {
        if (error.message === 'Unauthorized') router.push('logout');
      },
    });

  useEffect(() => {
    if (props.title !== '') setStopLoadProps(true);
    if (!stopLoadProps) setBookProps({ ...bookProps, ...props });
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

  // if the state variable 'lend' changed to DISPONIBLE it will remove user reference.
  useEffect(() => {
    if (bookProps.lend === Lend.DISPONIBLE) {
      setBookProps({ ...bookProps, userId: null });
    }
  }, [bookProps.lend]);

  // validation
  const validateForm = () => {
    let isValid = true;

    if (!bookProps.title.trim()) {
      setErrorTitle('El titulo es requerido');
      isValid = false;
    } else {
      setErrorTitle('');
    }

    if (!bookProps.author.trim()) {
      setErrorAuthor('El nombre de author es requerido');
      isValid = false;
    } else {
      setErrorAuthor('');
    }

    if (bookProps.lend === Lend.PRESTADO && bookProps.userId === '') {
      setErrorLendTo('Debe seleccionar un usuario');
      isValid = false;
    } else {
      setErrorLendTo('');
    }

    return isValid;
  };

  async function handleSubmit(e: { target: any; preventDefault: () => void }) {
    e.preventDefault();

    let formJson = {
      ...bookProps,
    };

    if (validateForm()) {
      if (createMode) {
        delete formJson.id;
        try {
          await createBook({
            variables: {
              createBookInput: {
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
        updateBook({
          variables: {
            updateBookInput: {
              ...formJson,
            },
          },
        });
      }
    }
  }

  const handleLend = () => {
    if (bookProps.lend === Lend.PRESTADO) {
      return Lend.PRESTADO;
    } else if (bookProps.lend === Lend.DISPONIBLE) {
      return Lend.DISPONIBLE;
    }
  };

  const convertUserIdIntoEmailAndName = (userId: string) => {
    const dataSelect = users.find((user) => user.id === userId);
    if (dataSelect) {
      const { email, name } = dataSelect;
      return `${email} / ${name}`;
    }
  };

  const convertEmailIntoId = (userSelected: string) => {
    const email = userSelected.split(' ')[0];
    const userId = users.find((user) => user.email === email)?.id;
    return userId;
  };

  const areaValues = Object.values(Area);

  return (
    <>
      <div className="relative mx-24 mt-14 overflow-x-auto shadow-md sm:rounded-lg">
        <form>
          <div className="space-y-12 px-3">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="pt-2 text-base font-semibold leading-7 text-gray-900">
                {t('CreateBook.information')}
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateBook.title')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={bookProps.title !== undefined ? bookProps.title : ''}
                      onChange={(e) => setBookProps({ ...bookProps, title: e.target.value })}
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="given-name"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="book_name"
                    />
                  </div>
                  {errorTitle && <p className="p-2 text-sm font-bold text-red-600">{errorTitle}</p>}
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="author"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateBook.author')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={bookProps.author !== undefined ? bookProps.author : ''}
                      onChange={(e) => setBookProps({ ...bookProps, author: e.target.value })}
                      type="text"
                      name="author"
                      id="author"
                      autoComplete="family-name"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="book_author"
                    />
                  </div>
                  {errorAuthor && (
                    <p className="p-2 text-sm font-bold text-red-600">{errorAuthor}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="area"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateBook.area')}
                  </label>
                  <div className="mt-2">
                    <select
                      id="area"
                      name="area"
                      value={bookProps.area !== null ? bookProps.area : Area.STORY}
                      onChange={(e) =>
                        setBookProps({ ...bookProps, area: parseArea(e.target.value) })
                      }
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6"
                      data-cy="book_area"
                    >
                      {areaValues.map((area, index) => {
                        return <option key={index}>{area}</option>;
                      })}
                      {/* <option>{Area.GEOGRAPHY}</option>
                      <option>{Area.HISTORY}</option>
                      <option>{Area.LITERATURE}</option>
                      <option>{Area.MATHEMATICS}</option> */}
                    </select>
                  </div>
                </div>

                <div className="col-span-2 sm:col-start-3">
                  <label
                    htmlFor="edition"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateBook.edition')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={bookProps.edition !== null ? bookProps.edition : ''}
                      onChange={(e) => setBookProps({ ...bookProps, edition: e.target.value })}
                      type="text"
                      name="edition"
                      id="edition"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="book_edition"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1 sm:col-end-6">
                  <label
                    htmlFor="inventory"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateBook.inventory')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={bookProps.inventory !== null ? bookProps.inventory : 0}
                      onChange={(e) =>
                        setBookProps({ ...bookProps, inventory: parseInt(e.target.value, 10) })
                      }
                      type="number"
                      name="inventory"
                      id="inventory"
                      autoComplete="address-level2"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="book_inventory"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1 sm:col-end-7">
                  <label
                    htmlFor="pages"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateBook.pages')}
                  </label>
                  <div className="mt-2">
                    <input
                      value={bookProps.pages !== null ? bookProps.pages : 0}
                      onChange={(e) =>
                        setBookProps({ ...bookProps, pages: parseInt(e.target.value, 10) })
                      }
                      type="number"
                      name="pages"
                      id="pages"
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      data-cy="book_pages"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="lend"
                    className="text-md block font-medium leading-6 text-gray-900"
                  >
                    {t('CreateBook.state')}
                  </label>
                  <div className="mt-2">
                    <select
                      id="lend"
                      name="lend"
                      value={handleLend()}
                      onChange={(e) =>
                        setBookProps({ ...bookProps, lend: parseLend(e.target.value) })
                      }
                      className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6"
                      data-cy="book_area"
                    >
                      {/* <option value="">Select area</option> */}
                      <option>{Lend.DISPONIBLE}</option>
                      <option>{Lend.PRESTADO}</option>
                    </select>
                  </div>
                </div>
                {bookProps?.lend === Lend.PRESTADO && (
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
                        //value={!bookProps.userId ? undefined : bookProps.userId}
                        value={
                          bookProps.userId
                            ? convertUserIdIntoEmailAndName(bookProps.userId)
                            : undefined
                        }
                        onChange={(e) =>
                          setBookProps({ ...bookProps, userId: convertEmailIntoId(e.target.value) })
                        }
                        // onChange={(e) => convertEmailIntoId(e.target.value)}
                        className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:leading-6"
                        data-cy="users_area"
                      >
                        {/* <option selected>Seleccione un usuario</option> */}
                        {users.map((user) => (
                          <option key={user.id}>
                            {user.email} / {user.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {bookProps?.id && (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="id"
                      className="text-md block font-medium leading-6 text-gray-900"
                    >
                      Book ID
                    </label>
                    <div className="mt-2">
                      <input
                        disabled
                        value={bookProps.id !== undefined ? bookProps.id : ''}
                        onChange={(e) => setBookProps({ ...bookProps, id: e.target.value })}
                        id="id"
                        name="id"
                        type="text"
                        className="sm:text-md block w-full rounded-md border-0 p-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6 p-4">
            <button
              type="button"
              className="mr-auto hover:underline"
              onClick={() => router.push(`/${locale}/books`)}
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={() => router.push(`/${locale}/books`)}
              className="text-md font-semibold leading-6 text-gray-900"
              data-cy="book_cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-md w-[100px] rounded-md px-3 py-2 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:bg-gray-800"
              data-cy="book_save"
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

export default BookForm;
