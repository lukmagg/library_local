import { TypedDocumentNode, gql } from '@apollo/client';
import {
  AUTH_RESPONSE_FRAGMENT,
  BOOK_FRAGMENT,
  USER_FRAGMENT,
} from '@/src/app/[locale]/apollo/fragments';

// INTERFACES
interface Data {
  totalCount: number;
}

interface Books {
  books: Array<Book>;
}

interface Users {
  users: Array<User>;
}

interface DataBook {
  book: Book;
}

interface DataUser {
  user: User;
}

interface Variables {
  id: string | string[];
}

// ENUMS
export enum Area {
  STORY = 'STORY',
  NOVEL = 'NOVEL',
  THEATER = 'THEATER',
  POETRY = 'POETRY',
  BIOGRAPHY = 'BIOGRAPHY',
  PSYCHOLOGY = 'PSYCHOLOGY',
  SOCIOLOGY = 'SOCIOLOGY',
  MYTHOLOGY = 'MYTHOLOGY',
  PHYSICAL_CHEMISTRY = 'PHYSICAL CHEMISTRY',
  MUSIC = 'MUSIC',
  EDUCATION = 'EDUCATION',
  LANGUAGES = 'LANGUAGES',
  DICTIONARIES = 'DICTIONARIES',
  BIOLOGY = 'BIOLOGY',
  SCIENCES = 'SCIENCES',
  ART = 'ART',
  ENTERTAINMENT = 'ENTERTAINMENT',
  TECHNOLOGY = 'TECHNOLOGY',
  SPORTS = 'SPORTS',
  MAGAZINES = 'MAGAZINES',
}

export enum Lend {
  PRESTADO = 'PRESTADO',
  DISPONIBLE = 'DISPONIBLE',
}

enum Group {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  ELEVEN = 11,
  TWELVE = 12,
  THIRTEEN = 13,
  FOURTEEN = 14,
}

enum Material {
  BOOK = 'BOOK',
  MAGAZINE = 'MAGAZINE',
}

export enum TypeUser {
  TEACHER = 'TEACHER',
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT',
}

// agregar internalId (opcional)
export interface Book {
  id?: string | null;
  title: string;
  author: string;
  edition?: string | null;
  pages?: number | null;
  area?: Area | null;
  inventory?: number | null;
  lend?: Lend | null;
  userId?: string | null;
  type?: Material | null;
  isbn?: string | null; //book
  issn?: string | null; //magazine
  internalId?: number | null;
  //editionYear?:Date;
  printSite?: string | null;
  lendingInit?: Date | null;
  lendinExpiration?: Date | null;
  addedAt?: Date | null;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  roles?: string[];
  typeUser: TypeUser;
  grupo?: Group;
  isActive?: boolean;
  createdAt?: Date;
}

export interface DecodedToken {
  id: string;
  roles: [string];
  iat: number;
  exp: number;
}

// QUERIES AND MUTATIONS

export const SIGN_UP = gql`
  mutation Signup($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      ...AuthResponseObjectWhole
    }
  }
  ${AUTH_RESPONSE_FRAGMENT}
`;

export const SIGN_IN = gql`
  mutation Signin($signinInput: SigninInput!) {
    signin(signinInput: $signinInput) {
      ...AuthResponseObjectWhole
    }
  }
  ${AUTH_RESPONSE_FRAGMENT}
`;

export const TOTAL_COUNT: TypedDocumentNode<Data> = gql`
  query TotalBooks {
    totalCount
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($createBookInput: CreateBookInput!) {
    createBook(createBookInput: $createBookInput) {
      ...BookObjectWhole
    }
  }
  ${BOOK_FRAGMENT}
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($updateBookInput: UpdateBookInput!) {
    updateBook(updateBookInput: $updateBookInput) {
      ...BookObjectWhole
    }
  }
  ${BOOK_FRAGMENT}
`;

export const BOOKS: TypedDocumentNode<Books> = gql`
  query Books($search: String, $offset: Int, $limit: Int) {
    books(search: $search, offset: $offset, limit: $limit) {
      ...BookObjectWhole
    }
  }
  ${BOOK_FRAGMENT}
`;

export const BOOK: TypedDocumentNode<DataBook, Variables> = gql`
  query Book($id: ID!) {
    book(id: $id) {
      ...BookObjectWhole
    }
  }
  ${BOOK_FRAGMENT}
`;

export const USERS: TypedDocumentNode<Users> = gql`
  query Users($search: String, $offset: Int, $limit: Int) {
    users(search: $search, offset: $offset, limit: $limit) {
      ...UserObjectWhole
    }
  }
  ${USER_FRAGMENT}
`;

export const USER: TypedDocumentNode<DataUser, Variables> = gql`
  query User($id: ID!) {
    user(id: $id) {
      ...UserObjectWhole
    }
  }
  ${USER_FRAGMENT}
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      ...UserObjectWhole
    }
  }
  ${USER_FRAGMENT}
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateBookInput: $updateUserInput) {
      ...UserObjectWhole
    }
  }
  ${USER_FRAGMENT}
`;
