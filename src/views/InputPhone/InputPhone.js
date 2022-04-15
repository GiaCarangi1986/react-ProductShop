import React from 'react';
import classNames from "classnames";
import { GxPhoneInput } from '@garpix/garpix-web-components-react';
import style from './input.module.scss'

const InputPhoneNumber = ({
  children,
  value = '',
  nameOfStyle = '',
  disabled,
  ...props
}) => {
  const classes = classNames({
    [style.input]: true,
    [style[`${nameOfStyle}`]]: nameOfStyle,
    [style['input-value']]: true
  })
  return (
    <GxPhoneInput
      {...props}
      showDropdown={false}
      countryCodeEditable={false}
      disabled={disabled}
      className={classes}
      value={value}
    >
      {children}
    </GxPhoneInput>
  );
};

export default InputPhoneNumber;
