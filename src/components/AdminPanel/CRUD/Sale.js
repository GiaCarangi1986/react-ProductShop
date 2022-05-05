import React, { useState } from 'react';
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

  return (
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
    />
  )
}

export default Sale