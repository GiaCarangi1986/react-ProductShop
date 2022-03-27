import React from 'react'
import { Button } from '../../views'
import style from './check_operations.module.scss';

const HistoryChanges = ({
  viewCheck
}) => {
  const {
    addedChecks = [],
    activeLine = -1,
    setActiveLine = () => { },
    setLinesOfCheck = () => { },
  } = viewCheck

  const setActiveBtn = (e) => {
    const lineProps = e.target.name
    setActiveLine(lineProps?.id)
    setLinesOfCheck(lineProps?.lines)
  }

  return (
    <ul className={style.histoty_btns_container}>
      {addedChecks.map(line => {
        const activeStyle = activeLine === line.id ? 'item-btn-active' : ''
        return (
          <li key={line.id} className={style.history_item}>
            <Button
              variant='text'
              name={{
                id: line.id,
                lines: line.linesCheckList
              }}
              onClick={setActiveBtn}
              className={activeStyle}
            >
              {`${line.date_time}, ${line.kassirName}`}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

export default HistoryChanges;