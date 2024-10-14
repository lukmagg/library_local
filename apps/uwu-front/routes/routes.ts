export const Routes = {
  HOME: {
    path: '/',
    name: 'home',
  },
  LOGIN: {
    path: 'login',
    name: 'login',
  },
  BOOKS: {
    path: 'books',
    name: 'books',
  },
  USERS: {
    path: 'users',
    name: 'users',
  },
};

export interface Route {
  path: string;
  name: string;
}
