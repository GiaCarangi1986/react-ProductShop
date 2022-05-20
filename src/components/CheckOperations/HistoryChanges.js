import React from 'react'
import { Button, ErrorText } from '../../views'
import style from './check_operations.module.scss';

const HistoryChanges = ({
  viewCheck
}) => {
  const {
    addedChecks = [],
    activeLine = -1,
    updateCheckInfo = () => { },
    error = []
  } = viewCheck

  const setActiveBtn = (e) => {
    const lineProps = e.target.name
    updateCheckInfo({
      id: lineProps?.id,
      linesCheckList: lineProps?.linesCheckList,
      totalCost: lineProps?.totalCost,
      cardId: lineProps?.cardId,
      paid: lineProps?.paid,
      bonus_count: lineProps?.bonus_count,
    })
  }

  return (
    <>
      <div className={style.histoty_btns_container_wrap}>
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
                    paid: line.paid,
                    bonus_count: line.bonus_count
                  }}
                  onClick={setActiveBtn}
                  className={activeStyle}
                >
                  {`id=${line.id} - ${line.date_time}, ${line.kassirName}`}
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className={style.block_error}>
        <ErrorText errorClass='form'>
          {error[1]}
        </ErrorText>
      </div>
    </>
  )
}

export default HistoryChanges;