import React, { useState } from 'react'
import { Switch } from '../../views'
import { TABLE_EVENT_TYPES, FORM_FIELDS } from '../../const'
import style from './table-settings.module.scss'

const SwitchBlock = ({ settingsDisabled = false, setEventType = () => { }, setFilters = () => { }, filters = {} }) => {
  const handleChangeSwitch = (e) => {
    setEventType(TABLE_EVENT_TYPES.checksVisable)

    const name = e.target.name
    const oldFilters = { ...filters }
    oldFilters[name] = e.target.checked
    setFilters({ ...filters, ...oldFilters })
  }

  return (
    <div className={style['table-settings-filter-check']}>
      <Switch text='Оплаченные чеки' checked={filters?.paided_show} name={FORM_FIELDS.paided_show} onGx-change={handleChangeSwitch} disabled={settingsDisabled} />
      <Switch text='Отложенные чеки' checked={filters?.delayed_show} name={FORM_FIELDS.delayed_show} onGx-change={handleChangeSwitch} disabled={settingsDisabled} />
      <Switch text='Редактированные чеки' checked={filters?.changed_show} name={FORM_FIELDS.changed_show} onGx-change={handleChangeSwitch} disabled={settingsDisabled} />
    </div>
  )
}

export default SwitchBlock
