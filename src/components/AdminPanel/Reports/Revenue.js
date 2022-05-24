import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { PreloaderPage } from '../../../views';
import DateSearch from '../../TableSettings/DateSearch';
import { formatDateToInput } from '../../../utils/date';

import style from '../style.module.scss';
import table_style from '../../CheckTable/check_table.module.scss'

import api from '../../../api'

const Revenue = ({ children }) => {
  const [revenueList, setRevenueList] = useState([])

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
      api.getRevenueData(filters)
        .then((res) => {
          setRevenueList(res)
          setLoading(false)
        })
        .catch(err => {
          console.log('err', err)
          setLoading(false)
        })
    }
    else {
      setRevenueList([])
    }
  }, [filters])

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
  })

  return (
    <div>
      {children}
      <h2 className={style.header_right}>Выручка, валовая прибыль и кол-во примененных бонусов за выбранный период</h2>
      <div className={style.grid_row}>
        <DateSearch filters={filters} setFilters={setFilters} />
      </div>
      <div className={classNames(table_style['table-grid'], style.container__right, style.container__right_gragh)}>
        <div className={classesScroll}>
          <div className={style.chart}>
            <LineChart
              width={1000}
              height={400}
              data={revenueList}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name">
                <Label value="Дата" offset={-10} position="insideBottomRight" />
              </XAxis>
              <YAxis>
                <Label value="Выручка" angle={-90} position="insideTopLeft" dy={63} dx={-20} />
              </YAxis>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="выручка" stroke="#82ca9d" />
              <Line type="monotone" dataKey="валовая прибыль" stroke="#8884d8" />
              <Line type="monotone" dataKey="использовано бонусов" stroke="#ca8f82" />
            </LineChart>
          </div>
        </div>
      </div>
      {loading && <PreloaderPage loaderClass='admin_panel' />}
    </div>
  )
}

export default Revenue