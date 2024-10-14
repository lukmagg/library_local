import { Lend } from '@/src/Constants';

export function parseLend(value: string): Lend | undefined {
  switch (value) {
    case 'PRESTADO':
      return Lend.PRESTADO;
    case 'DISPONIBLE':
      return Lend.DISPONIBLE;
    default:
      return undefined;
  }
}
