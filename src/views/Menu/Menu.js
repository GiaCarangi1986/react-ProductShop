import React from 'react'
import { GxMenuItem, GxMenu, GxButton } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from './menu.module.scss';

const Menu = ({ styleForMenu = '', styleForMenuItem = '', items = [], ...props }) => {
  const classesMenu = classNames({
    [style.menu]: true,
    [style[`menu_${styleForMenu}`]]: styleForMenu,
  })
  const classesMenuItem = classNames({
    [style['menu-item']]: true,
    [style[`menu_item_${styleForMenuItem}`]]: styleForMenuItem,
  })

  if (items.length === 0) {
    return null
  }

  return (
    <GxMenu className={classesMenu} {...props}>
      {items && items.map(item => {
        return (
          <GxMenuItem className={classesMenuItem} key={item.value}>
            <GxButton variant='text' onClick={item.func}>
              {item.text}
            </GxButton>
          </GxMenuItem>
        )
      })}
    </GxMenu>
  )
}

export default Menu
