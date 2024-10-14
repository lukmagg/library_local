import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment UserObjectWhole on UserObject {
    id
    name
    email
    phone
    roles
    isActive
    createdAt
  }
`;

export const BOOK_FRAGMENT = gql`
  fragment BookObjectWhole on Book {
    id
    title
    author
    edition
    pages
    area
    inventory
    lend
    userId
    addedAt
  }
`;

export const AUTH_RESPONSE_FRAGMENT = gql`
  fragment AuthResponseObjectWhole on AuthResponseObject {
    user {
      ...UserObjectWhole
    }
    token
  }
  ${USER_FRAGMENT}
`;
