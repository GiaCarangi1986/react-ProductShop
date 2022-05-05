import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button, Icon, PreloaderPage, ErrorText } from '../../../views';
import {
  BONUS_CARD_OWNER,
  WIDTH_COL_BONUS_CARD_OWNER,
  UNITS,
  MODAL_TYPES,
  POPUP_TYPES,
} from '../../../const';
import { handingErrors } from '../../../utils'
import style from '../style.module.scss';
import table_style from '../../CheckTable/check_table.module.scss'

import api from '../../../api'

const BonusCardOwners = ({ children, bonus_card }) => {
  const {
    bonusCardOwner = [],
    setBonusCardOwner = () => { },
    setError,
    error,
  } = bonus_card

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  // const payOrder = () => {
  //   api.setWriteOffProducts(bonusCardOwner, currentUser.id)
  //     .then(res => {
  //       dispatch('popup/toggle', {
  //         popup: POPUP_TYPES.admin_panel,
  //         text: 'Продукты успешно списаны'
  //       })
  //       setBonusCardOwner([])
  //       setError('')
  //     })
  //     .catch(err => {
  //       handleSubmitError(err?.response)
  //     })
  // }

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
  })

  return (
    <div>
      {children}
      <div className={classNames(table_style['table-grid'], style.container__right, style.container__right_big)}>
        <div className={classesScroll}>
          <div className={table_style['table-layout']}>
            <table className={table_style.table}>
              <thead className={table_style['table-head']}>
                <tr className={table_style['table-row']}>
                  {Object.keys(BONUS_CARD_OWNER).map(header => {
                    const w = WIDTH_COL_BONUS_CARD_OWNER[header] || 30
                    return (
                      <th key={header} className={table_style['table-col']}>
                        <div style={{ minWidth: `${w}px`, margin: 'auto' }}>
                          {BONUS_CARD_OWNER[header]}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className={table_style['table-body']}>
                {bonusCardOwner.map((line) => {
                  const classesRow = classNames({
                    [table_style['table-row']]: true,
                  })
                  return (
                    <tr key={`${line.id}`} className={classesRow}>
                      <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])} key='action_colunm'>
                        <div style={{ minWidth: '25px', margin: 'auto' }} className={style.actions}>
                          <Button
                            className='button-edit_action'
                            title='Редактировать'
                            name={line.id}
                            // onClick={handleChange}
                            variant='text'
                            data-cy='btn'
                          >
                            <Icon slot='icon-left' icon='write' />
                          </Button>
                        </div>
                      </td>
                      {Object.keys(BONUS_CARD_OWNER).map(product_line => {
                        const leftOrCenter = Number.isNaN(Number(`${line[product_line]}`));
                        const tdClasses = classNames({
                          [table_style['table-col']]: true,
                          [table_style['table-col_left']]: leftOrCenter
                        })
                        const w = WIDTH_COL_BONUS_CARD_OWNER[product_line] || ''
                        const margin = leftOrCenter ? '' : 'auto'
                        const value = product_line === BONUS_CARD_OWNER.count ?
                          line.unit === UNITS[1] ? line[product_line] + ', кг' : line[product_line] + ', шт' :
                          line[product_line]
                        return (
                          <td className={tdClasses} key={product_line}>
                            <div style={{ minWidth: `${w - 1}px`, margin }}>{value}</div>
                          </td>
                        )
                      })}
                      <td className={table_style['table-col']} key='action_colunm-delete'>
                        <div style={{ minWidth: '25px', margin: 'auto' }}>
                          <Button
                            className='button-delete_action'
                            variant='text'
                            data-cy='btn'
                            title='Удалить строку'
                            name={line.id}
                          // onClick={deleteProduct}
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
        <span />
        <ErrorText errorClass='writeoff'>
          {error}
        </ErrorText>
        <div className={style.wrap_btn}>
          <Button
            // onClick={paymentСonfirmation}
            className='btn_width-100'
            data-cy='btn'
            buttonDis
          >
            Добавить
          </Button>
        </div>
      </div>
      {/* {<PreloaderPage loaderClass='admin_panel' />} */}
      {/* <PayModal
        headers={{ main: 'Подтвердите списание', text: `Ожидается списание ${productCount} ${productForm}`, btnCancel: 'Отмена', btnOk: 'Списать' }}
        func={payOrder} /> */}
    </div>
  )
}

export default BonusCardOwners