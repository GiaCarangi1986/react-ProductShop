import React from 'react'
import classNames from 'classnames';
import style from './error-text.module.scss';

const ErrorText = ({ children, absolute = false, errorClass=null }) => {
  const classes = classNames({
    [style['error-text']]: true,
    [style['error-text-absolute']]: absolute,
    [style[`error-${errorClass}`]]: errorClass,
  })
    return (
    <div className={classes}>{children}</div>
  )
}

export default ErrorText
