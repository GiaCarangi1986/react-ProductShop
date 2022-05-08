import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { useFormik } from 'formik'
import {
  SALE_LIST,
  WIDTH_COL_SALE_LIST,
  FORM_FIELDS,
  FORM_LABELS,
  SELECT_TYPES,
  HEADER_BASIC
} from '../../../const';
import { handingErrors, deleteSpaces, capitalize } from '../../../utils'
import { formatDateToInput } from '../../../utils/date'
import { Input, Fieldset, InputPhone, Button } from '../../../views';
import Select from '../../Select';
import ListShow from './ListShow';
import AddOrUpdate from './AddOrUpdate';
import { saleCRUD } from '../../../schema';
import style from '../style.module.scss';
import api from '../../../api'

const BonusCardOwners = ({ children, sale }) => {
  const {
    saleList = [],
    setSaleList = () => { },
  } = sale

  const HEADER = 'акции'

  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addUpdate, setAddUpdate] = useState(false)
  const [header, setHeader] = useState('')
  const [data, setData] = useState(null)

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const initialValues = {
    start_at: null,
    end_at: null,
    salePercent: 1,
    product: null,
  }

  const formik = useFormik({
    initialValues,
    validationSchema: saleCRUD,
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
      })
      .catch(err => {
        console.log('err', err)
        handleSubmitError(err?.response)
        setLoading(false)
      })
  }

  const onDelete = e => {
    apiHandler(api.deleteBonusCardOwner, setSaleList, e.target.name)
  }

  const addData = () => {
    apiHandler(api.addBonusCardOwner, setSaleList, formik.values, comeBack)
  }

  const editData = () => {
    apiHandler(api.editBonusCardOwner, setSaleList, formik.values, comeBack)
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

  const addLine = (e) => {
    formik.setFieldValue(FORM_FIELDS.product, null)
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

  const func = header === HEADER.add ? addData : editData
  const dateNow = formatDateToInput()

  return (
    <>
      {addUpdate ? (
        <AddOrUpdate comeBack={comeBack} header={header} disabled={disabled} apply={func} error={error}>
          <div className={style.addupdate__row}>
            <div className={style.wrap_add}>
              <Fieldset>
                <Select
                  value={formik.values.product}
                  name={FORM_FIELDS.product}
                  label={FORM_LABELS.product}
                  data-cy='title'
                  type={SELECT_TYPES.product}
                  func={api.getProductListForCreatingCheck}
                  onBlur={() => handleSelectBlur(FORM_FIELDS.product)}
                  onChange={(e) => chooseSelectValue(e, FORM_FIELDS.product)}
                  err={formik.errors.product && formik.touched.product}
                />
              </Fieldset>
              <Button
                disabled={!formik.values.product}
                className='btn_width-square'
                data-cy='btn'
                buttonDis
                onClick={addLine}
              >
                +
              </Button>
            </div>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.start_at}
              touched={formik.touched.start_at}>
              <Input
                value={formik.values.start_at}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.start_at}
                label={FORM_LABELS.start_at}
                data-cy='title'
                type='date'
                max={dateNow}
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.end_at}
              touched={formik.touched.end_at}>
              <Input
                value={formik.values.end_at}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.end_at}
                label={FORM_LABELS.end_at}
                data-cy='title'
                type='date'
                min={formik.values.start_at}
                max={dateNow}
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCRUD'
              error={formik.errors.salePercent}
              touched={formik.touched.salePercent}>
              <Input
                value={formik.values.salePercent}
                onGx-input={handleInput}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.salePercent}
                label={FORM_LABELS.salePercent}
                data-cy='title'
                type='number'
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
        <ListShow
          children={children}
          list={saleList}
          setList={setSaleList}
          WIDTH_COL={WIDTH_COL_SALE_LIST}
          NAME_COL={SALE_LIST}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          func={api.getSaleList}
          handleSubmitError={handleSubmitError}
          onDelete={onDelete}
          onAdd={onAction}
          onEdit={onEdit}
        />
      )}
    </>
  )
}

export default BonusCardOwners