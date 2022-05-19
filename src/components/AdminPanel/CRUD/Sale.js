import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { useStoreon } from 'storeon/react';
import { useFormik } from 'formik'
import {
  SALE_LIST,
  WIDTH_COL_SALE_LIST,
  FORM_FIELDS,
  FORM_LABELS,
  SELECT_TYPES,
  HEADER_BASIC,
  POPUP_TYPES,
  MODAL_TYPES,
  SALE_KIND,
  SALE_KIND_VALUE
} from '../../../const';
import { handingErrors, deleteSpaces, capitalize } from '../../../utils'
import { dateFotmattedForMakeDeliveryBack } from '../../../utils/date'
import { DropdownDescription } from '../../DropdownAction';
import Search from '../../Search'
import Popup from '../../Popup'
import { ProductSale } from '../../Modal';
import { Input, Fieldset, Icon, Button } from '../../../views';
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

  const { dispatch } = useStoreon();

  const HEADER = 'акции'

  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addUpdate, setAddUpdate] = useState(false)
  const [header, setHeader] = useState('')
  const [data, setData] = useState(null)
  const [productCheck, setProductCheck] = useState([])
  const [optionName, setOptionName] = useState('Не выбрано')
  const [filters, setFilters] = useState({})

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const initialValues = {
    id: '',
    start_at: null,
    end_at: null,
    salePercent: 1,
    product: null,
    productList: []
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
    apiHandler(api.deleteSale, setSaleList, e.target.name)
  }

  const addDataCorrect = () => {
    apiHandler(api.addSale, setSaleList, formik.values, comeBack)
  }

  const editDataCorrect = () => {
    apiHandler(api.editSale, setSaleList, formik.values, comeBack)
  }

  const checkCorrect = (apiFunc = () => { }, afterFunc = () => { }) => {
    setLoading(true)
    apiFunc(formik.values)
      .then(res => {
        if (res.length) {
          setProductCheck(res)
          dispatch('modal/toggle', {
            modal: MODAL_TYPES.productSale,
          })
        }
        else {
          afterFunc()
        }
        setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
        setLoading(false)
      })
  }

  const addData = () => {
    checkCorrect(api.checkSale, addDataCorrect)
  }

  const editData = () => {
    checkCorrect(api.checkSale, editDataCorrect)
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
    apiHandler(api.getSaleForEdit, formik.setValues, e.target.name, onAction, HEADER_BASIC.update)
  }

  const addLine = () => {
    const lines = [...formik.values.productList]
    let exist = false
    for (const line of lines) {
      if (line.id === formik.values.product.value) {
        exist = true
        break
      }
    }
    if (!exist) {
      lines.push({
        id: formik.values.product.value,
        label: formik.values.product.name,
      })
    }
    else {
      dispatch('popup/toggle', {
        popup: POPUP_TYPES.admin_panel,
        text: `Продукт '${formik.values.product.name}' уже добавлен`
      })
    }
    formik.setFieldValue('productList', lines.sort(
      function (a, b) {
        if (a.label > b.label) {
          return 1;
        }
        if (a.label < b.label) {
          return -1;
        }
        return 0;
      }))
    formik.setFieldValue(FORM_FIELDS.product, null)
  }

  const deleteProduct = (e) => {
    formik.setFieldValue('productList', [...formik.values.productList].filter(line => line.id !== +e.target.name))
  }

  const changeOption = (e) => {
    if (e.target.name !== optionName) {
      setOptionName(e.target.name)
      setFilters({ ...filters, status: e.target.value })
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
      text: SALE_KIND.present,
      value: SALE_KIND_VALUE.present,
    },
    {
      func: e => changeOption(e),
      text: SALE_KIND.future,
      value: SALE_KIND_VALUE.future,
    }
  ]

  useEffect(() => {
    if (formik) {
      const { isValid, values } = formik;
      let equal = _.isEqual(values, data)
      if (!equal && _.isEqual(data?.productList, values.productList)) {
        equal = true
      }
      const isDisabled = !isValid || equal || !values?.productList?.length
      setDisabled(isDisabled)
      if (!data) {
        setData({ ...values })
      }
    }
  }, [formik])

  const func = header === `${HEADER_BASIC.add} ${HEADER}` ? addData : editData
  const funcAfterConfirm = header === `${HEADER_BASIC.add} ${HEADER}` ? addDataCorrect : editDataCorrect
  const dateMinForEnd = dateFotmattedForMakeDeliveryBack(
    new Date() > new Date(formik.values.start_at)
      ? new Date() : new Date(formik.values.start_at)
  )

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
                min={dateMinForEnd}
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
            <p className={style.list_header}>Участвующие продукты:</p>
            <ul className={style.list_product}>
              {formik.values?.productList.map(product => (
                <li key={product.id} className={style.list_line}>
                  <p className={style.list_item}>{product.label}</p>
                  <div>
                    <Button
                      variant='text'
                      className='button-delete_action'
                      data-cy='btn'
                      title='Удалить строку'
                      name={product.id}
                      onClick={deleteProduct}
                    >
                      <Icon slot='icon-left' icon='deleteIcon' />
                    </Button>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </AddOrUpdate>
      ) : (
        <div>
          {children}
          <div className={style.filter}>
            <Search filters={filters} setFilters={setFilters} />
            <DropdownDescription text='Статус:' options={OPTIONS} visiableText={optionName} />
          </div>
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
            filters={filters}
            handleSubmitError={handleSubmitError}
            onDelete={onDelete}
            onAdd={onAction}
            onEdit={onEdit}
          />
        </div>
      )
      }
      <Popup />
      <ProductSale data={productCheck} func={funcAfterConfirm} />
    </>
  )
}

export default BonusCardOwners