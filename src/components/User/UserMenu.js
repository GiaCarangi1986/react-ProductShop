import React from 'react'
import style from './user.module.scss'

const UserMenu = ({ children = null }) => {
  return <ul className={style.user_menu} data-cy='ul'>{children}</ul>
}

export default UserMenu
