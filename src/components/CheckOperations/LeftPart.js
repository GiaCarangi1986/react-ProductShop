import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Input, Switch } from '../../views'
import { deleteSpaces } from '../../utils'
import Select from '../Select'
import { FORM_FIELDS, FORM_LABELS, UNITS, SELECT_TYPES, MODALS_CHECK } from '../../const'
import { addLineOfCheck } from '../../schema'
import { correctBonus } from '../../schema/const'
import api from '../../api'
import style from './check_operations.module.scss';

const LeftPart = ({
  headerText = '',
  setContentType = () => { },
  linesOfCheck = [],
  discountCard = {},
  setLinesOfCheck = () => { },
  setDiscountCard = () => { },
  maxBonus = 0,
  setCardMaxBonus = () => { },
  setMaxBonus = () => { },
  open = false
}) => {
  const [disabled, setDisabled] = useState(true)
  const [unit, setUnit] = useState(UNITS[0])
  const [productList, updateProductList] = useState(linesOfCheck)
  const [wasAddProduct, setWasAddProduct] = useState(false)
  const [bonusErr, setBonusErr] = useState('')

  const initialValues = {
    product: null,
    count: '1',
    card: null,
    bonus: '0',
    old_product: false
  }

  const formik = useFormik({
    initialValues,
    validationSchema: addLineOfCheck,
  })

  const onSubmit = () => {
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
      if (lines[index].id === formik.values.product.value && lines[index].old_product === formik.values.old_product) {
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
        price: formik.values.old_product ? formik.values.product.price / 2 : formik.values.product.price,
        unit: formik.values.product.unit,
        old_product: formik.values.old_product,
        sale: formik.values.product.sale,
      })
    }
    updateProductList(lines)

    formik.setFieldValue(FORM_FIELDS.count, 1)
    formik.setFieldValue(FORM_FIELDS.old_product, false)
    formik.setFieldValue(FORM_FIELDS.product, null)
    formik.setFieldTouched(FORM_FIELDS.product, false)

    setWasAddProduct(true)
  }

  const chooseProduct = (e, name) => {
    formik.setFieldValue(name, e)
    setUnit(e.unit)

    setWasAddProduct(false)
  }

  const chooseCard = (e, name) => {
    formik.setFieldValue(name, e)
    if (!e.value) {
      formik.setFieldValue(FORM_FIELDS.card, null)
    }
    else {
      formik.setFieldValue(FORM_FIELDS.bonus, 0)
      const maxBonus = Math.floor(e.bonus)
      setCardMaxBonus(maxBonus)
      setMaxBonus(maxBonus)
    }
  }

  const blurFloor = (e) => {
    const floorValue = Math.floor(e.target.value)
    handleBlur(e, floorValue)
  }

  const onInput = e => {
    const floorValue = Math.floor(e.target.value)
    formik.setFieldValue(e.target.name, floorValue)
    if (floorValue > maxBonus) {
      setBonusErr(correctBonus)
    }
    else {
      setBonusErr('')
    }
  }

  const handleChangeSwitch = (e) => {
    formik.setFieldValue(e.target.name, e.target.checked)
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
      const isDisabled = !isValid || !dirty || wasAddProduct
      setDisabled(isDisabled)
    }
  }, [formik])

  useEffect(() => {
    if (!open) {
      formik.setValues(initialValues)
      formik.setTouched({})
    }
  }, [open])

  const bonusLabel = formik.values.card ? `${FORM_LABELS.bonus} (макс. ${maxBonus})` : `${FORM_LABELS.bonus} (макс. НЕОПРЕДЕЛЕНО)`
  const oldProductLabel = formik.values.product?.sale ? `${FORM_LABELS.old_product} (${FORM_LABELS.old_product_err})` : FORM_LABELS.old_product

  return (
    <>
      <section className={style.part_left}>
        <div className={style['service-form']}>
          <GxGrid className={style['service-grid']}>
            <GxRow>
              <GxCol className={style['service-col']}>
                <h2>{headerText}</h2>
              </GxCol>
            </GxRow>
            <Form data-cy='form' onGx-submit={onSubmit}>
              <GxRow>
                <GxCol className={style['service-col']} size={5}>
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
                <GxCol className={style['service-col']} size={5}>
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
                      disabled={!formik.values.product}
                    />
                  </Fieldset>
                </GxCol>
                <GxCol className={classNames(style['service-col'], style['service-col-add'])} size={2}>
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
              <GxRow className={classNames(style['row-margin-big'], style.row_free)}>
                <GxCol className={style['service-col']}>
                  <Switch
                    text={oldProductLabel}
                    disabled={!formik.values.product || formik.values.product.sale}
                    onGx-change={handleChangeSwitch}
                    name={FORM_FIELDS.old_product}
                    value={`${formik.values.old_product}`}
                    checked={formik.values.old_product}
                  />
                </GxCol>
              </GxRow>
              <span className={style.line} />
              <GxRow className={style.row_position}>
                <GxCol className={style['service-col']} size={5}>
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
                <GxCol className={style['service-col']} size={5}>
                  <Fieldset
                    errorClass='addOrUpdateCheck'
                    error={bonusErr}
                    touched={formik.touched.bonus}>
                    <Input
                      value={formik.values.bonus}
                      onGx-input={onInput}
                      onGx-blur={blurFloor}
                      name={FORM_FIELDS.bonus}
                      label={bonusLabel}
                      data-cy='title'
                      type='number'
                      min='0'
                      max='32767'
                      step={1}
                      disabled={!formik.values.card}
                    />
                  </Fieldset>
                </GxCol>
                <GxCol className={classNames(style['service-col'], style['service-col-add'])} size={2} />
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
              <GxRow>
                <GxCol className={style['service-col_start']}>
                  <Button
                    disabled={!productList.length || bonusErr !== ''}
                    className='btn_width_single'
                    data-cy='btn'
                    buttonDis
                    type='submit'
                  >
                    Перейти к чеку
                  </Button>
                </GxCol>
              </GxRow>
            </Form>
          </GxGrid >
        </div >
      </section>
    </>
  )
}

export default LeftPart;