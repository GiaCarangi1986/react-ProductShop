import React, { useState } from 'react';
import { useFormik } from 'formik'
import {
  BONUS_CARD_OWNER,
  WIDTH_COL_BONUS_CARD_OWNER,
  FORM_FIELDS,
  FORM_LABELS,
  SELECT_TYPES
} from '../../../const';
import { handingErrors, deleteSpaces, capitalize } from '../../../utils'
import { Input, Fieldset, InputPhone } from '../../../views';
import Select from '../../Select';
import ListShow from './ListShow';
import AddOrUpdate from './AddOrUpdate';
import { userCRUD } from '../../../schema';
import style from '../style.module.scss';
import api from '../../../api'

const BonusCardOwners = ({ children, bonus_card }) => {
  const {
    bonusCardOwner = [],
    setBonusCardOwner = () => { },
  } = bonus_card

  const HEADER = {
    add: 'Добавление держателя карты',
    update: 'Редактирование держателя карты'
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addUpdate, setAddUpdate] = useState(false)
  const [data, setData] = useState([])
  const [header, setHeader] = useState('')

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
    bithDate: null,
    gender: null, // запрос буду делать на получение списка
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

  const onDelete = e => {
    setLoading(true)
    api.deleteBonusCardOwner(e.target.name)
      .then(res => {
        setBonusCardOwner(res)
        setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
        handleSubmitError(err?.response)
        setLoading(false)
      })
  }

  const comeBack = () => {
    setAddUpdate(false)
    setData([])
    setHeader('')
  }

  const onAdd = () => {
    setAddUpdate(true)
    setHeader(HEADER.add)
  }

  return (
    <>
      {addUpdate ? (
        <AddOrUpdate comeBack={comeBack} header={header}>
          <div className={style.addupdate__row}>
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
          </div>
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
          <div className={style.addupdate__row}>
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
              error={formik.errors.bithDate}
              touched={formik.touched.bithDate}>
              <Input
                value={formik.values.bithDate}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.bithDate}
                label={FORM_LABELS.bithDate}
                data-cy='title'
                type='date'
              />
            </Fieldset>
          </div>
          <div className={style.addupdate__row}>
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
        </AddOrUpdate>
      ) : (
        <ListShow
          children={children}
          list={bonusCardOwner}
          setList={setBonusCardOwner}
          WIDTH_COL={WIDTH_COL_BONUS_CARD_OWNER}
          NAME_COL={BONUS_CARD_OWNER}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          func={api.getBonusCardOwner}
          handleSubmitError={handleSubmitError}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      )}
    </>
  )
}

export default BonusCardOwners