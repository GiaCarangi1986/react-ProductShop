import React, { useState } from 'react'
import { Switch } from '../../views'
import { FORM_FIELDS } from '../../const'
import style from './table-settings.module.scss'

const SwitchBlock = ({ settingsDisabled = false, setFilters = () => { }, filters = {} }) => {
  const [checked, setChecked] = useState({
    paided_show: filters?.paided_show || true, // показывать оплаченные чеки
    delayed_show: filters?.delayed_show || true, // был ли чек редактирован
    changed_show: filters?.changed_show || true // был ли чек отложен
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
        text='Оплаченные чеки'
        value={String(+checked.paided_show)}
        checked={checked.paided_show}
        name={FORM_FIELDS.paided_show}
        onGx-change={handleChangeSwitch}
        disabled={settingsDisabled}
      />
      <Switch
        text='Отложенные чеки'
        value={String(+checked.delayed_show)}
        checked={checked.delayed_show}
        name={FORM_FIELDS.delayed_show}
        onGx-change={handleChangeSwitch}
        disabled={settingsDisabled}
      />
      <Switch
        text='Редактированные чеки'
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
