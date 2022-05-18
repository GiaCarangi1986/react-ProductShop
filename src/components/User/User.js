import React, { useEffect, useState } from 'react'
import Media from "react-media";
import { Button, Icon, Dropdown, Menu } from '../../views'
import { MODAL_TYPES, SCREENS } from '../../const'
import { useStoreon } from 'storeon/react';
import DropdownAction from '../DropdownAction';
import style from './user.module.scss'

const User = () => {
  const { dispatch, currentUser } = useStoreon('currentUser')
  const [userFullName, setUserFullName] = useState(null)

  const logout = () => {
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
      <Media queries={SCREENS}>
        {(matches) => (
          <DropdownAction distance={matches.middle ? 12 : 20} visiableText={userFullName} options={MENU_OPTIONS} />
        )}
      </Media>
    </div>
  )
}

export default User
