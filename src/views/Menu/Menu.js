import React from 'react'
import { GxMenu } from '@garpix/garpix-web-components-react';
import { Button } from '..';
import classNames from 'classnames';
import style from './menu.module.scss';

const Menu = ({ styleForMenu = '', styleForMenuItem = '', items = [], ...props }) => {
  const classesMenu = classNames({
    [style.menu]: true,
    [style[`menu_${styleForMenu}`]]: styleForMenu,
  })

  if (items.length === 0) {
    return null
  }

  return (
    <GxMenu className={classesMenu} {...props}>
      {items && items.map(item => {
        return (
          <Button variant='text' onClick={item.func} className='btn_menu_logout' key={item.value}>
            {item.text}
          </Button>
        )
      })}
    </GxMenu>
  )
}

export default Menu
