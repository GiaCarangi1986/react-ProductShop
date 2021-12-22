import React from 'react'
import { GxSelect, GxMenuItem } from '@garpix/garpix-web-components-react';
import style from './select.module.scss';

const Select = ({items = [{label: 'select'}], ...props}) => (
  <GxSelect {...props} className={style.select}>
    {items && items.map(elem => (
      <GxMenuItem key={elem.label} value={elem.label}>
        {elem.label}
      </GxMenuItem>
    ))}
  </GxSelect>
)

export default Select