import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { Button, ErrorText, Fieldset, Form, Input, Switch } from '../../views'
import { deleteSpaces, declensionBonusNumber } from '../../utils'
import Select from '../Select'
import { FORM_FIELDS, FORM_LABELS, UNITS, SELECT_TYPES } from '../../const'
import { addLineOfCheck } from '../../schema'
import { correctBonus } from '../../schema/const'
import api from '../../api'
import style from './check_operations.module.scss';

const AddCheckParams = ({
  addCheck
}) => {
  const {
    discountCard = {},
    setDiscountCard = () => { },
    linesOfCheck = [],
    setLinesOfCheck = () => { },
    total_sum = 0
  } = addCheck

  const [disabled, setDisabled] = useState(true)
  const [unit, setUnit] = useState(UNITS[0])
  const [productList, updateProductList] = useState(linesOfCheck)
  const [wasAddProduct, setWasAddProduct] = useState(false)
  const [bonusErr, setBonusErr] = useState('')
  const [bonusText, setBonusText] = useState('')
  const [maxBonus, setMaxBonus] = useState(0)
  const [cardMaxBonus, setCardMaxBonus] = useState(0)

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

  const handleBlur = (e, floorValue = null) => {
    const { name, value } = e.target;
    const clearValue = deleteSpaces(floorValue || value)
    formik.handleBlur(e)
    formik.setFieldValue([name], clearValue)
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
    setWasAddProduct(true)

    formik.setFieldValue(FORM_FIELDS.count, 1)
    formik.setFieldValue(FORM_FIELDS.old_product, false)
    formik.setFieldValue(FORM_FIELDS.product, null)
    formik.setFieldTouched(FORM_FIELDS.product, false)

    setLinesOfCheck(lines)
  }

  const applyCard = () => {
    const cardInfo = formik.values.card ? {
      card: formik.values.card,
      bonus: formik.values.bonus
    } : null

    setDiscountCard(cardInfo)
  }

  const chooseProduct = (e, name) => {
    formik.setFieldValue(name, e)
    setUnit(e.unit)

    setWasAddProduct(false)
  }

  const validMaxBonus = (_maxBonus = 0) => {
    const bonusValue = _maxBonus || cardMaxBonus
    if (bonusValue >= total_sum) {
      return total_sum
    }
    else {
      return bonusValue
    }
  }

  const chooseCard = (e, name) => {
    formik.setFieldValue(name, e)
    formik.setFieldValue(FORM_FIELDS.bonus, 0)
    if (!e.value) {
      formik.setFieldValue(FORM_FIELDS.card, null)
      setCardMaxBonus(0)
      setMaxBonus(0)
      setBonusErr('')
    }
    else {
      const _maxBonus = Math.floor(e.bonus)
      setCardMaxBonus(_maxBonus)
      setMaxBonus(validMaxBonus(_maxBonus))
    }
  }

  const blurPositiveValue = (e) => {
    const obj = e
    if (obj.target.value <= 0) {
      obj.target.value = 1
    }
    handleBlur(obj)
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
    updateProductList(linesOfCheck)
  }, [linesOfCheck])

  useEffect(() => {
    const maxValue = validMaxBonus()
    setMaxBonus(maxValue)

    if (discountCard?.bonus > maxValue) {
      setDiscountCard({ ...discountCard, bonus: maxValue })
      formik.setFieldValue(FORM_FIELDS.bonus, maxValue)
    }
  }, [total_sum])

  useEffect(() => {
    setBonusText(`бонус${declensionBonusNumber(cardMaxBonus)}`)
  }, [cardMaxBonus])

  const digitalCard = +(discountCard?.bonus || 0)
  const unitForCount = unit === UNITS[0] ? FORM_LABELS.count : FORM_LABELS.weight
  const countLabel = formik.values.product ? `${unitForCount} (макс. ${formik.values.product?.count})` : `${unitForCount} (макс. НЕОПРЕДЕЛЕНО)`
  const bonusLabel = linesOfCheck.length && formik.values.card?.value ? `${FORM_LABELS.bonus} (макс. ${maxBonus})` : `${FORM_LABELS.bonus} (макс. НЕОПРЕДЕЛЕНО)`
  const oldProductLabel = formik.values.product?.sale ? `${FORM_LABELS.old_product} (${FORM_LABELS.old_product_err})` : FORM_LABELS.old_product
  const disabledCardAdd = bonusErr || digitalCard === +formik.values.bonus && discountCard?.card?.value === formik.values.card?.value || !formik.values.card && discountCard && Object.keys(discountCard).length === 0

  return (
    <Form data-cy='form'>
      <div className={style.grid_table}>
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
        <div className={classNames(style.grid_row, style.grid_row_special)}>
          <Switch
            text={oldProductLabel}
            disabled={!formik.values.product || formik.values.product.sale}
            onGx-change={handleChangeSwitch}
            name={FORM_FIELDS.old_product}
            value={`${formik.values.old_product}`}
            checked={formik.values.old_product}
            containerClass='old_product_left'
          />
        </div>
        <div className={style.grid_row}>
          <Fieldset
            errorClass='addOrUpdateCheck'
            containerClass='pressed_bottom'
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
              disabled={!formik.values.card || !linesOfCheck.length}
            />
          </Fieldset>
          <div className={style.btn_add_line}>
            <Button
              disabled={disabledCardAdd}
              className='btn_width-square'
              data-cy='btn'
              buttonDis
              onClick={applyCard}
            >
              Ок
            </Button>
          </div>
        </div>
        {formik.values?.card && (
          <div className={classNames(style.grid_row, style.grid_row_special)}>
            <p className={style.container_special}>На карте {cardMaxBonus} {bonusText}</p>
          </div>
        )}
      </div>
      {formik.errors.non_field_errors ? (
        <ErrorText errorClass='form'>
          {formik.errors.non_field_errors}
        </ErrorText>
      ) : null}
    </Form>
  )
}

export default AddCheckParams;