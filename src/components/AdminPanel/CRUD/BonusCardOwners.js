import React, { useState } from 'react';
import { useFormik } from 'formik'
import {
  BONUS_CARD_OWNER,
  WIDTH_COL_BONUS_CARD_OWNER,
  FORM_FIELDS,
  FORM_LABELS
} from '../../../const';
import { handingErrors, deleteSpaces } from '../../../utils'
import { Input, Fieldset } from '../../../views';
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
    fio: '',
    phone: '',
    email: '',
    bithDate: null,
    gender: false, // запрос буду делать на получение списка
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
              errorClass='addOrUpdateCheck'
              error={formik.errors.fio}
              touched={formik.touched.fio}>
              <Input
                value={formik.values.fio}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.fio}
                label={FORM_LABELS.fio}
                data-cy='title'
                type='text'
              />
            </Fieldset>
            <Fieldset
              errorClass='addOrUpdateCheck'
              error={formik.errors.fio}
              touched={formik.touched.fio}>
              <Input
                value={formik.values.fio}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.fio}
                label={FORM_LABELS.fio}
                data-cy='title'
                type='text'
              />
            </Fieldset>
          </div>
          <div className={style.addupdate__row}>
            <Fieldset
              errorClass='addOrUpdateCheck'
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
              errorClass='addOrUpdateCheck'
              error={formik.errors.fio}
              touched={formik.touched.fio}>
              <Input
                value={formik.values.fio}
                onGx-input={formik.handleChange}
                onGx-blur={handleBlur}
                name={FORM_FIELDS.fio}
                label={FORM_LABELS.fio}
                data-cy='title'
                type='text'
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