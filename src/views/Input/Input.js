import React from 'react';
import classNames from 'classnames';
import { GxInput } from '@garpix/garpix-web-components-react';
import style from './input.module.scss';

const Input = ({
  children = null,
  nameOfStyle = null,
  label='',
  value=null,
  clearable,
  ...props
}) => {

  const classes = classNames({
    [style.input]: true,
    [style[`${nameOfStyle}`]]: nameOfStyle,
    [style['input-value']]: value && value !== ''
  })

  const inputClearable = clearable && value && value !== '' || null;

  return (
    <GxInput
      value={value}
      className={classes}
      clearable={inputClearable}
      label={label}
      {...props}>
        {children}
      </GxInput>
  );
}

export default Input