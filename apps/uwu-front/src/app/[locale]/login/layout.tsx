import React from 'react'

interface Props {
    children: React.ReactNode;
}

function LoginLayout({children}: Props) {
  return (
    <div>{children}</div>
  )
}

export default LoginLayout