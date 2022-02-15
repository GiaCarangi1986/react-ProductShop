import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Icon, Input } from '../../views'
import {
  handingErrors,
  deleteSpaces, checkValuesFields
} from '../../utils'
import { addFrequencyInfo } from '../../schema'
import api from '../../api'

import style from './modal.module.scss'

const PayModal = ({
  backToMainForm = () => { },
  successAddElement = () => { }
}) => {
  const [disabled, setDisabled] = useState(true)

  const onSubmit = (values, actions) => {
    console.log('values', values)
  }

  const formik = useFormik({
    initialValues: {
      freq: 0,
      base: null,
    },
    // validationSchema: addFrequencyInfo,
    onSubmit
  })

  useEffect(() => {
    if (formik) {
      const { isSubmitting, values } = formik;
      const isFullFields = checkValuesFields(values);
      const isDisabled = isSubmitting || !isFullFields
      setDisabled(isDisabled)
    }
  }, [formik])

  const handleBlur = (e) => {
    const { name } = e.target;
    const value = deleteSpaces(formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
  }

  const handleBlurSelect = (e) => {
    const { name } = e.target;
    formik.setFieldTouched([name], true)
  }

  const changeValuesSelect = ({ option, selectKey }) => {
    const newValues = formik.values
    newValues[selectKey] = option
    formik.setValues(newValues)
  }

  return (
    <div className={style['service-form']}>
      <GxGrid className={style['service-grid']}>
        <GxRow>
          <GxCol className={style['service-col']}>
            <Button
              disabled={formik.isSubmitting}
              onClick={backToMainForm}
              className='btn-back'
              variant='text'
              data-cy='btn'
            >
              <Icon icon='arrowBack' />
              Добавление тарифа
            </Button>
          </GxCol>
        </GxRow>
        <GxRow>
          <GxCol className={style['service-col']}>
            <h2>Добавление частоты сбора информации</h2>
          </GxCol>
        </GxRow>
        <Form onGx-submit={formik.handleSubmit} data-cy='form'>
          <GxRow>
            <GxCol className={style['service-col']} size={6}>
              <Fieldset
                errorClass='addOrUpdateService'
                error={formik.errors.freq}
                touched={formik.touched.freq}>
                <Input
                  value={formik.values.freq}
                  onGx-input={formik.handleChange}
                  onGx-blur={handleBlur}
                  name='freq'
                  label='Частота'
                  data-cy='title'
                  type='number'
                  min='0'
                  max='32767'
                />
              </Fieldset>
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

          <GxRow>
            <GxCol className={style['service-col']} offset={10} size={2}>
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
          </GxRow>
        </Form>
      </GxGrid>
    </div>
  )
}

export default PayModal