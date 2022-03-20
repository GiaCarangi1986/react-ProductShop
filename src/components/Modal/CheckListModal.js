import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Icon, Input } from '../../views'
import { handingErrors, deleteSpaces } from '../../utils'
import { addFrequencyInfo } from '../../schema'
import { FORM_LABELS, FORM_FIELDS, MODALS_CHECK, CHECK_LINES_HEADER, WIDTH_COL_CHECK, CHECK_LINE_ADDING, WIDTH_COL_CHECK_TBODY } from '../../const'
import api from '../../api'

import table_style from '../CheckTable/check_table.module.scss'
import style from './modal.module.scss'

const CheckListModal = ({
  backToMainForm = () => { },
  setContentType = () => { },
  linesOfCheck = [],
  discountCard = {},
  setLinesOfCheck = () => { },
  setDiscountCard = () => { },
  headerText = '',
}) => {
  const [disabled, setDisabled] = useState(true)
  const [linesOfCheckWithTotalSum, setNewCheckFields] = useState([])

  const onSubmit = (values, actions) => {
    console.log('values', values)
  }

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
    [style['table_scroll-horizontal']]: true,
  })

  useEffect(() => {
    const newArr = []
    linesOfCheck.forEach(line => {
      const newLine = { ...line }
      newLine.total_cost = Math.round(line.price * line.count * 100) / 100
      newArr.push(newLine)
    })
    setNewCheckFields(newArr)
  }, [linesOfCheck])

  return (
    <div className={style['service-form']}>
      <GxGrid className={style['service-grid']}>
        <GxRow>
          <GxCol className={style['service-col']}>
            <Button
              onClick={backToMainForm}
              className='btn-back'
              variant='text'
              data-cy='btn'
            >
              <Icon icon='arrowBack' />
              Добавление чека
            </Button>
          </GxCol>
        </GxRow>
        <GxRow>
          <GxCol className={style['service-col']}>
            <h2>{headerText}</h2>
          </GxCol>
        </GxRow>
        <div>
        </div>
        <Form onGx-submit={() => console.log('submit')} data-cy='form'>
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
                    {linesOfCheckWithTotalSum.map(line => {
                      const classesRow = classNames({
                        [table_style['table-row']]: true,
                        // [style['table-row_archive']]: !elem.is_available - тут будет 50% акция, если заметит покупатель - красный цвет, а ппри добавлении продукта еще сделать пимпочку - 50% (будет атрибут такой у продукта)
                      })
                      return (
                        <tr key={line.id} className={classesRow}>
                          <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])}>
                            <div style={{ width: '50px', margin: 'auto' }}>
                              <Button
                                className='button-edit-copy'
                                variant='text'
                                data-cy='btn'
                              >
                                <Icon slot='icon-left' icon='minus' />
                              </Button>
                              <Button
                                className='button-edit-edit'
                                // disabled={!elem.is_available || elem.num_clients > 0}
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
                              [table_style['table-col-full-rights']]: true,
                              [table_style['table-col_left']]: leftOrCenter
                            })
                            const w = WIDTH_COL_CHECK_TBODY[check_line_key] || ''
                            const m = leftOrCenter ? '' : 'auto'
                            return (
                              <td className={tdClasses}>
                                <div style={{ width: `${w - 1}px`, margin: m }}>{line[check_line_key]}</div>
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
          {/* <GxRow>
            <GxCol className={style['service-col']} offset={10} size={2}>
              <Button
                type='submit'
                disabled={disabled}
                className='btn_width-100'
                data-cy='btn'
                buttonDis
              >
                Добавить
              </Button>
            </GxCol>
          </GxRow> */}
        </Form>
      </GxGrid>
    </div >
  )
}

export default CheckListModal