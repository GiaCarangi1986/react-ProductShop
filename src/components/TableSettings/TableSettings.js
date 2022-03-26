import React, { useState } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react'
import { Button, Switch } from '../../views'
import DateSearch from './DateSearch'
import { PATHS, PAGES_TYPES } from '../../const';
import style from './table-settings.module.scss'

const TableSettings = ({
  children = null,
  settingsDisabled = false,
  setEventType = () => { },
  displayLoadBtn = false,
  // isLoaded = false,
  // resultsLen = 0,
}) => {
  const { dispatch } = useStoreon()
  const navigate = useNavigate();

  // const openCreateModal = () => {
  //   dispatch('modal/toggle', {
  //     modal: MODAL_TYPES.service,
  //     tariff: { data: null, type: 'create' },
  //   })
  // }

  const openCreateCheckPage = () => {
    dispatch('page/toggle', {
      headers: { main: 'Добавление чека', left: 'Составляющие чека', right: 'Чек-лист', btnText: 'Перейти к оплате', type: PAGES_TYPES.addCheck, },
      // для редактир. чека альтернатива - перейти к выплате
    })
    navigate(PATHS.check_operations.path)
  }

  // const classes = classNames({
  //   [style['table-settings-col']]: true,
  //   // [style['table-settings-col_none']]: !isShowResetBtn,
  //   [style['table-settings__right_btn-second']]: true,
  // })

  return (
    <div className={style['table-settings']}>
      <div className={style['table-settings__left']}>
        <DateSearch />
        <div className={style['table-settings-filter-check']}>
          <Switch text='Отложенные чеки' />
          <Switch text='Удаленные чеки' />
          <Switch text='Редактированные чеки' />
        </div>
      </div>

      <div className={style['table-settings__right']}>
        {children}
        <div className={style['table-settings__right_btns']}>
          <div className={classNames(style['table-settings-col'], style['table-settings-col_add'])}>
            <Button onClick={openCreateCheckPage} className='btn_width-100'>
              <span slot='icon-left'>+</span>
              Добавить
            </Button>
          </div>
          {displayLoadBtn && (
            <Button
              type='button'
              onClick={() => {
                // setEventType(TABLE_EVENT_TYPES.allLoaded)
              }}
              outline
              className='btn_width-100'
            >
              Отобразить все
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TableSettings
