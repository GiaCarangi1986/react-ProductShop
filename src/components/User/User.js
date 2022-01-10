import React, { useEffect, useState } from 'react'
import {
  GxDropdown,
  GxMenu,
  GxMenuItem,
} from '@garpix/garpix-web-components-react'
import { Button, Icon } from '../../views'
import { MODAL_TYPES } from '../../const'
import { useStoreon } from 'storeon/react';
import style from './user.module.scss'

const User = () => {
  const { dispatch, currentUser } = useStoreon('currentUser')
  const [userFullName, setUserFullName] = useState(null)

  const logout = () => {
    debugger
    dispatch('modal/toggle', { modal: MODAL_TYPES.logout })
  }

  useEffect(() => {
    if (currentUser) {
      const firstName = currentUser.first_name
      const lastName = currentUser.last_name

      if (firstName !== '' && lastName !== '') {
        setUserFullName(`${lastName} ${firstName}`)
      } else {
        setUserFullName('Неизвестный пользователь')
      }
    }
  }, [currentUser])

  return (
    <div className={style.user_container}>
      <div className={style.user}>
        <Icon icon='user' nameOfStyle='user' />
      </div>
      <GxDropdown distance='20' className={style.user_dropdown}>
        <Button slot='trigger' variant='text' className='user'>
          <div className={style.user_title}>
            <span className={style.user_name}>{userFullName}</span>
            <Icon
              icon='dropdownArrow'
              nameOfStyle='arrow'
              className={style.user_icon}
            />
          </div>
        </Button>
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
