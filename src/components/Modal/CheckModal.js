import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Icon, Input } from '../../views'
import {
  handingErrors,
  deleteSpaces
} from '../../utils'
import Select from '../Select'
import { FORM_FIELDS, FORM_LABELS, UNITS } from '../../const'
import { addLineOfCheck } from '../../schema'
import api from '../../api'

import style from './modal.module.scss'

const CheckModal = ({
  backToMainForm = () => { },
  successAddElement = () => { },
  headerText = ''
}) => {
  const [disabled, setDisabled] = useState(true)
  const [unit, setUnit] = useState(UNITS[0])

  const onSubmit = (values, actions) => {
    console.log('values', values)
  }

  const formik = useFormik({
    initialValues: {
      product: null,
      unit: 0,
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
      setUnit(formik.values.product.unit)
    }
  }, [formik.values.product])

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
          <GxRow>
            <GxCol className={style['service-col']}>
              {formik.errors.non_field_errors ? (
                <ErrorText errorClass='form'>
                  {formik.errors.non_field_errors}
                </ErrorText>
              ) : null}
            </GxCol>
          </GxRow>
          {/* <GxRow>
            <GxCol className={style['service-col']}>
              <Button
                type='submit'
                disabled={disabled}
                className='btn_width-100'
                data-cy='btn'
                buttonDis
              >
                Добавить
              </Button>
            </GxCol>
          </GxRow> */}
        </Form>
      </GxGrid>
    </div>
  )
}

export default CheckModal