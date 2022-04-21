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
  PAGES_TYPES
} from '../../const'
import { roundNumber } from '../../utils'
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
  setTotalSum = () => { },
  typePage = '',
  activeLine = '',
  addedChecks = [],
  prevTotalSum = 0,
  setLinesOfGeneratedCheck = () => { },
  linesOfGeneratedCheck = [],
  delayCheck = () => { }
}) => {
  const [linesOfCheckWithTotalSum, setNewCheckFields] = useState([])

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

  const uncorrectValue = (id = '-1', count = 0) => {
    let dis = true
    linesOfGeneratedCheck.forEach(line => {
      if (+line.id === +id && line.count > count) {
        dis = false
      }
    })
    return dis
  }

  const uncorrectSwitch = (id = '-1') => {
    let dis = true
    linesOfGeneratedCheck.forEach(line => {
      if (+line.id === +id && !line.old_product) {
        dis = false
      }
    })
    return dis
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
      newLine.total_cost = roundNumber(line.price * line.count)
      newArr.push(newLine)
    })
    setNewCheckFields(newArr)
    recalculateLines(newArr)

    if (!linesOfGeneratedCheck.length) {
      setLinesOfGeneratedCheck(linesOfCheck)
    }
  }, [linesOfCheck])

  const viewPage = typePage === PAGES_TYPES.viewCheck
  const changeNotLastEntry = activeLine !== addedChecks[addedChecks.length - 1]?.id
  const editCheck = typePage === PAGES_TYPES.editCheck
  const payDelayCheck = typePage === PAGES_TYPES.payDelayCheck
  const hiddenActions = viewPage || (changeNotLastEntry && editCheck)
  const sumWithBonus = total_sum - (discountCard?.bonus || 0)
  const correctSumWithBonus = sumWithBonus > 0 ? sumWithBonus : 0
  const prevSumWithBonus = prevTotalSum - (discountCard?.bonus || 0)
  const prevCorrectSumWithBonus = prevSumWithBonus > 0 ? prevSumWithBonus : 0
  const totalInfo = editCheck && !delayCheck ?
    [`Итоговая стоимость предыдущая: ${roundNumber(prevCorrectSumWithBonus)}`,
    `Итоговая стоимость текущая: ${roundNumber(correctSumWithBonus)}`] :
    [`Итого без бонусов: ${roundNumber(total_sum)}`, `Итого с бонусами: ${roundNumber(correctSumWithBonus)}`]
  const needWarn = prevCorrectSumWithBonus === correctSumWithBonus

  const onSubmit = () => {
    addOrUpdateCheck()
  }

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
                          {!hiddenActions && (
                            <th key='action_colunm' className={table_style['table-col']}>
                              <div style={{ width: '50px' }} />
                            </th>
                          )}
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
                          {!hiddenActions && (
                            <th key='action_colunm-delete' className={table_style['table-col']}>
                              <div style={{ width: '25px' }} />
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className={table_style['table-body']}>
                        {linesOfCheckWithTotalSum.map(line => {
                          const classesRow = classNames({
                            [table_style['table-row']]: true,
                          })

                          return (
                            <tr key={`${line.id}-${line.old_product}`} className={classesRow}>
                              {!hiddenActions && (
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
                                      disabled={line.unit === UNITS[1] || uncorrectValue(line.id, line.count) && (editCheck || payDelayCheck)}
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
                              )}
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
                                const value = check_line_key === CHECK_LINE_ADDING.count ?
                                  line.unit === UNITS[1] ? line[check_line_key] + ', кг' : line[check_line_key] + ', шт' :
                                  line[check_line_key]
                                return (
                                  <td className={tdClasses} key={check_line_key}>
                                    <div style={{ width: `${w - 1}px`, margin, color }}>{value}</div>
                                  </td>
                                )
                              })}
                              <td className={table_style['table-col']} key='action_colunm-old-product'>
                                <div style={{ width: '35px', margin: 'auto' }}>
                                  <Switch
                                    text={line.old_product}
                                    disabled={line.sale || !line.maybeOld || hiddenActions || (editCheck || payDelayCheck) && uncorrectSwitch(line.id)}
                                    onGx-change={() => handleChangeSwitch(line)}
                                    name={`${line.id}-${line.old_product}`}
                                    value={`${line.old_product}`}
                                    checked={line.old_product}
                                  />
                                </div>
                              </td>
                              {!hiddenActions && (
                                <td className={table_style['table-col']} key='action_colunm-delete'>
                                  <div style={{ width: '25px', margin: 'auto' }}>
                                    <Button
                                      className='button-delete_action'
                                      variant='text'
                                      data-cy='btn'
                                      title='Удалить строку'
                                      name={{ id: line.id, old_product: line.old_product }}
                                      onClick={deleteProduct}
                                    >
                                      <Icon slot='icon-left' icon='deleteIcon' />
                                    </Button>
                                  </div>
                                </td>
                              )}
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
                  <span className={style.text}>{totalInfo[1]}</span>
                </div>
                {!viewPage && (
                  <div className={style.wrap_btn}>
                    {!(editCheck || payDelayCheck) && (
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
                    )}
                    <Button
                      type='submit'
                      className='btn_width-100'
                      data-cy='btn'
                      buttonDis
                      disabled={!linesOfCheck.length && !editCheck || needWarn && !payDelayCheck || !linesOfGeneratedCheck.length}
                    >
                      {btnText}
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          </GxGrid>
        </div >
      </section>
    </>
  )
}

export default RightPart;