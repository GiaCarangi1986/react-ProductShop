import React from 'react'
import { GxMenu, GxMenuItem } from '@garpix/garpix-web-components-react';
import style from './dropdown.module.scss';

const ItemsBase = ({items = null }) => (

  <GxMenu className={style['dropdown-menu']}>
    {items && Object.keys(items).map(key => (
      <GxMenuItem key={key} className={style['dropdown-menu__item']}>{items[key]}</GxMenuItem>
    ))}
  </GxMenu>
)

export default ItemsBase