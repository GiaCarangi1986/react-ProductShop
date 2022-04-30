import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';
import { Button, Icon, Input, PreloaderPage, ErrorText } from '../../views';
import {
  MAKE_DELIVERS_HEADER,
  WIDTH_COL_MAKE_DELIVERS,
  MAKE_DELIVERS_LINE_ADDING,
  WIDTH_COL_MAKE_DELIVERS_TBODY,
  UNITS,
  MODAL_TYPES,
  POPUP_TYPES,
  DEFAULT_DATE
} from '../../const';
import PayModal from '../Modal/PayModal';
import { dateFotmattedForMakeDelivery } from '../../utils/date';
import { handingErrors } from '../../utils'
import style from './style.module.scss';
import table_style from '../CheckTable/check_table.module.scss'

import api from '../../api'

const MakeDeliveries = ({ children, make_deliveries }) => {
  const {
    productList = [],
    setProductList = () => { },
    setTypePage = () => { },
    latestDate,
    setLatestDate,
    setError,
    error
  } = make_deliveries
  const { dispatch } = useStoreon();

  const [sum, setSum] = useState(0)

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const payOrder = () => {
    api.setListForMakeDilevers(productList)
      .then(res => {
        dispatch('popup/toggle', {
          popup: POPUP_TYPES.admin_panel,
          text: 'Заказ успешно выполнен'
        })
        setTypePage('')
        setProductList([])
        setLatestDate(DEFAULT_DATE)
        setError('')
      })
      .catch(err => {
        handleSubmitError(err?.response)
      })
  }

  const paymentСonfirmation = () => {
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.payModal,
    })
  }

  const changeSum = (productArr = []) => {
    let sum = 0
    productArr.forEach(line => {
      sum += line.choosen_count * line.price
    })
    setSum(sum)
  }

  const HANDLE_CHANGE = {
    button: 'button',
    input: 'input'
  }

  const changeProductCount = (e = {}, type = '') => {
    const value = e.target.value
    const index = e.target.name
    const oldArr = [...productList]
    switch (type) {
      case HANDLE_CHANGE.button:
        oldArr[index].choosen_count += +value
        break;
      case HANDLE_CHANGE.input:
        oldArr[index].choosen_count = +value
        break;
    }
    oldArr[index].total_cost = oldArr[index].choosen_count * oldArr[index].price
    setProductList(oldArr)
  }

  const handleButtonChange = (e) => {
    changeProductCount(e, HANDLE_CHANGE.button)
  }

  const handleInputChange = (e) => {
    changeProductCount(e, HANDLE_CHANGE.input)
  }

  useEffect(() => {
    if (!productList.length) {
      api.getListForMakeDilevers()
        .then(res => {
          const fullArr = []
          res.productList?.forEach(el => {
            const line = el
            line.choosen_count = el.count
            fullArr.push(line)
          })
          setProductList(fullArr)
          setLatestDate(dateFotmattedForMakeDelivery(res.latestDate))
          setError('')
        })
        .catch(err => {
          handleSubmitError(err?.response)
        })
    }
  }, [])

  useEffect(() => {
    if (productList.length) {
      changeSum(productList)
    }
  }, [productList])

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
  })

  const totalInfo = `Итого: ${sum}`
  const dateInfo = `Последняя закупка была осуществлена ${latestDate}`

  return (
    <div>
      {children}
      <h2 className={style.header_right}>{dateInfo}</h2>
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
                        <div style={{ minWidth: `${w}px`, margin: 'auto' }}>
                          {MAKE_DELIVERS_HEADER[header]}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className={table_style['table-body']}>
                {productList.map((line, index) => {
                  const classesRow = classNames({
                    [table_style['table-row']]: true,
                  })
                  return (
                    <tr key={`${line.id}`} className={classesRow}>
                      <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])} key='action_colunm'>
                        <div style={{ minWidth: '125px', margin: 'auto' }} className={style.actions}>
                          <Button
                            className='button-edit_action'
                            title='Убавить кол-во'
                            name={index}
                            value={-1}
                            onClick={handleButtonChange}
                            disabled={line.choosen_count === 0}
                            variant='text'
                            data-cy='btn'
                          >
                            <Icon slot='icon-left' icon='minus' />
                          </Button>
                          <Input
                            value={line.choosen_count}
                            type='number'
                            nameOfStyle='input_count'
                            onGx-input={handleInputChange}
                            name={index}
                          />
                          <Button
                            className='button-edit_action'
                            title='Прибавить кол-во'
                            name={index}
                            value={1}
                            onClick={handleButtonChange}
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
                            <div style={{ minWidth: `${w - 1}px`, margin }}>{value}</div>
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
        <span className={style.text}>{totalInfo}</span>
        <ErrorText errorClass='make_deliver'>
          {productList.length !== 0 && error}
        </ErrorText>
        <div className={style.wrap_btn}>
          <Button
            onClick={paymentСonfirmation}
            className='btn_width-100'
            data-cy='btn'
            buttonDis
            disabled={!sum}
          >
            Заказать
          </Button>
        </div>
      </div>
      {productList.length === 0 && <PreloaderPage loaderClass='admin_panel' />}
      <PayModal
        headers={{ main: 'Подтвердите покупку', text: `Ожидается оплата в размере ${sum} руб.`, btnCancel: 'Отмена', btnOk: 'Оплатить' }}
        func={payOrder} />
    </div>
  )
}

export default MakeDeliveries