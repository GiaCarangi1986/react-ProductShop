import React from 'react'
import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { PATHS } from '../../const'
import style from './navigation.module.scss'

const HeaderNavigation = () => {
  const location = useLocation()
  const { path } = PATHS.services_classifier

  const mainActiveClasses = classNames({
    [style.navigation_link_special]: location.pathname === path
  })

  return (
    <ul className={style.navigation} data-cy='ul'>
      <li>
        <NavLink
          to={PATHS.services_classifier.path}
          className={style.navigation_link}
          activeClassName={mainActiveClasses}>
          Классификатор услуг
        </NavLink>
      </li>
      <li>
        <NavLink
          to={PATHS.history_table.path}
          className={style.navigation_link}
          activeClassName={style.navigation_link_special}>
          История изменений
        </NavLink>
      </li>
    </ul>
  )
}

export default HeaderNavigation
