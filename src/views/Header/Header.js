import React from 'react';
import User from '../../components/User';
import Logo from '../Logo';
import HeaderNavigation from '../Navigation';

import style from './header.module.scss';

const Header = () => {

  return (
    <header className={style.header}>
      <div className={style.header__column}>
        <Logo icon='logo' variant='header' />
        <nav className={style.header__navigation}>
          <HeaderNavigation />
        </nav>
        <User />
      </div>
    </header>
  );
};

export default Header;