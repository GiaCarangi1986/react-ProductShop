import React from 'react'
import { Dropdown, Button, Icon, Menu } from '../../views'

import style from './style.module.scss'

const DropdownAction = ({
  distance = 0,
  visiableText = '',
  options = []
}) => {
  return (
    <Dropdown distance={distance} className='user' withoutBase>
      <Button slot='trigger' variant='text' className='user'>
        <div className={style.title}>
          <span className={style.name}>{visiableText}</span>
          <Icon
            icon='dropdownArrow'
            nameOfStyle='arrow'
          />
        </div>
      </Button>
      <Menu styleForMenu='user' styleForMenuItem='user' items={options} />
    </Dropdown>
  )
}

export default DropdownAction