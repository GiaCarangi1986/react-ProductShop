import React, {
  useEffect,
  useRef
} from 'react'
import classNames from 'classnames'
import { dataStates } from '@garpix/fetcher'
import {
  TABLE_EVENT_TYPES,
  WIDTH_COL
} from '../../const'

import style from './check_table.module.scss'

const Table = ({
  colsTrue,
  cols,
  showMore = () => { },
  isNext,
  children = null,
  status,
  filterParams = {},
  setEventType = () => { },
  eventType,
  filtersList = {},
  resultsLen = 0,
  count = 0,
  ...props
}) => {
  const refContainer = useRef(null)
  const tableScroll = () => {
    const isRef = refContainer && refContainer.current
    const isShowMore = status !== dataStates.loading && isNext
    if (isRef && isShowMore) {
      const { scrollHeight, scrollTop, clientHeight } = refContainer.current
      const scrollPercent = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);
      if (scrollPercent > 50) {
        showMore()
        setEventType(TABLE_EVENT_TYPES.scroll)
      }
    }
  }

  useEffect(() => {
    const isRef = refContainer && refContainer.current
    const arrTypes = [TABLE_EVENT_TYPES.scroll, TABLE_EVENT_TYPES.changeData, TABLE_EVENT_TYPES.allLoaded]
    if (isRef && !arrTypes.includes(eventType)) {
      refContainer.current.scrollTop = 0;
    }
  }, [eventType])

  const classesScroll = classNames({
    [style['table_scroll-horizontal']]: true,
    [style['table_scroll-vertical']]: true,
    [style['table_scroll-horizontal-noResults']]: status === dataStates.loaded && !resultsLen,
    [style['table_scroll-vertical-noResults']]: status === dataStates.loaded && !resultsLen,
  })

  return (
    <div
      className={classesScroll}
      ref={refContainer}
      onScroll={tableScroll}
    >
      <div className={style['table-layout']}>
        <table className={style.table}>
          <thead
            className={style['table-head']}>
            <tr className={style['table-row']}>
              <th key='action_colunm' className={style['table-col']}>
                <div style={{ width: '50px' }} />
              </th>
              {cols && colsTrue.map((key) => {
                const w = WIDTH_COL[key] || 100
                return (
                  <th key={`column-${key}`} className={style['table-col']}>
                    <div style={{ width: `${w}px`, margin: 'auto' }}>
                      {cols[key]}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          {children}
        </table>
      </div>
    </div>
  )
}

export default Table
