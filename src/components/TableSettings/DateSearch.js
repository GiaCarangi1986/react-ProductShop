import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Form, Input, Fieldset, Button } from '../../views'
import { FORM_LABELS, FORM_FIELDS } from '../../const'
import { dateSearch } from '../../schema'
import { formatDateToInput } from '../../utils/date'
import style from './table-settings.module.scss'

const DateSearch = ({ settingsDisabled = false, setEventType = () => { }, setFilters = () => { }, filters = {} }) => {
  const [isNotInputEmpty, setInputNotEmpty] = useState(false)

  const initialValues = {
    start_at: null,
    end_at: null
  }

  const onSubmit = (values, actions) => {
    console.log('values', values)
    // if (isNotInputEmpty) {
    //   if (!history) {
    //     dispatch('params/update', { search: values.search })
    //   }
    //   else {
    //     dispatch('paramsHistory/update', { search: values.search })
    //     loadData(1, { ...filtersHistory, search: values.search });
    //   }

    //   setEventType(TABLE_EVENT_TYPES.search)
    //   actions.setSubmitting(false)
    //   if (values.search === '') {
    //     setInputNotEmpty(false)
    //   }
    // }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: dateSearch,
    onSubmit
  })

  const cancelAction = () => {
    formik.setValues(initialValues)
  }

  const dateNow = formatDateToInput()

  return (
    <Form className={style['service-form']} onGx-submit={formik.handleSubmit} data-cy='form'>
      <div className={style['table-settings__input_wrap']}>
        <Fieldset
          error={formik.errors.start_at}
          touched={formik.touched.start_at}
          errorClass='addOrUpdateService'
        >
          <Input
            label={FORM_LABELS.start_at}
            value={formik.values.start_at}
            onGx-input={formik.handleChange}
            onGx-blur={formik.handleBlur}
            name={FORM_FIELDS.start_at}
            type='datetime-local'
            max={dateNow}
            nameOfStyle='input_date'
            disabled={settingsDisabled}
          />
        </Fieldset>
        <Fieldset
          error={formik.errors.end_at}
          touched={formik.touched.start_at}
          errorClass='addOrUpdateService'
        >
          <Input
            label={FORM_LABELS.end_at}
            value={formik.values.end_at}
            onGx-input={formik.handleChange}
            onGx-blur={formik.handleBlur}
            name={FORM_FIELDS.end_at}
            type='datetime-local'
            min={formik.values.start_at}
            max={dateNow}
            nameOfStyle='input_date'
            disabled={settingsDisabled}
          />
        </Fieldset>
      </div>
      <div className={style['table-search_block']}>
        <Button type='submit' disabled={!formik.isValid || !formik.dirty || settingsDisabled} className='search_ok'>
          Поиск
        </Button>
        <Button disabled={!formik.dirty} className='search_cancel' outline onClick={cancelAction}>
          Отмена
        </Button>
      </div>
    </Form>
  )
}

export default DateSearch
