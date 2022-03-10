import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Input } from '../../views'
import { deleteSpaces } from '../../utils'
import Select from '../Select'
import { FORM_FIELDS, FORM_LABELS, UNITS, SELECT_TYPES, MODALS_CHECK } from '../../const'
import { addLineOfCheck } from '../../schema'
import api from '../../api'

import style from './modal.module.scss'

const CheckModal = ({
  headerText = '',
  setContentType = () => { },
  linesOfCheck = [],
  discountCard = {},
  setLinesOfCheck = () => { },
  setDiscountCard = () => { },
  open = false
}) => {
  const [disabled, setDisabled] = useState(true)
  const [unit, setUnit] = useState(UNITS[0])
  const [maxBonus, setMaxBonus] = useState(0)
  const [productList, updateProductList] = useState(linesOfCheck)

  const initialValues = {
    product: null,
    count: '1',
    card: null,
    bonus: '0',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: addLineOfCheck,
  })

  const onClickSubmit = () => {
    formik.resetForm();
    setLinesOfCheck(productList)

    const cardInfo = formik.values.card ? {
      card: formik.values.card,
      bonus: formik.values.bonus
    } : null

    setDiscountCard(cardInfo)
    setContentType(MODALS_CHECK.checkList)
  }

  const handleBlur = (e, floorValue = null) => {
    const { name } = e.target;
    const value = deleteSpaces(floorValue || formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
  }

  const handleSelectBlur = (name = '') => {
    formik.setFieldTouched([name], true)
  }

  const addLine = () => {
    const lines = [...productList]
    let wasUpdate = false
    for (let index = 0; index < lines.length; index++) {
      if (lines[index].id === formik.values.product.value) {
        lines[index].count += +formik.values.count
        if (unit === UNITS[1]) {
          lines[index].count = Math.round(lines[index].count * 100) / 100
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
        price: formik.values.product.price
      })
    }
    updateProductList(lines)

    formik.setFieldValue(FORM_FIELDS.count, 1)
    formik.setFieldValue(FORM_FIELDS.product, null)
    formik.setFieldTouched(FORM_FIELDS.product, false)
  }

  const chooseProduct = (e, name) => {
    formik.setFieldValue(name, e)
    setUnit(e.unit)
  }

  const chooseCard = (e, name) => {
    formik.setFieldValue(name, e)
    if (!e.value) {
      formik.setFieldValue(FORM_FIELDS.card, null)
    }
    else {
      formik.setFieldValue(FORM_FIELDS.bonus, 0)
      setMaxBonus(Math.floor(e.bonus))
    }
  }

  const blurFloor = (e) => {
    const floorValue = Math.floor(e.target.value)
    handleBlur(e, floorValue)
  }

  useEffect(() => {
    if (discountCard && Object.keys(discountCard).length) {
      formik.setFieldValue(FORM_FIELDS.card, discountCard.card || null)
      formik.setFieldValue(FORM_FIELDS.bonus, discountCard.bonus || '0')
    }
  }, [discountCard])

  useEffect(() => {
    if (formik) {
      const { isValid, dirty } = formik;
      const isDisabled = !isValid || !dirty
      setDisabled(isDisabled)
    }
  }, [formik])

  useEffect(() => {
    if (!open) {
      formik.setValues(initialValues)
    }
  }, [open])

  return (
    <div className={style['service-form']}>
      <GxGrid className={style['service-grid']}>
        <GxRow>
          <GxCol className={style['service-col']}>
            <h2>{headerText}</h2>
          </GxCol>
        </GxRow>
        <Form data-cy='form'>
          <GxRow>
            <GxCol className={style['service-col']}>
              <Fieldset
                errorClass='addOrUpdateCheck'
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
            </GxCol>
            <GxCol className={style['service-col']} >
              <Fieldset
                errorClass='addOrUpdateCheck'
                error={formik.errors.count}
                touched={formik.touched.count}>
                <Input
                  value={formik.values.count}
                  onGx-input={formik.handleChange}
                  onGx-blur={handleBlur}
                  name={FORM_FIELDS.count}
                  label={unit === UNITS[0] ? FORM_LABELS.count : FORM_LABELS.weight}
                  data-cy='title'
                  type='number'
                  min='1'
                  max='32767'
                  step={unit === UNITS[0] ? 1 : 0.1}
                />
              </Fieldset>
            </GxCol>
            <GxCol className={classNames(style['service-col'], style['service-col-add'])}  >
              <Button
                disabled={disabled}
                className='btn_width-square'
                data-cy='btn'
                buttonDis
                onClick={addLine}
              >
                +
              </Button>
            </GxCol>
          </GxRow>
          <span className={style.line} />
          <GxRow>
            <GxCol className={style['service-col']}>
              <Fieldset
                errorClass='addOrUpdateCheck'
                error={formik.errors.card}
                touched={formik.touched.card}>
                <Select
                  value={formik.values.card}
                  name={FORM_FIELDS.card}
                  label={FORM_LABELS.card}
                  data-cy='title'
                  func={api.getCardListForCreatingCheck}
                  type={SELECT_TYPES.card}
                  onBlur={() => handleSelectBlur(FORM_FIELDS.card)}
                  onChange={(e) => chooseCard(e, FORM_FIELDS.card)}
                  err={formik.errors.card && formik.touched.card}
                />
              </Fieldset>
            </GxCol>
            <GxCol className={style['service-col']}>
              {formik.values.card && (
                <Fieldset
                  errorClass='addOrUpdateCheck'
                  error={formik.errors.bonus}
                  touched={formik.touched.bonus}>
                  <Input
                    value={formik.values.bonus}
                    onGx-input={formik.handleChange}
                    onGx-blur={blurFloor}
                    name={FORM_FIELDS.bonus}
                    label={`${FORM_LABELS.bonus} (макс. ${maxBonus})`}
                    data-cy='title'
                    type='number'
                    min='0'
                    max='32767'
                    step={1}
                  />
                </Fieldset>
              )}
            </GxCol>
            <GxCol className={classNames(style['service-col'], style['service-col-add'])} />
          </GxRow>
          <GxRow>
            <GxCol className={style['service-col']}>
              {formik.errors.non_field_errors ? (
                <ErrorText errorClass='form'>
                  {formik.errors.non_field_errors}
                </ErrorText>
              ) : null}
            </GxCol>
          </GxRow>
        </Form>
        <GxRow>
          <GxCol className={style['service-col_start']}>
            <Button
              disabled={!productList.length}
              className='btn_width_single'
              data-cy='btn'
              buttonDis
              onClick={onClickSubmit}
            >
              Перейти к чеку
            </Button>
          </GxCol>
        </GxRow>
      </GxGrid>
    </div>
  )
}

export default CheckModal