import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button } from '../../views'
import style from './check_operations.module.scss';
import table_style from '../CheckTable/check_table.module.scss'

const HistoryChanges = ({
  viewCheck
}) => {
  const {
    historyDatesList = [],
    activeLine = -1,
    setActiveLine = () => { }
  } = viewCheck

  const setActiveBtn = (e) => {
    setActiveLine(e.target.name)
  }

  return (
    <ul className={style.histoty_btns_container}>
      {historyDatesList.map(line => {
        const activeStyle = activeLine === line.id ? 'item-btn-active' : ''
        return (
          <li key={line.id} className={style.history_item}>
            <Button
              variant='text'
              name={line.id}
              onClick={setActiveBtn}
              className={activeStyle}
            >
              {line.date_time}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

export default HistoryChanges;