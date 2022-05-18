import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { useFormik } from 'formik'
import {
  USER_LIST,
  WIDTH_COL_USER_LIST,
  FORM_FIELDS,
  FORM_LABELS,
  SELECT_TYPES,
  HEADER_BASIC,
  ROLES,
  USER_ROLE
} from '../../../const';
import { handingErrors, deleteSpaces, capitalize } from '../../../utils'
import { Input, Fieldset, InputPhone } from '../../../views';
import Select from '../../Select';
import { DropdownDescription } from '../../DropdownAction';
import ListShow from './ListShow';
import Search from '../../Search'
import AddOrUpdate from './AddOrUpdate';
import { systemUserCRUD } from '../../../schema';
import style from '../style.module.scss';
import api from '../../../api'

const SystemUsers = ({ children, user }) => {
  const {
    systemUsers = [],
    setSystemUsers = () => { },
  } = user

  const HEADER = 'пользователя системы'

  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addUpdate, setAddUpdate] = useState(false)
  const [header, setHeader] = useState('')
  const [data, setData] = useState(null)
  const [optionName, setOptionName] = useState('Не выбрано')

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const initialValues = {
    firstName: '',
    secondName: '',
    patronymic: '',
    phone: '',
    email: '',
    password: '',
    role: null,
    id: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: systemUserCRUD,
  })

  const handleBlur = e => {
    const { name } = e.target;
    const value = deleteSpaces(formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
  }

  const handleChangePhone = (e) => {
    const { name } = e.target;
    formik.setFieldValue(name, e.detail.value);
  }

  const handleInput = e => {
    formik.setFieldValue(e.target.name, capitalize(e.target.value))
  }

  const handleSelectBlur = (name = '') => {
    formik.setFieldTouched([name], true)
  }

  const chooseSelectValue = (e, name) => {
    formik.setFieldValue(name, e)
  }

  const comeBack = () => {
    setAddUpdate(false)
    formik.setValues(initialValues)
    formik.setErrors({})
    formik.setTouched({})
    setHeader('')
    setError('')
  }

  const apiHandler = (func, setFunc = () => { }, value, afterFunc = () => { }, params) => {
    setLoading(true)
    func(value)
      .then(res => {
        setFunc(res)
        setLoading(false)
        params ? afterFunc(params) : afterFunc()
        if (params === HEADER_BASIC.update) {
          setData({ ...res })
        }
        setError('')
      })
      .catch(err => {
        console.log('err', err)
        handleSubmitError(err?.response)
        setLoading(false)
      })
  }

  const onDelete = e => {
    apiHandler(api.deleteUser, setSystemUsers, e.target.name)
  }

  const addData = () => {
    apiHandler(api.addUser, setSystemUsers, formik.values, comeBack)
  }

  const editData = () => {
    apiHandler(api.editUser, setSystemUsers, formik.values, comeBack)
  }

  const onAction = (action) => {
    setAddUpdate(true)
    setHeader(`${action} ${HEADER}`)
    setError('')
    if (action === HEADER_BASIC.add) {
      setData({ ...initialValues })
    }
  }

  const onEdit = (e) => {
    apiHandler(api.getUserForEdit, formik.setValues, e.target.name, onAction, HEADER_BASIC.update)
  }

  const changeOption = (e) => {
    if (e.target.name !== optionName) {
      setOptionName(e.target.name)
      // makeDelivery(e.target.value)
      console.log('e.target.value', e.target.value)
    }
  }

  const OPTIONS = [
    {
      func: e => changeOption(e),
      text: 'все',
      value: '',
    },
    {
      func: e => changeOption(e),
      text: ROLES.kassir,
      value: USER_ROLE.kassir,
    },
    {
      func: e => changeOption(e),
      text: ROLES.mainKassir,
      value: USER_ROLE.main_kassir,
    },
    {
      func: e => changeOption(e),
      text: ROLES.admin,
      value: USER_ROLE.admin,
    }
  ]

  useEffect(() => {
    if (formik) {
      const { isValid, values } = formik;
      const isDisabled = !isValid || _.isEqual(values, data)
      setDisabled(isDisabled)
      if (!data) {
        setData({ ...values })
      }
    }
  }, [formik])

  const func = header === `${HEADER_BASIC.add} ${HEADER}` ? addData : editData

  return (
    <>
      {addUpdate ? (
        <AddOrUpdate comeBack={comeBack} header={header} disabled={disabled} apply={func} error={error}>
          <div className={style.addupdate__row}>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.secondName}
              touched={formik.touched.secondName}>
              <Input
                value={formik.values.secondName}
                onGx-input={handleInput}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.secondName}
                label={FORM_LABELS.secondName}
                data-cy='title'
                type='text'
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.firstName}
              touched={formik.touched.firstName}>
              <Input
                value={formik.values.firstName}
                onGx-input={handleInput}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.firstName}
                label={FORM_LABELS.firstName}
                data-cy='title'
                type='text'
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.patronymic}
              touched={formik.touched.patronymic}>
              <Input
                value={formik.values.patronymic}
                onGx-input={handleInput}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.patronymic}
                label={FORM_LABELS.patronymic}
                data-cy='title'
                type='text'
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.password}
              touched={formik.touched.password}>
              <Input
                value={formik.values.password}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.password}
                label={FORM_LABELS.password}
                data-cy='title'
                type='password'
              />
            </Fieldset>
          </div>
          <div className={style.addupdate__row}>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              containerClass='pressed_bottom'
              error={formik.errors.role}
              touched={formik.touched.role}>
              <Select
                value={formik.values.role}
                name={FORM_FIELDS.role}
                label={FORM_LABELS.role}
                data-cy='title'
                type={SELECT_TYPES.role}
                func={api.getRoleForSelect}
                onBlur={() => handleSelectBlur(FORM_FIELDS.role)}
                onChange={(e) => chooseSelectValue(e, FORM_FIELDS.role)}
                err={formik.errors.role && formik.touched.role}
                isDisabled={data?.role?.label === ROLES.admin}
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.phone}
              touched={formik.touched.phone}>
              <InputPhone
                label={FORM_LABELS.phone}
                country='ru'
                onlyCountries={['ru']}
                name={FORM_FIELDS.phone}
                type='text'
                onGx-input={formik.handleChange}
                onGx-change={handleChangePhone}
                value={formik.values.phone}
                onBlur={handleBlur}
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.email}
              touched={formik.touched.email}>
              <Input
                value={formik.values.email}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.email}
                label={FORM_LABELS.email}
                data-cy='title'
                type='text'
              />
            </Fieldset>
          </div>
        </AddOrUpdate>
      ) : (
        <div>
          {children}
          <div className={style.filter}>
            <Search />
            <DropdownDescription text='Роль:' options={OPTIONS} visiableText={optionName} />
          </div>
          <ListShow
            children={children}
            list={systemUsers}
            setList={setSystemUsers}
            WIDTH_COL={WIDTH_COL_USER_LIST}
            NAME_COL={USER_LIST}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            func={api.getUserList}
            handleSubmitError={handleSubmitError}
            onDelete={onDelete}
            onAdd={onAction}
            onEdit={onEdit}
          />
        </div>
      )}
    </>
  )
}

export default SystemUsers