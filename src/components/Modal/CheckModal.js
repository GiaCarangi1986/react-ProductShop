import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Input } from '../../views'
import { deleteSpaces } from '../../utils'
import Select from '../Select'
import { FORM_FIELDS, FORM_LABELS, UNITS, SELECT_TYPES } from '../../const'
import { addLineOfCheck } from '../../schema'
import api from '../../api'

import style from './modal.module.scss'

const CheckModal = ({
  headerText = ''
}) => {
  const [disabled, setDisabled] = useState(true)
  const [unit, setUnit] = useState(UNITS[0])
  const [maxBonus, setMaxBonus] = useState(0)

  const onSubmit = (values, actions) => {
    console.log('values', values)
  }

  const formik = useFormik({
    initialValues: {
      product: null,
      unit: 1,
      card: null,
      bonus: 0,
    },
    validationSchema: addLineOfCheck,
    onSubmit
  })

  const handleBlur = (e) => {
    const { name } = e.target;
    const value = deleteSpaces(formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
  }

  const changeValuesSelect = (e, name) => {
    formik.setFieldValue(name, e)
  }

  const handleSelectBlur = (name = '') => {
    formik.setFieldTouched([name], true)
  }

  useEffect(() => {
    if (formik) {
      const { isSubmitting, isValid } = formik;
      const isDisabled = isSubmitting || !isValid
      setDisabled(isDisabled)
    }
  }, [formik])

  useEffect(() => {
    if (formik.values.product) {
      formik.setFieldValue(FORM_FIELDS.unit, 1)

      setUnit(formik.values.product.unit)
    }
  }, [formik.values.product])

  useEffect(() => {
    if (formik.values.card) {
      if (!formik.values.card.value) {
        formik.setFieldValue(FORM_FIELDS.card, null)
      }
      else {
        formik.setFieldValue(FORM_FIELDS.bonus, 0)
        setMaxBonus(Math.floor(formik.values.card.bonus))
      }
    }
  }, [formik.values.card])

  return (
    <div className={style['service-form']}>
      <GxGrid className={style['service-grid']}>
        <GxRow>
          <GxCol className={style['service-col']}>
            <h2>{headerText}</h2>
          </GxCol>
        </GxRow>
        <Form onGx-submit={formik.handleSubmit} data-cy='form'>
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
                  setValue={(e) => changeValuesSelect(e, FORM_FIELDS.product)}
                  onBlur={() => handleSelectBlur(FORM_FIELDS.product)}
                  err={formik.errors.product && formik.touched.product}
                />
              </Fieldset>
            </GxCol>
            <GxCol className={style['service-col']} >
              <Fieldset
                errorClass='addOrUpdateCheck'
                error={formik.errors.unit}
                touched={formik.touched.unit}>
                <Input
                  value={formik.values.unit}
                  onGx-input={formik.handleChange}
                  onGx-blur={handleBlur}
                  name={FORM_FIELDS.unit}
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
                  setValue={(e) => changeValuesSelect(e, FORM_FIELDS.card)}
                  onBlur={() => handleSelectBlur(FORM_FIELDS.card)}
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
                    onGx-blur={handleBlur}
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
          <GxRow>
            <GxCol className={style['service-col_start']}>
              <Button
                type='submit'
                disabled={disabled}
                className='btn_width_single'
                data-cy='btn'
                buttonDis
              >
                Перейти к чеку
              </Button>
            </GxCol>
          </GxRow>
        </Form>
      </GxGrid>
    </div>
  )
}

export default CheckModal