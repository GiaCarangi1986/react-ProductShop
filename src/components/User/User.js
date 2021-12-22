import React, { useEffect, useState } from 'react'
import {
  GxDropdown,
  GxMenu,
  GxMenuItem,
  GxButton,
} from '@garpix/garpix-web-components-react'
import { Button, Icon } from '../../views'
import { MODAL_TYPES } from '../../const'
import style from './user.module.scss'

const User = () => {
  const [userFullName, setUserFullName] = useState(null)

  const logout = () => console.log('logout');

  return (
    <div className={style.user_container}>
      <div className={style.user}>
        <Icon icon='user' nameOfStyle='user' />
      </div>
      <GxDropdown distance='20' className={style.user_dropdown}>
        <GxButton slot='trigger' variant='text' className={style.user_button}>
          <div className={style.user_title}>
            <span className={style.user_name}>{userFullName}</span>
            <Icon
              icon='dropdownArrow'
              nameOfStyle='arrow'
              className={style.user_icon}
            />
          </div>
        </GxButton>
        <GxMenu className={style.user_menu}>
          <GxMenuItem className={style.user_menu_item}>
            <Button variant='text' onClick={logout}>
              Выйти
            </Button>
          </GxMenuItem>
        </GxMenu>
      </GxDropdown>
    </div>
  )
}

export default User
