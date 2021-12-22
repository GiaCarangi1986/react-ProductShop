import React from 'react'
import {GxCheckbox} from '@garpix/garpix-web-components-react'
import style from './checkbox.module.scss';

const Checkbox = ({ children = '', ...props }) => {
  return (
    <GxCheckbox
      className={style.checkbox}
      {...props}
    >
      {children}
    </GxCheckbox>
  )
}

export default Checkbox