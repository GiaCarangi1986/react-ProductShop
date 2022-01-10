import React from 'react'
import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { PATHS } from '../../const'
import style from './navigation.module.scss'

const HeaderNavigation = () => {
  const location = useLocation()
  const { path } = PATHS.check_operations

  const mainActiveClasses = classNames({
    [style.navigation_link_special]: location.pathname === path
  })

  return (
    <ul className={style.navigation} data-cy='ul'>
      <li>
        <NavLink
          to={PATHS.check_operations.path}
          className={style.navigation_link}
          activeClassName={mainActiveClasses}>
          Операции с чеками
        </NavLink>
      </li>
      <li>
        <NavLink
          to={PATHS.crud_operations.path}
          className={style.navigation_link}
          activeClassName={style.navigation_link_special}>
          Работа с таблицами
        </NavLink>
      </li>
    </ul>
  )
}

export default HeaderNavigation
