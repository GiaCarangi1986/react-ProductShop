import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react';
import RightPart from './RightPart'
import LeftPart from './LeftPart'
import { Button, Icon } from '../../views';
import { generatCheck, handingErrors } from '../../utils';
import { PATHS } from '../../const';
import style from './check_operations.module.scss';

import api from '../../api'

const CheckOperations = () => {
  const navigate = useNavigate();
  const { headers } = useStoreon('headers');

  const [linesOfCheck, setLinesOfCheck] = useState([])
  const [discountCard, setDiscountCard] = useState({})
  const [maxBonus, setMaxBonus] = useState(0)
  const [cardMaxBonus, setCardMaxBonus] = useState(0)
  const [pageHeaders, setHeaders] = useState({})

  const handleSubmitError = ({ response, actions }) => { // пока не используется
    if (response) {
      const errResponse = handingErrors(response);
      actions.setFieldError([errResponse.key], errResponse.val)
    }
    actions.setSubmitting(false)
  }

  const redirectToCheckList = () => {
    navigate(PATHS.check_list.path)
  }

  const check = useMemo(
    () => generatCheck(discountCard, linesOfCheck),
    [discountCard, linesOfCheck]
  );

  const postponeCheck = () => {
    console.log('postponeCheck', check)
  }

  const addOrUpdateCheck = () => {
    console.log('addOrUpdateCheck', check)
  }

  useEffect(() => {
    if (headers && Object.keys(headers).length > 0) {
      setHeaders(headers)
    }
  }, [headers])

  return (
    <section className={style.wrap}>
      <div className={style.close}>
        <Button
          variant='text'
          className='button-edit_action'
          onClick={redirectToCheckList}
        >
          <Icon slot='icon-left' icon='close' />
        </Button>
      </div>
      <h1 className={style.header}>{pageHeaders?.main}</h1>
      <div className={style.wrap_parts}>
        <LeftPart
          linesOfCheck={linesOfCheck}
          setLinesOfCheck={setLinesOfCheck}
          discountCard={discountCard}
          setDiscountCard={setDiscountCard}
          maxBonus={maxBonus}
          setMaxBonus={setMaxBonus}
          cardMaxBonus={cardMaxBonus}
          setCardMaxBonus={setCardMaxBonus}
          leftHeader={pageHeaders?.left}
        />
        <span className={style.line} />
        <RightPart
          linesOfCheck={linesOfCheck}
          setLinesOfCheck={setLinesOfCheck}
          discountCard={discountCard}
          setDiscountCard={setDiscountCard}
          maxBonus={maxBonus}
          setMaxBonus={setMaxBonus}
          cardMaxBonus={cardMaxBonus}
          postponeCheck={postponeCheck}
          addOrUpdateCheck={addOrUpdateCheck}
          rightHeader={pageHeaders?.right}
          btnText={pageHeaders?.btnText}
        />
      </div>
    </section>
  )
}

export default CheckOperations;