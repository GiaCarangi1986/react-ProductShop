import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon'
import style from './logo.module.scss';

const Logo = ({ variant='header' }) => {
  const classes = classNames({
    [style.logo]: true,
    [style[`logo-${variant}`]]: variant
  })

  return(
  <div className={classes}>
    <Icon icon='logo' />
  </div>
)}

export default Logo;