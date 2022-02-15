import React, { useState } from 'react'
import classNames from 'classnames'
import { useStoreon } from 'storeon/react'
import {
  MODAL_TYPES,
} from '../../const'
import { Button, Switch } from '../../views'
import { NAMES } from '../../const'
import DateSearch from './DateSearch'
import style from './table-settings.module.scss'

const TableSettings = ({
  children = null,
  settingsDisabled = false,
  setEventType = () => { },
  // isLoaded = false,
  // resultsLen = 0,
}) => {
  const { dispatch } = useStoreon()

  const resetAllFilters = () => {
    dispatch('params/reset')
  }

  const openCreateModal = () => {
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.service,
      tariff: { data: null, type: 'create' },
    })
  }

  const classes = classNames({
    [style['table-settings-col']]: true,
    // [style['table-settings-col_none']]: !isShowResetBtn,
    [style['table-settings__right_btn-second']]: true,
  })

  return (
    <div className={style['table-settings']}>
      <div className={style['table-settings__left']}>
        <DateSearch />
        <div className={style['table-settings-filter-check']}>
          <Switch text='Отложенные чеки' checked />
          <Switch text='Удаленные чеки' checked />
          <Switch text='Редактированные чеки' checked />
        </div>
      </div>

      <div className={style['table-settings__right']}>
        {children}
        <div className={style['table-settings-col']}>
          <Button onClick={openCreateModal}>
            <span slot='icon-left'>+</span>
            Добавить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TableSettings
