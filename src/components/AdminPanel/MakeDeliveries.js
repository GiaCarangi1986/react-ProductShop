import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Form, Icon } from '../../views';
import { CHECK_LINES_HEADER, WIDTH_COL_CHECK, CHECK_LINE_ADDING, WIDTH_COL_CHECK_TBODY } from '../../const'; // тут все новое
import style from './style.module.scss';
import table_style from '../CheckTable/check_table.module.scss'

const MakeDeliveries = ({ children }) => {
  const productList = [] // вот это запрос с сервака на получение списка с рекомендациями уже

  const onSubmit = () => console.log('hello');

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
        <div className={classNames(table_style['table-grid'], style.container)}>
          <div className={classesScroll}>
            <div className={table_style['table-layout']}>
              <table className={table_style.table}>
                <thead className={table_style['table-head']}>
                  <tr className={table_style['table-row']}>
                    <th key='action_colunm' className={table_style['table-col']}>
                      <div style={{ width: '50px' }} />
                    </th>
                    {Object.keys(CHECK_LINES_HEADER).map(header => {
                      const w = WIDTH_COL_CHECK[header] || 30
                      return (
                        <th key={header} className={table_style['table-col']}>
                          <div style={{ width: `${w}px`, margin: 'auto' }}>
                            {CHECK_LINES_HEADER[header]}
                          </div>
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody className={table_style['table-body']}>
                  {productList.map(line => {
                    const classesRow = classNames({
                      [table_style['table-row']]: true,
                    })

                    return (
                      <tr key={`${line.id}-${line.old_product}`} className={classesRow}>
                        <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])} key='action_colunm'>
                          <div style={{ width: '50px', margin: 'auto' }}>
                            <Button
                              className='button-edit_action'
                              title='Убавить кол-во'
                              // name={{ id: line.id, old_product: line.old_product }}
                              value={-1}
                              // onClick={changeProductCount}
                              // disabled={line.count === 0}
                              variant='text'
                              data-cy='btn'
                            >
                              <Icon slot='icon-left' icon='minus' />
                            </Button>
                            {/* инпут, где это значение будет + руками можно менять */}
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
                        {Object.keys(CHECK_LINE_ADDING).map(check_line_key => {
                          const leftOrCenter = Number.isNaN(Number(`${line[check_line_key]}`));
                          const tdClasses = classNames({
                            [table_style['table-col']]: true,
                            [table_style['table-col_left']]: leftOrCenter
                          })
                          const w = WIDTH_COL_CHECK_TBODY[check_line_key] || ''
                          const margin = leftOrCenter ? '' : 'auto'
                          return (
                            <td className={tdClasses} key={check_line_key}>
                              <div style={{ width: `${w - 1}px`, margin }}>{line[check_line_key]}</div>
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
            <span className={style.text}>{totalInfo[0]}</span>
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