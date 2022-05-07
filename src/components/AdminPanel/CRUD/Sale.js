import React, { useState } from 'react';
import {
  SALE_LIST,
  WIDTH_COL_SALE_LIST,
} from '../../../const';
import { handingErrors } from '../../../utils'
import ListShow from './ListShow';
import AddOrUpdate from './AddOrUpdate';
import api from '../../../api'

const Sale = ({ children, sale }) => {
  const {
    saleList = [],
    setSaleList = () => { },
  } = sale

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addUpdate, setAddUpdate] = useState(false)
  const [data, setData] = useState([])

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const onDelete = e => {
    setLoading(true)
    api.deleteSale(e.target.name)
      .then(res => {
        setSaleList(res)
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
  }

  const onAdd = () => {
    setAddUpdate(true)
  }

  return (
    <>
      {addUpdate ? <AddOrUpdate comeBack={comeBack} /> : (
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
          onAdd={onAdd}
        />
      )}
    </>
  )
}

export default Sale