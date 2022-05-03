import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useStoreon } from 'storeon/react'
import { NavLink } from 'react-router-dom'
import { PATHS, USER_ROLE } from '../../const'
import style from './navigation.module.scss'

const HeaderNavigation = () => {
  const { currentUser } = useStoreon('errorPopup', 'currentUser')

  const [haveRights, setHaveRights] = useState(false)

  useEffect(() => {
    setHaveRights(currentUser.role === USER_ROLE.admin)
  }, [currentUser])

  const setStyle = ({ isActive = false }) => {
    return (
      classNames({
        [style.navigation_link]: true,
        [style.navigation_link_special]: isActive,
      })
    )
  }

  return (
    <ul className={style.navigation}>
      <li>
        <NavLink
          to={PATHS.check_list.path}
          className={setStyle}
        >
          Операции с чеками
        </NavLink>
      </li>
      {haveRights && (
        <li>
          <NavLink
            to={PATHS.admin_panel.path}
            className={setStyle}
          >
            Админ панель
          </NavLink>
        </li>
      )}
    </ul>
  )
}

export default HeaderNavigation
