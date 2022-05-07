import React, { useState } from 'react';
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
  } = bonus_card

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

  return (
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
    />
  )
}

export default BonusCardOwners