import React from 'react';
import classNames from 'classnames';
import { GxInput } from '@garpix/garpix-web-components-react';
import style from './input.module.scss';

const Input = ({
  children = null,
  nameOfStyle = null,
  otherStyle = null,
  value = null,
  clearable,
  ...props
}) => {

  const classes = classNames({
    [style.input]: true,
    [style[`${nameOfStyle}`]]: nameOfStyle,
    [style[`${otherStyle}`]]: otherStyle,
    [style['input-value']]: value
  })

  const inputClearable = clearable && value && value !== '' || null;

  return (
    <GxInput
      value={value}
      className={classes}
      clearable={inputClearable}
      {...props}>
      {children}
    </GxInput>
  );
}

export default Input