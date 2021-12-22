import React from 'react'
import classNames from 'classnames';
import style from './fieldset.module.scss';
import ErrorText from '../ErrorText';

const Fieldset = ({ children = null, error = null, touched = null, errorClass = null }) => {
  const classes = classNames({
    [style.fieldset]: true,
    [style['fieldset-error']]: error && touched,
    [style['fieldset-error-text']]: !errorClass && error && touched,
  })

  return (
    <fieldset className={classes}>
      {children}
      {error && touched ? <ErrorText absolute errorClass={errorClass}>{error}</ErrorText> : null}
    </fieldset>
  )
}

export default Fieldset