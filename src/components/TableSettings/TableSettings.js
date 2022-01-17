import React, { useState } from 'react'
import classNames from 'classnames'
import { useStoreon } from 'storeon/react'
import {
  MODAL_TYPES,
} from '../../const'
import { Button, Icon } from '../../views'
import Search from '../Search'
import style from './table-settings.module.scss'

const TableSettings = ({
  children = null,
  settingsDisabled = false,
  setEventType = () => { },
  // isLoaded = false,
  // resultsLen = 0,
}) => {
  const { dispatch } = useStoreon()
  const [isShowResetBtn, setShowResetBtn] = useState(false) // мб потом сохранять фильтры (причем не на закрытие браузера, а вообще)

  const resetAllFilters = () => {
    dispatch('params/reset')
  }

  const openCreateModal = () => {
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.service,
      tariff: { data: null, type: 'create' },
    })
  }
  const openSettingsTable = () => {
    dispatch('modal/toggle', { modal: MODAL_TYPES.settings })
  }

  const classes = classNames({
    [style['table-settings-col']]: true,
    [style['table-settings-col_none']]: !isShowResetBtn,
    [style['table-settings__right_btn-second']]: true,
  })

  return (
    <div className={style['table-settings']}>
      <div className={style['table-settings__left']}>
        <div className={style['table-settings-col']}>
          <Search setEventType={setEventType} />
        </div>
        <div className={style['table-settings-col']}>
          <Button
            disabled={settingsDisabled}
            onClick={openSettingsTable}
            outline
          >
            <Icon slot='icon-left' icon='settings' />
            Настроить таблицу
          </Button>
        </div>
      </div>

      <div className={style['table-settings__right']}>
        {children}
        <div className={classes}>
          {isShowResetBtn && (
            <Button variant='text' onClick={resetAllFilters} data-cy='btn'>
              Сбросить все фильтры
            </Button>
          )}
        </div>
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
