import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Button, Form, Icon, Input } from '../../views';

import style from './search.module.scss';

const Search = ({ filters = {}, setFilters = () => { } }) => {
  const [isNotInputEmpty, setInputNotEmpty] = useState(false)

  const onSubmit = (values, actions) => {
    if (isNotInputEmpty) {
      setFilters({ ...filters, search: values.search })
      actions.setSubmitting(false)
      if (values.search === '') {
        setInputNotEmpty(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit
  })

  const clearSearchField = () => {
    if (filters?.search) {
      formik.submitForm()
    }
    formik.setFieldValue('search', '');
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