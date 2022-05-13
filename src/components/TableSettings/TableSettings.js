import React from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react'
import { Button } from '../../views'
import DateSearch from './DateSearch'
import SwitchBlock from './SwitchBlock';
import { PATHS, PAGES_TYPES, TABLE_EVENT_TYPES } from '../../const';
import style from './table-settings.module.scss'

const TableSettings = ({
  children = null,
  setEventType = () => { },
  displayLoadBtn = false,
  filters = {},
  setFilters = () => { },
  count = 0
}) => {
  const { dispatch } = useStoreon()
  const navigate = useNavigate();

  const openCreateCheckPage = () => {
    dispatch('page/toggle', {
      headers: { main: 'Создание покупки', left: 'Составляющие покупки', right: 'Состав покупки', btnText: 'Перейти к оплате', type: PAGES_TYPES.addCheck, },
    })
    navigate(PATHS.check_operations.path)
  }

  const showAll = () => {
    setEventType(TABLE_EVENT_TYPES.allLoaded)

    const oldFilters = { ...filters }
    oldFilters.page_size = count
    setFilters(oldFilters)
  }

  return (
    <div className={style['table-settings']}>
      <div className={style['table-settings__left']}>
        <DateSearch setEventType={setEventType} setFilters={setFilters} filters={filters} />
        <SwitchBlock setFilters={setFilters} filters={filters} />
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
              onClick={showAll}
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
