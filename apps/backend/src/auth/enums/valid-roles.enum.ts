// TODO: Implementar enum como GraphQL Enum Type

import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  teacher = 'teacher',
  student = 'student',
  tutor = 'tutor',
}

registerEnumType(ValidRoles, { name: 'ValidRoles' });
