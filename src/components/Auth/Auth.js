import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react';
import { Button, Fieldset, Form, Input, Logo, ErrorText, PreloaderPage } from '../../views';
import { handingErrors, deleteSpaces } from '../../utils'
import * as schema from '../../schema';
import { PATHS, FORM_FIELDS } from '../../const';
import api from '../../api';

import style from './auth.module.scss';

const Auth = () => {
  const [disabledBtn, setDisabledBtn] = useState(true)
  const { dispatch, currentUser } = useStoreon('currentUser');
  const navigate = useNavigate();

  const onSubmit = (values, { resetForm, setSubmitting, setFieldError }) => {
    api.loginUser(values)
      .then((data) => {
        setSubmitting(false);
        resetForm();
        dispatch('user/save', {
          first_name: data.firstName || '',
          last_name: data.lastName || '',
          ...data
        });
        navigate(PATHS.check_list.path);
      })
      .catch((err) => {
        const errResponse = handingErrors(err);
        setFieldError([errResponse.key], errResponse.val)
        setDisabledBtn(false)
        setSubmitting(false)
      })
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: schema.signUp,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit
  })

  const handleBlur = e => {
    const { name } = e.target;
    const value = deleteSpaces(formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
  }

  useEffect(() => {
    if (formik.values) {
      setDisabledBtn(formik.isSubmitting || !formik.dirty || !formik.isValid)
    }
  }, [formik])

  useEffect(() => {
    if (currentUser) {
      navigate(PATHS.check_list.path)
    }
  }, [currentUser])

  return (
    <section className={style['auth-layout']}>
      <div className={style.auth}>
        <Logo variant='auth' />
        <Form
          className={style['auth-form']}
          onGx-submit={formik.handleSubmit}
          novalidate
        >
          <Fieldset error={formik.errors.username} touched={formik.touched.username} errorClass='auth'>
            <Input
              label='Логин'
              type='email'
              nameOfStyle='input-label'
              value={formik.values.username}
              name={FORM_FIELDS.username}
              onGx-input={formik.handleChange}
              onGx-blur={handleBlur}
            />
          </Fieldset>
          <Fieldset error={formik.errors.password} touched={formik.touched.password} errorClass='auth'>
            <Input
              label='Пароль'
              type='password'
              nameOfStyle='input-label'
              value={formik.values.password}
              name={FORM_FIELDS.password}
              onGx-input={formik.handleChange}
              onGx-blur={handleBlur}
            />
          </Fieldset>
          <div className={style.error} >
            {formik.errors.non_field_errors ? (
              <ErrorText errorClass='auth' absolute>
                {formik.errors.non_field_errors}
              </ErrorText>
            ) : null}
          </div>
          <div className={style.btn_wrapper}>
            <Button
              disabled={disabledBtn}
              type='submit'
              className='auth'
            >
              {formik.isSubmitting && (
                <PreloaderPage loaderClass='indicator' slot='icon-left' />
              )}
              Войти
            </Button>
          </div>
        </Form>
      </div>
    </section>
  )
}

export default Auth