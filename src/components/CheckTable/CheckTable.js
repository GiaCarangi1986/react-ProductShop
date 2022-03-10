import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { dataStates } from '@garpix/fetcher'
import Table from './Table'
import TableSettings from '../TableSettings'
import { Button, Icon, PreloaderPage } from '../../views'
import AddOrUpdateCheckModal from '../Modal';
import {
  TABLE_EVENT_TYPES,
  WIDTH_COL,
} from '../../const'

import style from './check_table.module.scss'

const CheckTable = ({
  count,
  results = [],
  filterParams = {},
  showMore = () => { },
  status,
  otherData = {},
  isNext,
}) => {

  /* TODO: медиа запросы поправить сворачивание шапки */
  const [eventType, setEventType] = useState(null)
  const [colsTrue, setColsTrue] = useState([])
  const [cols, setCols] = useState(null)
  const [statusLoading, setStatusLoading] = useState(status)

  useEffect(() => { // ok
    setStatusLoading(status)
  }, [status])

  useEffect(() => {
    let newVals = []
    if (cols) {
      Object.keys(cols).map((elem) => {
        newVals = [...newVals, elem]
        return newVals
      })
    }
    setColsTrue(newVals)
  }, [cols])

  useEffect(() => {
    setCols(otherData?.cols_names || null)
  }, [otherData])

  const overlayClasses = classNames({
    [style['table-grid']]: true,
    [style['grid-rows']]: count > 0 && results.length !== count,
    [style.table_hide]: count === 0,
  })

  return (
    <>
      <TableSettings
        setEventType={setEventType}
        settingsDisabled={results.length === 0}
        isLoaded={status === dataStates.loaded}
        resultsLen={results.length}
      />
      <div className={overlayClasses}>
        <Table
          filterParams={filterParams}
          isNext={isNext}
          status={status}
          colsTrue={colsTrue}
          cols={cols}
          count={count}
          showMore={showMore}
          resultsLen={results.length}
          setEventType={setEventType}
          eventType={eventType}
          isLoaded={status === dataStates.loaded}
        >
          <tbody className={style['table-body']}>
            {results.map((elem) => {
              const key = `service-row-${elem.id}`;
              const classesRow = classNames({
                [style['table-row']]: true,
                // [style['table-row_archive']]: !elem.is_available
              })
              return (
                <tr data-test={key} key={key} className={classesRow}>
                  <td className={classNames(style['table-col'], style['table-col-full-rights'])}>
                    <div style={{ width: '49px', margin: 'auto' }}>
                      <Button
                        className='button-edit-copy'
                        title='Копировать'
                        variant='text'
                        data-cy='btn'
                      >
                        <Icon slot='icon-left' icon='copyIcon' />
                      </Button>
                      <Button
                        className='button-edit-edit'
                        title='Редактировать'
                        disabled={!elem.is_available || elem.num_clients > 0}
                        variant='text'
                        data-cy='btn'
                      >
                        <Icon slot='icon-left' icon='write' />
                      </Button>
                    </div>
                  </td>
                  {cols && colsTrue.map((col) => {
                    const keyCol = `${col}`
                    let colValue = elem[col]
                    const leftOrCenter = Number.isNaN(Number(`${elem[col]}`));
                    const tdClasses = classNames({
                      [style['table-col']]: true,
                      [style['table-col_left']]: leftOrCenter
                    })
                    const w = WIDTH_COL[col] || ''
                    const m = leftOrCenter ? '' : 'auto'
                    return (
                      <td key={keyCol} className={tdClasses}>
                        <div style={{ width: `${w - 1}px`, margin: m }}>{colValue}</div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
        {status === dataStates.loaded && results.length === 0 ? (
          <div className={style['notresult-block']}>
            <div className={style['notresult-text']}>
              <span>Данные не найдены</span>
            </div>
          </div>
        ) : null}
        {count > 0 && results.length !== count && eventType !== TABLE_EVENT_TYPES.allLoaded ? (
          <div className={style['download-all-btn']}>
            <div className={style['download-all-btn-else']}>
              <Button
                type='button'
                onClick={() => {
                  setEventType(TABLE_EVENT_TYPES.allLoaded)
                }}
                outline
              >
                Отобразить все
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      {statusLoading === dataStates.loading && eventType !== TABLE_EVENT_TYPES.scroll ? <PreloaderPage /> : null}
      <AddOrUpdateCheckModal
        results={results}
        filterParams={filterParams}
        setEventType={setEventType}
      // updateElement={updateElement}
      // loadData={loadData}
      />
    </>
  )
}

export default CheckTable
