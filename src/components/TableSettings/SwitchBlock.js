import React, { useState } from 'react'
import { Switch } from '../../views'
import { FORM_FIELDS } from '../../const'
import style from './table-settings.module.scss'

const SwitchBlock = ({ settingsDisabled = false, setFilters = () => { }, filters = {} }) => {
  const [checked, setChecked] = useState({
    delayed_show: filters?.delayed_show || false, // показать только неоплаченные (отложенные) чеки
    changed_show: filters?.changed_show || false // показать только редактированные чеки
  })

  const handleChangeSwitch = (e) => {
    const name = e.target.name

    const oldChecked = { ...checked }
    oldChecked[name] = Boolean(!+e.target.value);
    setChecked(oldChecked);

    const oldFilters = { ...filters }
    oldFilters[name] = oldChecked[name]
    setFilters(oldFilters)
  }

  return (
    <div className={style['table-settings-filter-check']}>
      <Switch
        text='Только отложенные чеки'
        value={String(+checked.delayed_show)}
        checked={checked.delayed_show}
        name={FORM_FIELDS.delayed_show}
        onGx-change={handleChangeSwitch}
        disabled={settingsDisabled}
      />
      <Switch
        text='Только редактированные чеки'
        value={String(+checked.changed_show)}
        checked={checked.changed_show}
        name={FORM_FIELDS.changed_show}
        onGx-change={handleChangeSwitch}
        disabled={settingsDisabled}
      />
    </div>
  )
}

export default SwitchBlock
