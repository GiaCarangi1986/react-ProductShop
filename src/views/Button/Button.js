import React from 'react'
import classNames from 'classnames';
import { GxButton } from '@garpix/garpix-web-components-react';
import style from './button.module.scss';

const Button = ({
  children = null,
  variant = 'primary',
  className = null,
  anotherClass = null,
  isSortBtn = false,
  orderingType = false,
  open = false,
  buttonDis = false,
  ...props
}) => {
  const classes = classNames({
    [style.button]: true,
    [style['sort-btn']]: isSortBtn,
    [style['sort-btn-first']]: orderingType,
    [style[`${className}`]]: className,
    [style[`${anotherClass}`]]: anotherClass,
    [style['dropdown-btn-open-dropdown']]: open,
    [style.outline]: props.outline,
    [style.buttonDis]: buttonDis,
  })

  return (
    <GxButton
      className={classes}
      variant={variant}
      {...props}>
      {children}
    </GxButton>
  )
}

export default Button
