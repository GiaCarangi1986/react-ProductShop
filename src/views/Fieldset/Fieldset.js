import React from 'react'
import classNames from 'classnames';
import style from './fieldset.module.scss';
import ErrorText from '../ErrorText';

const Fieldset = ({ children = null, error = null, touched = null, errorClass = null, date = false, containerClass = '' }) => {
  const classes = classNames({
    [style.fieldset]: true,
    [style['fieldset-error']]: error && touched,
    [style['fieldset-error-text']]: !errorClass && error && touched,
    [style[containerClass]]: containerClass,
  })

  return (
    <fieldset className={classes}>
      {children}
      {error && touched ? <ErrorText absolute date={date} errorClass={errorClass}>{error}</ErrorText> : null}
    </fieldset>
  )
}

export default Fieldset