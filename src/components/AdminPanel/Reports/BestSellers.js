import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { PreloaderPage } from '../../../views';
import {
  BEST_SELLERS,
  WIDTH_COL_BEST_SELLERS,
} from '../../../const';
import DateSearch from '../../TableSettings/DateSearch';
import { formatDateToInput } from '../../../utils/date';

import style from '../style.module.scss';
import table_style from '../../CheckTable/check_table.module.scss'

import api from '../../../api'

const BestSellers = ({ children, best_saler }) => {
  const {
    peopleList,
    setPeopleList
  } = best_saler

  const initDateValues = {
    date_search: {
      start_at: formatDateToInput(new Date(Date.now() - 604800000)),
      end_at: formatDateToInput(new Date())
    }
  }

  const [filters, setFilters] = useState(initDateValues)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (filters?.date_search?.start_at) {
      setLoading(true)
      api.getBestSellers(filters)
        .then((res) => {
          setPeopleList(res)
          setLoading(false)
        })
        .catch(err => {
          console.log('err', err)
          setLoading(false)
        })
    }
    else {
      setPeopleList([])
    }
  }, [filters])

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
  })

  return (
    <div>
      {children}
      <h2 className={style.header_right}>Лучшие продавцы на основе продаж за выбранный период</h2>
      <div className={style.grid_row}>
        <DateSearch filters={filters} setFilters={setFilters} />
      </div>
      <div className={classNames(table_style['table-grid'], style.container__right, style.container__right_small)}>
        <div className={classesScroll}>
          <div className={table_style['table-layout']}>
            <table className={table_style.table}>
              <thead className={table_style['table-head']}>
                <tr className={table_style['table-row']}>
                  {Object.keys(BEST_SELLERS).map(header => {
                    const w = WIDTH_COL_BEST_SELLERS[header] || 30
                    return (
                      <th key={header} className={table_style['table-col']}>
                        <div style={{ minWidth: `${w}px`, margin: 'auto' }}>
                          {BEST_SELLERS[header]}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className={table_style['table-body']}>
                {peopleList.map((line) => {
                  const classesRow = classNames({
                    [table_style['table-row']]: true,
                  })
                  return (
                    <tr key={`${line.id}`} className={classesRow}>
                      {Object.keys(BEST_SELLERS).map(product_line => {
                        const leftOrCenter = Number.isNaN(Number(`${line[product_line]}`));
                        const tdClasses = classNames({
                          [table_style['table-col']]: true,
                          [table_style['table-col_left']]: leftOrCenter
                        })
                        const w = WIDTH_COL_BEST_SELLERS[product_line] || ''
                        const margin = leftOrCenter ? '' : 'auto'
                        return (
                          <td className={tdClasses} key={product_line}>
                            <div style={{ minWidth: `${w - 1}px`, margin }}>{line[product_line]}</div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading && <PreloaderPage loaderClass='admin_panel' />}
    </div>
  )
}

export default BestSellers