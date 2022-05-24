import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { useFormik } from 'formik'
import {
  PRODUCTS,
  WIDTH_COL_PRODUCTS,
  FORM_FIELDS,
  FORM_LABELS,
  SELECT_TYPES,
  HEADER_BASIC
} from '../../../const';
import Search from '../../Search'
import { handingErrors, deleteSpaces, capitalize } from '../../../utils'
import { Input, Fieldset, InputPhone } from '../../../views';
import Select from '../../Select';
import ListShow from './ListShow';
import AddOrUpdate from './AddOrUpdate';
import { userCRUD } from '../../../schema';
import style from '../style.module.scss';
import api from '../../../api'

const Product = ({ children }) => {
  const [productList, setProduct] = useState([])

  const HEADER = 'продукта'

  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addUpdate, setAddUpdate] = useState(false)
  const [header, setHeader] = useState('')
  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({})

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
    birthDate: null,
    gender: null,
    id: null
  }

  const formik = useFormik({
    initialValues,
    validationSchema: userCRUD,
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
    formik.setValues(initialValues)
    formik.setErrors({})
    formik.setTouched({})
    setHeader('')
    setError('')
    setAddUpdate(false)
  }

  const clearFilters = () => {
    setFilters({})
  }

  const applyChanges = () => {
    comeBack()
    clearFilters()
  }

  const apiHandler = (func, setFunc = () => { }, value, afterFunc = () => { }, params) => {
    setLoading(true)
    func(value)
      .then(res => {
        setFunc(res)
        params ? afterFunc(params) : afterFunc()
        setLoading(false)
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
    apiHandler(api.deleteProduct, setProduct, e.target.name, clearFilters)
  }

  const addData = () => {
    apiHandler(api.addBonusCardOwner, setProduct, formik.values, applyChanges)
  }

  const editData = () => {
    apiHandler(api.editBonusCardOwner, setProduct, formik.values, applyChanges)
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
    apiHandler(api.getBonusCardOwnerForEdit, formik.setValues, e.target.name, onAction, HEADER_BASIC.update)
  }

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
              containerClass='pressed_bottom'
              error={formik.errors.gender}
              touched={formik.touched.gender}>
              <Select
                value={formik.values.gender}
                name={FORM_FIELDS.gender}
                label={FORM_LABELS.gender}
                data-cy='title'
                type={SELECT_TYPES.gender}
                func={api.getGenderListForSelect}
                onBlur={() => handleSelectBlur(FORM_FIELDS.gender)}
                onChange={(e) => chooseSelectValue(e, FORM_FIELDS.gender)}
                err={formik.errors.gender && formik.touched.gender}
              />
            </Fieldset>
          </div>
          <div className={style.addupdate__row}>
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
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.birthDate}
              touched={formik.touched.birthDate}>
              <Input
                value={formik.values.birthDate}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.birthDate}
                label={FORM_LABELS.birthDate}
                data-cy='title'
                type='date'
              />
            </Fieldset>
          </div>
        </AddOrUpdate>
      ) : (
        <div>
          {children}
          <div className={style.filter}>
            <Search filters={filters} setFilters={setFilters} />
          </div>
          <ListShow
            list={productList}
            setList={setProduct}
            WIDTH_COL={WIDTH_COL_PRODUCTS}
            NAME_COL={PRODUCTS}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            func={api.getProduct}
            filters={filters}
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

export default Product