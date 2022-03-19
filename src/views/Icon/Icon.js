import React from 'react'
import classNames from 'classnames';
import { GxIcon } from '@garpix/garpix-web-components-react';
import style from './icon.module.scss';

import {
  arrowBack,
  arrowDown,
  arrowUp,
  dragIcon,
  filters,
  logo,
  search,
  settings,
  write,
  dropdownArrow,
  user,
  sortIcon,
  trash,
  copyIcon,
  archiveIcon,
  exportExcel,
  plus,
  minus
} from '../../images';

const ICON_SRCS = {
  arrowBack,
  arrowDown,
  arrowUp,
  dragIcon,
  dropdownArrow,
  user,
  default: '',
  filters,
  logo,
  search,
  settings,
  sortIcon,
  write,
  trash,
  copyIcon,
  archiveIcon,
  exportExcel,
  plus,
  minus
}

const Icon = ({ children, icon = 'default', nameOfStyle = null, slot = 'icon-left' }) => {
  const classes = classNames({
    [style.icon]: true,
    [style[`icon_${nameOfStyle}`]]: nameOfStyle,
  })

  if (ICON_SRCS[icon]) {
    return (
      <GxIcon src={ICON_SRCS[icon]} slot={slot} className={classes}>{children}</GxIcon>
    )
  }
  return null
}

export default Icon
