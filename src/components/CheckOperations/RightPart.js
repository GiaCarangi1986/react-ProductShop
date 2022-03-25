import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, Form, Icon, Switch } from '../../views'
import {
  CHECK_LINES_HEADER,
  WIDTH_COL_CHECK,
  CHECK_LINE_ADDING,
  WIDTH_COL_CHECK_TBODY,
  UNITS,
} from '../../const'

import table_style from '../CheckTable/check_table.module.scss'
import style from './check_operations.module.scss';

const RightPart = ({
  linesOfCheck = [],
  discountCard = {},
  setLinesOfCheck = () => { },
  rightHeader = 'Чек-лист',
  btnText = '',
  postponeCheck = () => { },
  addOrUpdateCheck = () => { },
  total_sum = 0,
  setTotalSum = () => { }
}) => {
  const [linesOfCheckWithTotalSum, setNewCheckFields] = useState([])

  const onSubmit = () => {
    addOrUpdateCheck()
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
      if (updateProduct[index].id === +btnData.name.id && updateProduct[index].old_product === btnData.name.old_product) {
        updateProduct[index].count += +btnData.value
        break
      }
    }
    setLinesOfCheck(updateProduct)
  }

  const deleteProduct = (e) => {
    const btnData = e.target.name
    const updateProduct = [...linesOfCheckWithTotalSum].filter(line => !(line.id === +btnData.id && line.old_product === btnData.old_product))
    setLinesOfCheck(updateProduct)
  }

  const deleteOldProduct = (lineInfo = null, listLines) => {
    const updateProducts = [...listLines].filter(line => !(line.id === lineInfo.id && line.old_product === lineInfo.old_product))
    return updateProducts
  }

  const recalculateLines = (arrlines = []) => {
    let sum = 0
    arrlines.forEach(line => {
      sum += line.total_cost
    })
    setTotalSum(sum)
  }

  const handleChangeSwitch = (line) => {
    const productData = line
    let updateProductLines = [...linesOfCheckWithTotalSum]

    let updateOtherLine = false

    for (let index = 0; index < updateProductLines.length; index++) {
      const line = updateProductLines[index];
      if (line.id === productData.id && line.old_product !== productData.old_product) {
        updateOtherLine = true
        updateProductLines[index].count += productData.count
        break
      }
    }

    if (updateOtherLine) {
      updateProductLines = [...deleteOldProduct(productData, updateProductLines)]
    }
    else {
      const index = updateProductLines.indexOf(productData)
      productData.old_product = !productData.old_product
      if (productData.old_product) {
        productData.price /= 2
      }
      else {
        productData.price *= 2
      }
      updateProductLines[index] = productData
    }

    setNewCheckFields(updateProductLines)
    recalculateLines(updateProductLines)
    setLinesOfCheck(updateProductLines)
    /*
      если есть продукт с той же id, но другой old_product, то прибавляем к нему и удаляем текущую строку
      если нет, то просто меняем checked на противоположный
    */
  }

  useEffect(() => {
    const newArr = []
    linesOfCheck.forEach(line => {
      const newLine = { ...line }
      newLine.total_cost = Math.round(line.price * line.count * 100) / 100
      newArr.push(newLine)
    })
    setNewCheckFields(newArr)
    recalculateLines(newArr)
  }, [linesOfCheck])

  return (
    <>
      <section className={style.part_right}>
        <div className={style['service-form']}>
          <GxGrid className={style['service-grid']}>
            <GxRow>
              <GxCol className={style['service-col']}>
                <h2 className={style.header_part}>{rightHeader}</h2>
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
                            <tr key={`${line.id}-${line.old_product}`} className={classesRow}>
                              <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])} key='action_colunm'>
                                <div style={{ width: '50px', margin: 'auto' }}>
                                  <Button
                                    className='button-edit_action'
                                    title='Убавить кол-во'
                                    name={{ id: line.id, old_product: line.old_product }}
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
                                    name={{ id: line.id, old_product: line.old_product }}
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
                                const margin = leftOrCenter ? '' : 'auto'
                                const color = line.old_product && (
                                  check_line_key === CHECK_LINE_ADDING.total_cost || check_line_key === CHECK_LINE_ADDING.price) ?
                                  'red' : 'black'
                                return (
                                  <td className={tdClasses} key={check_line_key}>
                                    <div style={{ width: `${w - 1}px`, margin, color }}>{line[check_line_key]}</div>
                                  </td>
                                )
                              })}
                              <td className={table_style['table-col']} key='action_colunm-old-product'>
                                <div style={{ width: '35px', margin: 'auto' }}>
                                  <Switch
                                    text={line.old_product}
                                    disabled={line.sale}
                                    onGx-change={() => handleChangeSwitch(line)}
                                    name={`${line.id}-${line.old_product}`}
                                    value={`${line.old_product}`}
                                    checked={line.old_product}
                                  />
                                </div>
                              </td>
                              <td className={table_style['table-col']} key='action_colunm-delete'>
                                <div style={{ width: '25px', margin: 'auto' }}>
                                  <Button
                                    className='button-delete_action'
                                    variant='text'
                                    data-cy='btn'
                                    name={{ id: line.id, old_product: line.old_product }}
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
                <div className={style.wrap_btn}>
                  <Button
                    className='btn_width-100-red'
                    data-cy='btn'
                    buttonDis
                    outline
                    onClick={postponeCheck}
                    disabled={!linesOfCheck.length}
                  >
                    Отложить чек
                  </Button>
                  <Button
                    type='submit'
                    className='btn_width-100'
                    data-cy='btn'
                    buttonDis
                    disabled={!linesOfCheck.length}
                  >
                    {btnText}
                  </Button>
                </div>
              </div>
            </Form>
          </GxGrid>
        </div >
      </section>
    </>
  )
}

export default RightPart;