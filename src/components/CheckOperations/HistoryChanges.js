import React from 'react'
import { Button } from '../../views'
import style from './check_operations.module.scss';

const HistoryChanges = ({
  viewCheck
}) => {
  const {
    addedChecks = [],
    activeLine = -1,
    updateCheckInfo = () => { },
  } = viewCheck

  const setActiveBtn = (e) => {
    const lineProps = e.target.name
    updateCheckInfo({
      id: lineProps?.id,
      linesCheckList: lineProps?.linesCheckList,
      totalCost: lineProps?.totalCost,
      cardId: lineProps?.cardId,
      paid: lineProps?.paid
    })
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
                linesCheckList: line.linesCheckList,
                totalCost: line.totalCost,
                cardId: line.cardId,
                paid: line.paid
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