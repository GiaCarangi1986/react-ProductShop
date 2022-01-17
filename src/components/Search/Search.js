import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useStoreon } from 'storeon/react'
import { Button, Form, Icon, Input } from '../../views';
import { TABLE_EVENT_TYPES } from '../../const';

import style from './search.module.scss';

const Search = ({ setEventType = () => { }, history = false, loadData = () => { } }) => {
  const [isNotInputEmpty, setInputNotEmpty] = useState(false)
  const { dispatch, filters, filtersHistory } = useStoreon('filters', 'filtersHistory')

  const onSubmit = (values, actions) => {
    if (isNotInputEmpty) {
      if (!history) {
        dispatch('params/update', { search: values.search })
      }
      else {
        dispatch('paramsHistory/update', { search: values.search })
        loadData(1, { ...filtersHistory, search: values.search });
      }

      setEventType(TABLE_EVENT_TYPES.search)
      actions.setSubmitting(false)
      if (values.search === '') {
        setInputNotEmpty(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      search: !history ? filters.search : filtersHistory.search
    },
    onSubmit
  })

  const clearSearchField = () => {
    if (filters?.search || filtersHistory.search) {
      formik.submitForm()
    }
    formik.setFieldValue('search', '');
    setEventType(null)
  }

  const handleChange = e => {
    formik.handleChange(e)
    setInputNotEmpty(true)
  }

  return (
    <Form
      onGx-submit={formik.handleSubmit}>
      <div className={style.search}>
        <Input
          name='search'
          value={formik.values.search}
          placeholder='Поиск...'
          clearable
          onGx-clear={clearSearchField}
          data-cy='search'
          onGx-input={handleChange}
        >
          <Button
            disabled={formik.isSubmitting || !isNotInputEmpty}
            slot='suffix'
            className='search-btn'
            type='submit'
            variant='text'
            data-cy='btn'
          >
            <Icon slot='icon-left' icon='search' />
          </Button>
        </Input>
      </div>
    </Form>
  )
}

export default Search