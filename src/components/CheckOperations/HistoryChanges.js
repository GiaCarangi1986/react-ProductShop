import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button } from '../../views'
import style from './check_operations.module.scss';

const HistoryChanges = ({
  viewCheck
}) => {
  const {
    historyDatesList = [],
    activeLine = -1,
    setActiveLine = () => { }
  } = viewCheck

  return (
    <ul>
      {historyDatesList.map(line => {
        return (
          <li key={line.id}>
            <Button>
              {line.date_time}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

export default HistoryChanges;