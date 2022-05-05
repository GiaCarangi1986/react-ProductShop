import React, { useEffect, useState } from 'react';
import {
  SALE_LIST,
  WIDTH_COL_SALE_LIST,
} from '../../../const';
import { handingErrors } from '../../../utils'
import ListShow from './ListShow';

import api from '../../../api'

const Sale = ({ children, sale }) => {
  const {
    saleList = [],
    setSaleList = () => { },
    setError,
    error,
  } = sale

  const [loading, setLoading] = useState(false)

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  useEffect(() => {
    if (!saleList.length) {
      setLoading(true)
      api.getSaleList()
        .then(res => {
          setSaleList(res)
          setLoading(false)
          setError('')
        })
        .catch(err => {
          console.log('err', err)
          handleSubmitError(err?.response) // норм ошибку выводить
          setLoading(false)
        })
    }
  }, [])

  return (
    <ListShow
      children={children}
      list={saleList}
      WIDTH_COL={WIDTH_COL_SALE_LIST}
      NAME_COL={SALE_LIST}
      loading={loading}
      error={error}
    />
  )
}

export default Sale