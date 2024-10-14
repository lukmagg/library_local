import { Area } from '@/src/Constants';

export function parseArea(value: string): Area | undefined {
  switch (value) {
    case 'STORY':
      return Area.STORY;
    case 'NOVEL':
      return Area.NOVEL;
    case 'THEATER':
      return Area.THEATER;
    case 'POETRY':
      return Area.POETRY;
    case 'BIOGRAPHY':
      return Area.BIOGRAPHY;
    case 'PSYCHOLOGY':
      return Area.PSYCHOLOGY;
    case 'SOCIOLOGY':
      return Area.SOCIOLOGY;
    case 'MYTHOLOGY':
      return Area.MYTHOLOGY;
    case 'PHYSICAL CHEMISTRY':
      return Area.PHYSICAL_CHEMISTRY;
    case 'MUSIC':
      return Area.MUSIC;
    case 'EDUCATION':
      return Area.EDUCATION;
    case 'LANGUAGES':
      return Area.LANGUAGES;
    case 'DICTIONARIES':
      return Area.DICTIONARIES;
    case 'BIOLOGY':
      return Area.BIOLOGY;
    case 'SCIENCES':
      return Area.SCIENCES;
    case 'ART':
      return Area.ART;
    case 'ENTERTAINMENT':
      return Area.ENTERTAINMENT;
    case 'TECHNOLOGY':
      return Area.TECHNOLOGY;
    case 'SPORTS':
      return Area.SPORTS;
    case 'MAGAZINES':
      return Area.MAGAZINES;
    default:
      return undefined; // o lanzar un error según tus necesidades
  }
}
