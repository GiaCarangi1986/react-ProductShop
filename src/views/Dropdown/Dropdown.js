import React from 'react'
import classNames from 'classnames'
import { GxDropdown } from '@garpix/garpix-web-components-react';
// import Button from '../Button';
// import Icon from '../Icon';
import style from './dropdown.module.scss';

const Dropdown = ({
  // text = '',
  // icon = 'dropdownArrow',
  // iconSlot = 'icon-left',
  children = null,
  open,
  notFull = false,
  distance = 5,
  setOpenDropdown = () => { },
  setHideDropdown = () => { },
  className = '',
  withoutBase = false,
  // isFiltersApplied = false,
  // disabledBtn = false,
}) => {
  const classes = classNames({
    [style.dropdown]: !withoutBase,
    [style['dropdown-not-full']]: notFull,
    [style[`dropdown_${className}`]]: className,
  })

  // const classesCircle = classNames({
  //   [style.circle]: isFiltersApplied,
  // })
  return (
    <GxDropdown
      hoist
      open={open}
      onGx-hide={setHideDropdown}
      onGx-show={setOpenDropdown}
      closeOnSelect={false}
      distance={distance}
      className={classes}
    >
      {/* <Button
        disabled={disabledBtn}
        slot='trigger'
        variant='text'
        className='dropdown-btn'
        data-cy='btn'
        open={open}
      >
        {text}
        <Icon icon={icon} slot={iconSlot} nameOfStyle='dropdown' circle />
        <div className={classesCircle} />
      </Button> */}
      {children}
    </GxDropdown>
  )
}

export default Dropdown