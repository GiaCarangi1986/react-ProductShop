import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik'
import { useStoreon } from 'storeon/react';
import { Button, Icon, Input, PreloaderPage, ErrorText, Fieldset } from '../../../views';
import Select from '../../Select'
import {
  WRITEOFF_HEADER,
  WIDTH_COL_WRITEOFF,
  WRITEOFF_LINE_ADDING,
  WIDTH_COL_WRITEOFF_TBODY,
  UNITS,
  MODAL_TYPES,
  POPUP_TYPES,
  DEFAULT_DATE,
  FORM_FIELDS,
  FORM_LABELS,
  SELECT_TYPES
} from '../../../const';
import { PayModal } from '../../Modal';
import { dateFotmattedForTable } from '../../../utils/date';
import { handingErrors, deleteSpaces, roundNumber, roundWeight } from '../../../utils'
import { addLineOfCheck } from '../../../schema'
import style from '../style.module.scss';
import table_style from '../../CheckTable/check_table.module.scss'

import api from '../../../api'

const WriteOffProduct = ({ children, write_off_act }) => {
  const {
    productList = [],
    setProductList = () => { },
    setTypePage = () => { },
    latestDate,
    setLatestDate,
  } = write_off_act
  const { dispatch, currentUser } = useStoreon('currentUser');

  const [unit, setUnit] = useState(UNITS[0])
  const [wasAddProduct, setWasAddProduct] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [productCount, setProductCount] = useState({})
  const [error, setError] = useState('')

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const initialValues = {
    product: null,
    count: '1',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: addLineOfCheck,
  })

  const chooseProduct = (e, name) => {
    formik.setFieldValue('count', 1)
    formik.setFieldValue(name, e)
    setUnit(e.unit)

    setWasAddProduct(false)
  }

  const addLine = () => {
    const lines = [...productList]
    let wasUpdate = false
    for (let index = 0; index < lines.length; index++) {
      if (lines[index].id === formik.values.product.value) {
        lines[index].count += +formik.values.count
        if (unit === UNITS[1]) {
          lines[index].count = roundNumber(lines[index].count)
        }
        wasUpdate = true
        break
      }
    }

    if (!wasUpdate) {
      lines.push({
        id: formik.values.product.value,
        count: +formik.values.count,
        label: formik.values.product.name,
        unit: formik.values.product.unit,
      })
    }
    setWasAddProduct(true)

    formik.setFieldValue(FORM_FIELDS.count, 1)
    formik.setFieldValue(FORM_FIELDS.product, null)
    formik.setFieldTouched(FORM_FIELDS.product, false)

    setProductList(lines)
  }

  const payOrder = () => {
    api.setWriteOffProducts(productList, currentUser.id)
      .then(res => {
        dispatch('popup/toggle', {
          popup: POPUP_TYPES.admin_panel,
          text: 'Продукты успешно списаны'
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

  const writeOffCount = () => {
    // let count = 0
    const writeOffList = {
      kg: 0,
      piece: 0
    }
    productList.forEach(line => {
      // console.log('line', line)
      line.unit === UNITS[0] ? writeOffList.piece += +line.count : writeOffList.kg += +line.count
      // count += +line.count
    })
    return writeOffList
  }

  const paymentСonfirmation = () => {
    const count = writeOffCount()
    setProductCount(count)
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.payModal,
    })
  }

  const handleChange = (e) => {
    const btnData = e.target
    const updateProduct = [...productList]
    for (let index = 0; index < updateProduct.length; index++) {
      if (updateProduct[index].id === +btnData.name) {
        updateProduct[index].count += +btnData.value
        break
      }
    }
    setProductList(updateProduct)
  }

  const handleBlur = (e, floorValue = null) => {
    const { name, value } = e.target;
    const clearValue = deleteSpaces(floorValue || value)
    formik.handleBlur(e)
    formik.setFieldValue([name], clearValue)
  }

  const handleSelectBlur = (name = '') => {
    formik.setFieldTouched([name], true)
  }

  const deleteProduct = (e) => {
    const btnId = e.target.name
    const updateProduct = [...productList].filter(line => !(line.id === +btnId))
    setProductList(updateProduct)
  }

  const blurPositiveValue = (e) => {
    const obj = e
    if (obj.target.value <= 0) {
      obj.target.value = 1
    }
    handleBlur(obj)
  }

  useEffect(() => {
    if (formik) {
      const { isValid, dirty } = formik;
      const isDisabled = !isValid || !dirty || wasAddProduct
      setDisabled(isDisabled)
    }
  }, [formik])

  useEffect(() => {
    if (latestDate === DEFAULT_DATE) {
      api.getLatestWriteOffDataDilevers()
        .then(res => {
          if (res) {
            const date = dateFotmattedForTable(res)
            setLatestDate(`Последнее списание было осуществлено ${date}`)
          }
          if (!res) {
            setLatestDate('Ранее не было зафиксировано процедуры списания продуктов')
          }
          setError('')
        })
        .catch(err => {
          handleSubmitError(err?.response)
        })
    }
  }, [])

  const classesScroll = classNames({
    [table_style['table_scroll-horizontal']]: true,
    [table_style['table_scroll-vertical']]: true,
  })

  const unitForCount = unit === UNITS[0] ? FORM_LABELS.count : FORM_LABELS.weight
  const countLabel = formik.values.product ? `${unitForCount} (макс. ${formik.values.product?.count})` : `${unitForCount} (макс. НЕОПРЕДЕЛЕНО)`

  return (
    <div>
      {children}
      <h2 className={style.header_right}>{latestDate}</h2>
      <div className={style.grid_row}>
        <Fieldset
          errorClass='addOrUpdateCheck'
          containerClass='pressed_bottom'
          error={formik.errors.product}
          touched={formik.touched.product}>
          <Select
            value={formik.values.product}
            name={FORM_FIELDS.product}
            label={FORM_LABELS.product}
            data-cy='title'
            type={SELECT_TYPES.product}
            func={api.getProductListForCreatingCheck}
            onBlur={() => handleSelectBlur(FORM_FIELDS.product)}
            onChange={(e) => chooseProduct(e, FORM_FIELDS.product)}
            err={formik.errors.product && formik.touched.product}
          />
        </Fieldset>
        <Fieldset
          errorClass='addOrUpdateCheck'
          error={formik.errors.count}
          touched={formik.touched.count}>
          <Input
            value={formik.values.count}
            onGx-input={formik.handleChange}
            onGx-blur={blurPositiveValue}
            name={FORM_FIELDS.count}
            label={countLabel}
            data-cy='title'
            type='number'
            min='1'
            max='32767'
            step={unit === UNITS[0] ? 1 : 0.1}
            disabled={!formik.values.product}
          />
        </Fieldset>
        <div className={style.btn_add_line}>
          <Button
            disabled={disabled}
            className='btn_width-square'
            data-cy='btn'
            buttonDis
            onClick={addLine}
          >
            +
          </Button>
        </div>
      </div>
      <div className={classNames(table_style['table-grid'], style.container__right, style.container__right_small)}>
        <div className={classesScroll}>
          <div className={table_style['table-layout']}>
            <table className={table_style.table}>
              <thead className={table_style['table-head']}>
                <tr className={table_style['table-row']}>
                  {Object.keys(WRITEOFF_HEADER).map(header => {
                    const w = WIDTH_COL_WRITEOFF[header] || 30
                    return (
                      <th key={header} className={table_style['table-col']}>
                        <div style={{ minWidth: `${w}px`, margin: 'auto' }}>
                          {WRITEOFF_HEADER[header]}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className={table_style['table-body']}>
                {productList.map((line) => {
                  const classesRow = classNames({
                    [table_style['table-row']]: true,
                  })
                  return (
                    <tr key={`${line.id}`} className={classesRow}>
                      <td className={classNames(table_style['table-col'], table_style['table-col-full-rights'])} key='action_colunm'>
                        <div style={{ minWidth: '50px', margin: 'auto' }} className={style.actions}>
                          <Button
                            className='button-edit_action'
                            title='Убавить кол-во'
                            name={line.id}
                            value={-1}
                            onClick={handleChange}
                            disabled={line.count === 1 || line.unit === UNITS[1]}
                            variant='text'
                            data-cy='btn'
                          >
                            <Icon slot='icon-left' icon='minus' />
                          </Button>
                          <Button
                            className='button-edit_action'
                            title='Прибавить кол-во'
                            name={line.id}
                            value={1}
                            disabled={line.unit === UNITS[1]}
                            onClick={handleChange}
                            variant='text'
                            data-cy='btn'
                          >
                            <Icon slot='icon-left' icon='plus' />
                          </Button>
                        </div>
                      </td>
                      {Object.keys(WRITEOFF_LINE_ADDING).map(product_line => {
                        const leftOrCenter = Number.isNaN(Number(`${line[product_line]}`));
                        const tdClasses = classNames({
                          [table_style['table-col']]: true,
                          [table_style['table-col_left']]: leftOrCenter
                        })
                        const w = WIDTH_COL_WRITEOFF_TBODY[product_line] || ''
                        const margin = leftOrCenter ? '' : 'auto'
                        const value = product_line === WRITEOFF_LINE_ADDING.count ?
                          line.unit === UNITS[1] ? roundWeight(line[product_line]) + ', кг' : line[product_line] + ', шт' :
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
        <span />
        <ErrorText errorClass='writeoff'>
          {latestDate !== DEFAULT_DATE && error}
        </ErrorText>
        <div className={style.wrap_btn}>
          <Button
            onClick={paymentСonfirmation}
            className='btn_width-100'
            data-cy='btn'
            buttonDis
            disabled={!productList.length}
          >
            Списать
          </Button>
        </div>
      </div>
      {latestDate === DEFAULT_DATE && <PreloaderPage loaderClass='admin_panel' />}
      <PayModal
        headers={{
          main: 'Подтвердите списание',
          text: <>
            <p style={{ margin: 0 }}>Ожидается списание:</p>
            {productCount.piece !== 0 && <p style={{ margin: 0 }}>{`штучные продукты - ${productCount.piece} шт`}</p>}
            {productCount.kg !== 0 && <p style={{ margin: 0 }}>{`весовые продукты - ${productCount.kg} кг`}</p>}
          </>,
          btnCancel: 'Отмена',
          btnOk: 'Списать'
        }}
        func={payOrder} />
    </div>
  )
}

export default WriteOffProduct