import React from 'react'
import { useStoreon } from 'storeon/react';
import Header from '../Header';
import style from './layout.module.scss';

const Layout = ({ children }) => {
  const { currentUser } = useStoreon('currentUser')

  return (
    <>
      {currentUser ? (
        <>
          <Header />
          <div className={style.layout}>{children}</div>
        </>
      ) : null}
    </>
  )
}

export default Layout