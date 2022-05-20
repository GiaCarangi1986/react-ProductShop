import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react';
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import RightPart from './RightPart'
import { Button, Icon, PreloaderPage } from '../../views';
import { PayModal, SureExit } from '../Modal';
import { generatCheck, handingErrors, roundNumber, calcTotalCostInLine } from '../../utils';
import { PATHS, MODAL_TYPES, PAGES_TYPES } from '../../const';
import style from './check_operations.module.scss';
import AddCheckParams from './AddCheckParams';
import HistoryChanges from './HistoryChanges';

import api from '../../api'

const CheckOperations = () => {
  const navigate = useNavigate();
  const { headers, dispatch, currentUser } = useStoreon('headers', 'currentUser');

  const [linesOfCheck, setLinesOfCheck] = useState([])
  const [discountCard, setDiscountCard] = useState({})
  const [pageHeaders, setHeaders] = useState({})
  const [total_sum, setTotalSum] = useState(0)
  const [loading, setLoading] = useState(false)
  const [typePage, setTypePage] = useState(null)
  const [error, setError] = useState([])

  const [activeLine, setActiveLine] = useState(null)
  const [addedChecks, setAddedChecks] = useState([])
  const [prevTotalSum, setPrevTotalSum] = useState(0)
  const [linesOfGeneratedCheck, setLinesOfGeneratedCheck] = useState([])
  const [delayCheck, setDelayCheck] = useState(false)

  const PARTS_VIEWS = {
    addCheck: AddCheckParams,
    viewCheck: HistoryChanges,
    editCheck: HistoryChanges,
    payDelayCheck: HistoryChanges
  }

  const handleSubmitError = (response) => {
    if (response) {
      const errResponse = handingErrors(response);
      setError([errResponse.key, errResponse.val])
    }
  }

  const updateCheckInfo = (element = {}) => {
    setActiveLine(element.id)
    setDelayCheck(!element.paid)
    setLinesOfCheck(calcTotalCostInLine(element.linesCheckList))
    setLinesOfGeneratedCheck([])
    if (element.cardId) {
      setDiscountCard({
        bonus: element.bonus_count,
        id: element.cardId
      })
    }
    setPrevTotalSum(element.totalCost)
  }

  const getHistoryCheck = (id) => {
    setLoading(true)
    api.getHistoryCheck(id)
      .then(res => {
        setAddedChecks(res)
        setLoading(false)

        const lastElement = res[res.length - 1]
        updateCheckInfo(lastElement)
      })
      .catch(err => {
        console.log('err', err)
        setLoading(false)
      })
  }

  const redirectToCheckList = () => {
    navigate(PATHS.check_list.path)
  }

  const sureForExit = () => {
    const addDiscountCard = discountCard && Object.keys(discountCard).length > 0
    if (typePage === PAGES_TYPES.editCheck && !_.isEqual(linesOfCheck, linesOfGeneratedCheck)
      || (addDiscountCard || total_sum !== prevTotalSum) && typePage === PAGES_TYPES.addCheck) {
      dispatch('modal/toggle', {
        modal: MODAL_TYPES.sureExit,
      })
    }
    else {
      redirectToCheckList()
    }
  }

  const deleteCheck = () => { // тут на все методы выводить ошибку в поле слева
    setLoading(true)
    api.deleteCheck(activeLine)
      .then((res) => {
        setLoading(false)
        redirectToCheckList()
      })
      .catch((err) => {
        handleSubmitError(err?.response)
        setLoading(false)
      })
  }

  const createCheck = (paid = true, newBonusCount = 0, updateBonusCount = false) => { // этот запрос и на редакт/отложен, ибо одинаково все
    setLoading(true)
    const check = generatCheck(discountCard, linesOfCheck, currentUser, paid, activeLine, newBonusCount, updateBonusCount)
    api.createCheck(check, activeLine ? addedChecks[addedChecks.length - 1].id : null)
      .then((id) => {
        setLoading(false)
        redirectToCheckList()
      })
      .catch((err) => {
        handleSubmitError(err?.response)
        setLoading(false)
      })
  }

  const payDelayCheck = () => {
    setLoading(true)
    api.paidCheck(activeLine, generatCheck(discountCard, linesOfCheck, currentUser, true))
      .then(res => {
        setLoading(false)
        redirectToCheckList()
      })
      .catch(err => {
        handleSubmitError(err?.response)
        setLoading(false)
      })
  }

  const postponeCheck = () => {
    dispatch('page/close')
    createCheck(false)
  }

  const addOrUpdateCheck = () => {
    dispatch('page/close')
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.payModal,
    })
  }

  const sumWithUsingBonus = (sum) => sum - (+discountCard?.bonus || 0)
  const correctSum = (delta) => delta > 0 ? delta : 0

  const headersForPayModal = typePage === PAGES_TYPES.addCheck || delayCheck ? {
    main: 'Покупка',
    text: `Ожидается оплата в размере ${roundNumber(sumWithUsingBonus(total_sum))} руб.`,
    btnCancel: 'Отмена',
    btnOk: 'Оплатить',
  } : {
    main: 'Возврат',
    text: `Ожидается возврат в размере 
    ${roundNumber(correctSum(sumWithUsingBonus(prevTotalSum - total_sum)))} руб.`,
    btnCancel: 'Отмена',
    btnOk: 'Выплатить',
  }

  const funcAfterOk = () => {
    if (linesOfCheck.length) {
      if (delayCheck) {
        payDelayCheck()
      }
      else {
        const newBonusCount = PAGES_TYPES.editCheck ?
          correctSum((+discountCard?.bonus || 0) - correctSum(prevTotalSum - total_sum)) : 0
        createCheck(true, newBonusCount, true)
      }
    }
    else {
      deleteCheck()
    }
  }

  useEffect(() => {
    if (headers && Object.keys(headers).length > 0) {
      setHeaders(headers)
      setTypePage(headers.type)
      if (headers.id) {
        getHistoryCheck(headers.id)
      }
    }
  }, [headers])

  const LeftPart = PARTS_VIEWS[typePage] || null

  if (LeftPart) {
    return (
      <>
        <section className={style.wrap}>
          <div className={style.close}>
            <Button
              variant='text'
              className='button-edit_action'
              onClick={sureForExit}
            >
              <Icon slot='icon-left' icon='close' />
            </Button>
          </div>
          <h1 className={style.header}>{pageHeaders?.main}</h1>
          <div className={style.wrap_parts}>
            <section className={style.part_left}>
              <div className={style['service-form']}>
                <GxGrid className={style['service-grid']}>
                  <GxRow>
                    <GxCol className={style['service-col']}>
                      <h2 className={style.header_part}>{pageHeaders?.left}</h2>
                    </GxCol>
                  </GxRow>
                  <LeftPart
                    addCheck={{
                      linesOfCheck,
                      setLinesOfCheck,
                      discountCard,
                      setDiscountCard,
                      total_sum,
                      error
                    }}
                    viewCheck={{
                      activeLine,
                      addedChecks,
                      updateCheckInfo,
                      error
                    }}
                  />
                </GxGrid>
              </div >
            </section>
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
              typePage={typePage}
              activeLine={activeLine}
              addedChecks={addedChecks}
              prevTotalSum={prevTotalSum}
              setLinesOfGeneratedCheck={setLinesOfGeneratedCheck}
              linesOfGeneratedCheck={linesOfGeneratedCheck}
              delayCheck={delayCheck}
            />
          </div>
        </section>
        <PayModal
          func={funcAfterOk}
          headers={headersForPayModal}
        />
        <SureExit
          func={redirectToCheckList}
        />
        {loading && <PreloaderPage loaderClass='layout_full' />}
      </>
    )
  }
  else return null
}

export default CheckOperations;