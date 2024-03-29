import React from 'react'
import classNames from 'classnames';
import { GxSwitch } from '@garpix/garpix-web-components-react';
import style from './switch.module.scss';

const Switch = ({ nameOfStyle = null, text, containerClass = '', ...props }) => {
  const classes = classNames({
    [style.switch]: true,
    [style[`switch_${nameOfStyle}`]]: nameOfStyle,
  })

  return (
    <div className={classNames(style.wrap, style[containerClass])}>
      <GxSwitch className={classes} {...props} />
      <span className={style.text_rigth}>
        {text}
      </span>
    </div >
  )
}

export default Switch
