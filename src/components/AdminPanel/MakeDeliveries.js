import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Button, Form, Icon, Input } from '../../views';
import {
  MAKE_DELIVERS_HEADER,
  WIDTH_COL_MAKE_DELIVERS,
  MAKE_DELIVERS_LINE_ADDING,
  WIDTH_COL_MAKE_DELIVERS_TBODY,
  UNITS
} from '../../const';
import style from './style.module.scss';
import table_style from '../CheckTable/check_table.module.scss'

import api from '../../api'

const MakeDeliveries = ({ children, make_deliveries }) => {
  const {
    productList = [],
    setProductList = () => { },
  } = make_deliveries

  const [curProductList, setCurProductList] = useState([])

  const onSubmit = () => console.log('hello');

  useEffect(() => {
    if (!productList.length) {
      api.getListForMakeDilevers()
        .then(res => {
          setProductList(res)
          setCurProductList(res)
        })
        .catch(err => {
          console.log('err', err) // далее добавить сюда строку под выводит ошибок (под кнопкой я бы сделала тут)
        })
    }
  }, [])

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
    [style['table_scroll-horizontal']]: true,
  })

  const totalInfo = 'Итого:'
  const totalSum = 10
  return (
    <div>
      {children}
      <Form onGx-submit={onSubmit} data-cy='form'>
        <div className={classNames(table_style['table-grid'], style.container__right)}>
          <div className={classesScroll}>
            <div className={table_style['table-layout']}>
              <table className={table_style.table}>
                <thead className={table_style['table-head']}>
                  <tr className={table_style['table-row']}>
                    {Object.keys(MAKE_DELIVERS_HEADER).map(header => {
                      const w = WIDTH_COL_MAKE_DELIVERS[header] || 30
                      return (
                        <th key={header} className={table_style['table-col']}>
                          <div style={{ width: `${w}px`, margin: 'auto' }}>
                            {MAKE_DELIVERS_HEADER[header]}
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody className={table_style['table-body']}>
                  {curProductList.map(line => {
                    const classesRow = classNames({
                      [table_style['table-row']]: true,
                    })

                    return (
                      <tr key={`${line.id}`} className={classesRow}>
                        <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])} key='action_colunm'>
                          <div style={{ width: '50px', margin: 'auto' }} className={style.actions}>
                            <Button
                              className='button-edit_action'
                              title='Убавить кол-во'
                              // name={{ id: line.id, old_product: line.old_product }}
                              value={-1}
                              // onClick={changeProductCount}
                              disabled={line.count === 0}
                              variant='text'
                              data-cy='btn'
                            >
                              <Icon slot='icon-left' icon='minus' />
                            </Button>
                            <Input value={line.count} type='number' nameOfStyle='input_count' />
                            <Button
                              className='button-edit_action'
                              title='Прибавить кол-во'
                              // name={{ id: line.id, old_product: line.old_product }}
                              value={1}
                              // onClick={changeProductCount}
                              variant='text'
                              data-cy='btn'
                            >
                              <Icon slot='icon-left' icon='plus' />
                            </Button>
                          </div>
                        </td>
                        {Object.keys(MAKE_DELIVERS_LINE_ADDING).map(product_line => {
                          const leftOrCenter = Number.isNaN(Number(`${line[product_line]}`));
                          const tdClasses = classNames({
                            [table_style['table-col']]: true,
                            [table_style['table-col_left']]: leftOrCenter
                          })
                          const w = WIDTH_COL_MAKE_DELIVERS_TBODY[product_line] || ''
                          const margin = leftOrCenter ? '' : 'auto'
                          const value = product_line === MAKE_DELIVERS_LINE_ADDING.count ?
                            line.unit === UNITS[1] ? line[product_line] + ', кг' : line[product_line] + ', шт' :
                            line[product_line]
                          return (
                            <td className={tdClasses} key={product_line}>
                              <div style={{ width: `${w - 1}px`, margin }}>{value}</div>
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
        <div className={style.wrap_row}>
          <div className={style.wrap_col}>
            <span className={style.text}>{totalInfo}</span>
          </div>
          <div className={style.wrap_btn}>
            <Button
              type='submit'
              className='btn_width-100'
              data-cy='btn'
              buttonDis
              disabled={!totalSum}
            >
              Заказать
            </Button>
            {/* для подверждения заказа модалка пусть вылезает */}
          </div>
        </div>
      </Form>
    </div>
  )
}

export default MakeDeliveries