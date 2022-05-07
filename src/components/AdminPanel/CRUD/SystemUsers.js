import React, { useState } from 'react';
import {
  USER_LIST,
  WIDTH_COL_USER_LIST,
} from '../../../const';
import { handingErrors } from '../../../utils'
import ListShow from './ListShow';

import api from '../../../api'

const SystemUsers = ({ children, user }) => {
  const {
    systemUsers = [],
    setSystemUsers = () => { },
  } = user

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  const onDelete = e => {
    setLoading(true)
    api.deleteUser(e.target.name)
      .then(res => {
        console.log('res', res)
        setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
        handleSubmitError(err?.response)
        setLoading(false)
      })
  }

  return (
    <ListShow
      children={children}
      list={systemUsers}
      setList={setSystemUsers}
      WIDTH_COL={WIDTH_COL_USER_LIST}
      NAME_COL={USER_LIST}
      loading={loading}
      setLoading={setLoading}
      error={error}
      setError={setError}
      func={api.getUserList}
      handleSubmitError={handleSubmitError}
      onDelete={onDelete}
    />
  )
}

export default SystemUsers