/* eslint-disable no-use-before-define */
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  password: string;
  bookings: Lend[];
  createdAt: Date;
}

interface Lend {
  id: String;
  bookId: string;
  userId: string;
  lendAt: Date;
  returnAt: Date;
  User: User;
  Book: Book;
}

interface Book {
  id: String;
  title: String;
  author: String;
  lend: Boolean;
  inStock: Boolean;
  private: Boolean;
  image: String;
  addedAt: Date;
  updatedAt: Date;
  Lend: Lend[];
}

export { User, Lend, Book };
