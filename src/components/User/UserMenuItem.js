import React from 'react'

import style from './user.module.scss'

const UserMenuItem = ({ text = '' }) => {
  return <li className={style.user_menu_item}>{text}</li>
}

export default UserMenuItem
