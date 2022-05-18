import React from 'react'
import DropdownAction from './DropdownAction'

import style from './style.module.scss'

const DropdownDescription = ({
  distance = 5,
  visiableText = '',
  options = [],
  text = ''
}) => {
  return (
    <div className={style.period}>
      <p className={style.period__text}>{text}</p>
      <DropdownAction distance={distance} visiableText={visiableText} options={options} />
    </div>
  )
}

export default DropdownDescription
