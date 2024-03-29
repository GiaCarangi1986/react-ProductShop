import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import { useStoreon } from 'storeon/react';
import { useFormik } from 'formik'
import {
  CATEGORY,
  WIDTH_COL_CATEGORY,
  FORM_FIELDS,
  FORM_LABELS,
  SELECT_TYPES,
  HEADER_BASIC,
  POPUP_TYPES,
  MODAL_TYPES
} from '../../../const';
import Search from '../../Search'
import Popup from '../../Popup'
import { ProductSale } from '../../Modal';
import { handingErrors, deleteSpaces } from '../../../utils'
import { Input, Fieldset, Button, Icon } from '../../../views';
import Select from '../../Select';
import ListShow from './ListShow';
import AddOrUpdate from './AddOrUpdate';
import { categoryCRUD } from '../../../schema';
import style from '../style.module.scss';
import api from '../../../api'

const Category = ({ children }) => {
  const [categories, setCategories] = useState([])

  const { dispatch } = useStoreon();

  const HEADER = 'категории'

  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addUpdate, setAddUpdate] = useState(false)
  const [header, setHeader] = useState('')
  const [data, setData] = useState(null)
  const [filters, setFilters] = useState({})
  const [productCheck, setProductCheck] = useState([])
  const [warning, setWarning] = useState('')
  const [idDelete, setIdDelete] = useState('')

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const initialValues = {
    title: '',
    product: null,
    productList: []
  }

  const formik = useFormik({
    initialValues,
    validationSchema: categoryCRUD,
  })

  const handleBlur = e => {
    const { name } = e.target;
    const value = deleteSpaces(formik.values[name])
    formik.handleBlur(e)
    formik.setFieldValue([name], value)
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

  const handleInput = e => {
    formik.setFieldValue(e.target.name, e.target.value)
  }

  const handleSelectBlur = (name = '') => {
    formik.setFieldTouched([name], true)
  }

  const chooseSelectValue = (e, name) => {
    formik.setFieldValue(name, e)
  }

  const productExist = (id) => {
    return data?.productList?.filter(el => el.id === id)[0] ?? false
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

  const checkCorrect = (
    apiFunc = () => { },
    afterFunc = () => { },
    title = 'Внимание! В нижеперечисленных продуктах текущая категория будет заменена новой',
    idForDeleteCheck = ''
  ) => {
    setLoading(true)
    apiFunc(idForDeleteCheck || formik.values)
      .then(res => {
        if (res.length) {
          setProductCheck(res)
          dispatch('modal/toggle', {
            modal: MODAL_TYPES.productSale,
          })
          setWarning(title)
          setIdDelete(idForDeleteCheck)
        }
        else {
          afterFunc(idForDeleteCheck)
        }
        setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
        setLoading(false)
      })
  }

  const deleteDataCorrect = (idForDeleteCheck) => {
    apiHandler(api.deleteCategory, setCategories, idForDeleteCheck, clearFilters)
  }

  const addDataCorrect = () => {
    apiHandler(api.addCategory, setCategories, formik.values, applyChanges)
  }

  const editDataCorrect = () => {
    apiHandler(api.editCategory, setCategories, formik.values, applyChanges)
  }

  const addData = () => {
    checkCorrect(api.checkCategory, addDataCorrect)
  }

  const editData = () => {
    checkCorrect(api.checkCategory, editDataCorrect)
  }

  const onDelete = (e) => {
    const id = e.target.name
    checkCorrect(
      api.checkCategoryDelete,
      deleteDataCorrect,
      'Внимание! Вместе с данной категорией будут удалены следующие продукты:',
      id,
    )
  }

  const onAction = (action) => {
    setAddUpdate(true)
    setHeader(`${action} ${HEADER}`)
    setError('')
    setWarning('')
    setIdDelete('')
    if (action === HEADER_BASIC.add) {
      setData({ ...initialValues })
    }
  }

  const onEdit = (e) => {
    apiHandler(api.getCategoryForEdit, formik.setValues, e.target.name, onAction, HEADER_BASIC.update)
  }

  useEffect(() => {
    if (formik) {
      const { isValid, values } = formik;
      const valuesWithoutProduct = { ...values }
      delete valuesWithoutProduct.product
      let equal = _.isEqual(valuesWithoutProduct, data)
      if (equal && _.isEqual(data?.productList, valuesWithoutProduct.productList)) {
        equal = true
      }
      const isDisabled = !isValid || equal
      setDisabled(isDisabled)
      if (!data) {
        setData({ ...values })
      }
    }
  }, [formik])

  const func = header === `${HEADER_BASIC.add} ${HEADER}` ? addData : editData
  const funcAfterConfirm = header === `${HEADER_BASIC.add} ${HEADER}` ? addDataCorrect : editDataCorrect

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
          </div>
          <div className={style.addupdate__row}>
            <p className={style.list_header}>Состав продуктов:</p>
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
                      disabled={header === `${HEADER_BASIC.update} ${HEADER}` && productExist(product.id)}
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
          </div>
          <ListShow
            list={categories}
            setList={setCategories}
            WIDTH_COL={WIDTH_COL_CATEGORY}
            NAME_COL={CATEGORY}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            func={api.getCategory}
            filters={filters}
            handleSubmitError={handleSubmitError}
            onDelete={onDelete}
            onAdd={onAction}
            onEdit={onEdit}
          />
        </div>
      )}
      <Popup />
      <ProductSale data={productCheck} func={idDelete ? deleteDataCorrect : funcAfterConfirm} title={warning} idDelete={idDelete} />
    </>
  )
}

export default Category