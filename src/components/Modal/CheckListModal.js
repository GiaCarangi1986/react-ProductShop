import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Icon, Input } from '../../views'
import { handingErrors, deleteSpaces } from '../../utils'
import { addFrequencyInfo } from '../../schema'
import {
  FORM_LABELS,
  FORM_FIELDS,
  MODALS_CHECK,
  CHECK_LINES_HEADER,
  WIDTH_COL_CHECK,
  CHECK_LINE_ADDING,
  WIDTH_COL_CHECK_TBODY,
  UNITS
} from '../../const'
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
  maxBonus = 0,
  setMaxBonus = () => { },
  headerText = '',
}) => {
  const [disabled, setDisabled] = useState(true)
  const [linesOfCheckWithTotalSum, setNewCheckFields] = useState([])
  const [total_sum, setTotalSum] = useState(0)

  const onSubmit = (e) => {
    console.log('e', e)
  }

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
    [style['table_scroll-horizontal']]: true,
  })

  const changeProductCount = e => {
    const btnData = e.target
    const updateProduct = [...linesOfCheckWithTotalSum]
    for (let index = 0; index < updateProduct.length; index++) {
      if (updateProduct[index].id === +btnData.name) {
        updateProduct[index].count += +btnData.value
        break
      }
    }
    setLinesOfCheck(updateProduct)
  }

  const deleteProduct = e => {
    const btnData = e.target
    const updateProduct = [...linesOfCheckWithTotalSum].filter(line => line.id !== +btnData.name)
    setLinesOfCheck(updateProduct)
  }

  useEffect(() => {
    let sum = 0
    linesOfCheckWithTotalSum.forEach(line => {
      sum += line.total_cost
    })
    setTotalSum(sum)

    if (sum) {
      if (discountCard.bonus > sum) {
        const card = { ...discountCard }
        card.bonus = sum
        setDiscountCard(card)
      }
      setMaxBonus(maxBonus > sum ? sum : maxBonus)
    }
  }, [linesOfCheckWithTotalSum])

  useEffect(() => {
    const newArr = []
    linesOfCheck.forEach(line => {
      const newLine = { ...line }
      newLine.total_cost = Math.round(line.price * line.count * 100) / 100
      newArr.push(newLine)
    })
    setNewCheckFields(newArr)
  }, [linesOfCheck])

  useEffect(() => {
    if (!linesOfCheck.length) {
      setContentType(MODALS_CHECK.default)
    }
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
                      <th key='action_colunm-delete' className={table_style['table-col']}>
                        <div style={{ width: '25px' }} />
                      </th>
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
                                className='button-edit_action'
                                title='Убавить кол-во'
                                name={line.id}
                                value={-1}
                                onClick={changeProductCount}
                                disabled={line.count === 1 || line.unit === UNITS[1]}
                                variant='text'
                                data-cy='btn'
                              >
                                <Icon slot='icon-left' icon='minus' />
                              </Button>
                              <Button
                                className='button-edit_action'
                                title='Прибавить кол-во'
                                disabled={line.unit === UNITS[1]}
                                name={line.id}
                                value={1}
                                onClick={changeProductCount}
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
                            const m = leftOrCenter ? '' : 'auto'
                            return (
                              <td className={tdClasses} key={check_line_key}>
                                <div style={{ width: `${w - 1}px`, margin: m }}>{line[check_line_key]}</div>
                              </td>
                            )
                          })}
                          <td className={table_style['table-col']}>
                            <div style={{ width: '25px', margin: 'auto' }}>
                              <Button
                                className='button-delete_action'
                                variant='text'
                                data-cy='btn'
                                name={line.id}
                                onClick={deleteProduct}
                              >
                                <Icon slot='icon-left' icon='deleteIcon' />
                              </Button>
                            </div>
                          </td>
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
              <span className={style.text}>{`Итого без бонусов: ${total_sum}`}</span>
              <span className={style.text}>{`Итого с бонусами: ${total_sum - (discountCard?.bonus || 0)}`}</span>
            </div>
            <GxRow className={style.gxrow}>
              <GxCol className={style['service-col']} />
              <GxCol className={style['service-col']} size={3}>
                <Button
                  className='btn_width-100-red'
                  data-cy='btn'
                  buttonDis
                  outline
                >
                  Отложить чек
                </Button>
              </GxCol>
              <GxCol className={style['service-col']} size={3}>
                <Button
                  type='submit'
                  className='btn_width-100'
                  data-cy='btn'
                  buttonDis
                >
                  Добавить
                </Button>
              </GxCol>
            </GxRow>
          </div>
        </Form>
      </GxGrid>
    </div >
  )
}

export default CheckListModal