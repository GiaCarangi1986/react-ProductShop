import React from 'react'
import classNames from 'classnames'
import { GxDropdown } from '@garpix/garpix-web-components-react';
import style from './dropdown.module.scss';

const Dropdown = ({
  children = null,
  open,
  notFull = false,
  distance = 5,
  setOpenDropdown = () => { },
  setHideDropdown = () => { },
  className = '',
  withoutBase = false,
}) => {
  const classes = classNames({
    [style.dropdown]: !withoutBase,
    [style['dropdown-not-full']]: notFull,
    [style[`dropdown_${className}`]]: className,
  })

  return (
    <GxDropdown
      hoist
      open={open}
      onGx-hide={setHideDropdown}
      onGx-show={setOpenDropdown}
      distance={distance}
      className={classes}
    >
      {children}
    </GxDropdown>
  )
}

export default Dropdown