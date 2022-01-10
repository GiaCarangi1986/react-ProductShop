import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../../const'
import style from './navigation.module.scss'

const HeaderNavigation = () => {
  const setStyle = ({ isActive = false }) => {
    return (
      classNames({
        [style.navigation_link]: true,
        [style.navigation_link_special]: isActive,
      })
    )
  }

  return (
    <ul className={style.navigation} data-cy='ul'>
      <li>
        <NavLink
          to={PATHS.check_operations.path}
          className={setStyle}
        >
          Операции с чеками
        </NavLink>
      </li>
      <li>
        <NavLink
          to={PATHS.crud_operations.path}
          className={setStyle}
        >
          Работа с таблицами
        </NavLink>
      </li>
    </ul>
  )
}

export default HeaderNavigation
