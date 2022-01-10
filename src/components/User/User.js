import React, { useEffect, useState } from 'react'
import { Button, Icon, Dropdown, Menu } from '../../views'
import { MODAL_TYPES } from '../../const'
import { useStoreon } from 'storeon/react';
import style from './user.module.scss'

const User = () => {
  const { dispatch, currentUser } = useStoreon('currentUser')
  const [userFullName, setUserFullName] = useState(null)

  const logout = () => {
    console.log('here');
    dispatch('modal/toggle', { modal: MODAL_TYPES.logout })
  }

  const MENU_OPTIONS = [
    {
      func: logout,
      text: 'Выйти',
      value: 'logout',
    },
  ]

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
      <Dropdown distance='20' className='user' withoutBase>
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
        <Menu styleForMenu='user' styleForMenuItem='user' items={MENU_OPTIONS} />
      </Dropdown>
    </div>
  )
}

export default User
