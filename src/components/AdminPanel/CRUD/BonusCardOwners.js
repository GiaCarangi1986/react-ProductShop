import React, { useEffect, useState } from 'react';
import {
  BONUS_CARD_OWNER,
  WIDTH_COL_BONUS_CARD_OWNER,
} from '../../../const';
import { handingErrors } from '../../../utils'
import ListShow from './ListShow';

import api from '../../../api'

const BonusCardOwners = ({ children, bonus_card }) => {
  const {
    bonusCardOwner = [],
    setBonusCardOwner = () => { },
    setError,
    error,
  } = bonus_card

  const [loading, setLoading] = useState(false)

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError(errResponse.val)
    }
  }

  useEffect(() => {
    if (!bonusCardOwner.length) {
      setLoading(true)
      api.getBonusCardOwner()
        .then(res => {
          setBonusCardOwner(res)
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
      list={bonusCardOwner}
      WIDTH_COL={WIDTH_COL_BONUS_CARD_OWNER}
      NAME_COL={BONUS_CARD_OWNER}
      loading={loading}
      error={error}
    />
  )
}

export default BonusCardOwners