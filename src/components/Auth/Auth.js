import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
// import { useHistory } from 'react-router';
// import { useStoreon } from 'storeon/react';
import { Button, Fieldset, Form, Input, Logo, ErrorText, PreloaderPage } from '../../views';
import {
  // handingErrors,
  deleteSpaces, checkValuesFields
} from '../../utils'
import * as schema from '../../schema';
// import { PATHS } from '../../const';
// import api from '../../api';

import style from './auth.module.scss';

const Auth = () => {
  const [disabledBtn, setDisabledBtn] = useState(true)
  // const history = useHistory();

  const onSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    console.log(values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: schema.signUp,
    initialValues: {
      username: null,
      password: null,
    },
    onSubmit
  })

  useEffect(() => {
    if (formik.values) {
      const errorsList = { ...formik.errors };
      delete errorsList.non_field_errors;
      const isFullValues = checkValuesFields(formik.values)
      const disabled = !isFullValues || formik.isSubmitting || Object.keys(errorsList).length > 0
      setDisabledBtn(disabled)
    }
  }, [formik])

  const handleBlur = e => {
    const { name } = e.target;
    const value = deleteSpaces(formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
  }

  return (
    <section className={style['auth-layout']}>
      <div className={style.auth}>
        <Logo variant='auth' />
        <Form
          className={style['auth-form']}
          onGx-submit={formik.handleSubmit}
          novalidate
          data-cy='form'
        >
          <Fieldset error={formik.errors.username} touched={formik.touched.username}>
            <Input
              label='Логин'
              data-cy='username'
              nameOfStyle='input-label'
              value={formik.values.username}
              name='username'
              onGx-input={formik.handleChange}
              onGx-blur={handleBlur}
            />
          </Fieldset>
          <Fieldset error={formik.errors.password} touched={formik.touched.password}>
            <Input
              label='Пароль'
              data-cy='password'
              type='password'
              nameOfStyle='input-label'
              value={formik.values.password}
              name='password'
              onGx-input={formik.handleChange}
              onGx-blur={handleBlur}
            />
          </Fieldset>
          <div className={style.error}>
            {formik.errors.non_field_errors ? (
              <ErrorText errorClass='auth' absolute>
                {formik.errors.non_field_errors}
              </ErrorText>
            ) : null}
          </div>
          <Button
            disabled={disabledBtn}
            type='submit'
            data-cy='subBtn'
          >
            {formik.isSubmitting && (
              <PreloaderPage loaderClass='indicator' slot='icon-left' />
            )}
            Войти</Button>
        </Form>
      </div>
    </section>
  )
}

export default Auth