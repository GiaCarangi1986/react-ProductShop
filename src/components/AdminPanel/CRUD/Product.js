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
import { Input, Fieldset, Switch } from '../../../views';
import Select from '../../Select';
import ListShow from './ListShow';
import AddOrUpdate from './AddOrUpdate';
import { productCRUD } from '../../../schema';
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
    title: '',
    priceNow: 1,
    expirationDate: 1,
    maybeOld: false,
    category: null,
    measurementUnits: null,
    manufacturer: null,
    id: null
  }

  const formik = useFormik({
    initialValues,
    validationSchema: productCRUD,
  })

  const handleBlur = e => {
    const { name } = e.target;
    const value = deleteSpaces(formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
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
  console.log('formik.values', formik.values)
  return (
    <>
      {addUpdate ? (
        <AddOrUpdate comeBack={comeBack} header={header} disabled={disabled} apply={func} error={error}>
          <div className={style.addupdate__row}>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.title}
              touched={formik.touched.title}>
              <Input
                value={formik.values.title}
                onGx-input={handleInput}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.title}
                label={FORM_LABELS.title}
                data-cy='title'
                type='text'
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.priceNow}
              touched={formik.touched.priceNow}>
              <Input
                value={formik.values.priceNow}
                onGx-input={handleInput}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.priceNow}
                label={FORM_LABELS.priceNow}
                data-cy='title'
                type='text'
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.expirationDate}
              touched={formik.touched.expirationDate}>
              <Input
                value={formik.values.expirationDate}
                onGx-input={handleInput}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.expirationDate}
                label={FORM_LABELS.expirationDate}
                data-cy='title'
                type='text'
              />
            </Fieldset>
          </div>
          <div className={style.addupdate__row}>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              containerClass='pressed_bottom'
              error={formik.errors.category}
              touched={formik.touched.category}>
              <Select
                value={formik.values.category}
                name={FORM_FIELDS.category}
                label={FORM_LABELS.category}
                data-cy='title'
                type={SELECT_TYPES.category}
                func={api.getCategoryListForSelect}
                onBlur={() => handleSelectBlur(FORM_FIELDS.category)}
                onChange={(e) => chooseSelectValue(e, FORM_FIELDS.category)}
                err={formik.errors.category && formik.touched.category}
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              containerClass='pressed_bottom'
              error={formik.errors.measurementUnits}
              touched={formik.touched.measurementUnits}>
              <Select
                value={formik.values.measurementUnits}
                name={FORM_FIELDS.measurementUnits}
                label={FORM_LABELS.measurementUnits}
                data-cy='title'
                type={SELECT_TYPES.measurementUnits}
                func={api.getMeasurementUnitsListForSelect}
                onBlur={() => handleSelectBlur(FORM_FIELDS.measurementUnits)}
                onChange={(e) => chooseSelectValue(e, FORM_FIELDS.measurementUnits)}
                err={formik.errors.measurementUnits && formik.touched.measurementUnits}
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              containerClass='pressed_bottom'
              error={formik.errors.manufacturer}
              touched={formik.touched.manufacturer}>
              <Select
                value={formik.values.manufacturer}
                name={FORM_FIELDS.manufacturer}
                label={FORM_LABELS.manufacturer}
                data-cy='title'
                type={SELECT_TYPES.manufacturer}
                func={api.getManufacturerListForSelect}
                onBlur={() => handleSelectBlur(FORM_FIELDS.manufacturer)}
                onChange={(e) => chooseSelectValue(e, FORM_FIELDS.manufacturer)}
                err={formik.errors.manufacturer && formik.touched.manufacturer}
              />
            </Fieldset>
            <Switch
              text='Может распространяться скидка 50% по истечению срока годности'
              value={String(+formik.values.maybeOld)}
              checked={formik.values.maybeOld}
              name={FORM_FIELDS.delayed_show}
            // onGx-change={handleChangeSwitch}
            />
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