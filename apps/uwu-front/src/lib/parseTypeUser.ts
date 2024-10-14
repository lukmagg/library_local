import { TypeUser } from '@/src/Constants';

export function parseTypeUser(value: string): TypeUser {
  switch (value) {
    case 'STUDENT':
      return TypeUser.STUDENT;
    case 'TUTOR':
      return TypeUser.TUTOR;
    case 'TEACHER':
      return TypeUser.TEACHER;
    default:
      return TypeUser.STUDENT; // o lanzar un error según tus necesidades
  }
}
