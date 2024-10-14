import React from 'react';

interface Props {
  children: React.ReactNode;
}

function UsersLayout({ children }: Props) {
  return <div style={{ color: 'green' }}>{children}</div>;
}

export default UsersLayout;
