/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import classNames from 'classnames';
import { GxTextarea } from '@garpix/garpix-web-components-react';
import style from './textArea.module.scss';

const Textarea = ({ nameOfStyle = null, label = '', value = null, resize = 'none', rows = '4', ...props }) => {
  const classes = classNames({
    [style.textarea]: true,
    [style[`${nameOfStyle}`]]: nameOfStyle,
  })

  return (
    <GxTextarea value={value} className={classes} label={label} resize={resize} rows={rows} {...props} />
  );
}

export default Textarea