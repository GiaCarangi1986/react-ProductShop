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
  const { headers, dispatch } = useStoreon('headers');

  const [linesOfCheck, setLinesOfCheck] = useState([])
  const [discountCard, setDiscountCard] = useState({})
  const [pageHeaders, setHeaders] = useState({})
  const [total_sum, setTotalSum] = useState(0)

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
    dispatch('page/close')
  }

  const addOrUpdateCheck = () => {
    console.log('addOrUpdateCheck', check)
    dispatch('page/close')
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
        <LeftPart // затем тут сделаю addCheckProps={...} и т д + компонет буду передавать нужный
          linesOfCheck={linesOfCheck}
          setLinesOfCheck={setLinesOfCheck}
          discountCard={discountCard}
          setDiscountCard={setDiscountCard}
          leftHeader={pageHeaders?.left}
          total_sum={total_sum}
        />
        <span className={style.line} />
        <RightPart
          linesOfCheck={linesOfCheck}
          setLinesOfCheck={setLinesOfCheck}
          discountCard={discountCard}
          postponeCheck={postponeCheck}
          addOrUpdateCheck={addOrUpdateCheck}
          rightHeader={pageHeaders?.right}
          btnText={pageHeaders?.btnText}
          total_sum={total_sum}
          setTotalSum={setTotalSum}
        />
      </div>
    </section>
  )
}

export default CheckOperations;