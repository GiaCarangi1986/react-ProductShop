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
    />
  )
}

export default BonusCardOwners