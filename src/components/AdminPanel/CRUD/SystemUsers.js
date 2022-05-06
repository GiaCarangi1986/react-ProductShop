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
    setError,
    error,
  } = user

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
    />
  )
}

export default SystemUsers