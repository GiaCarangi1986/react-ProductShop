import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react';
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import RightPart from './RightPart'
import { Button, Icon, PreloaderPage } from '../../views';
import { PayModal, SureExit } from '../Modal';
import { generatCheck, handingErrors } from '../../utils';
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

  const [activeLine, setActiveLine] = useState(-1)
  const [addedChecks, setAddedChecks] = useState([])
  const [prevTotalSum, setPrevTotalSum] = useState(0)
  const [linesOfGeneratedCheck, setLinesOfGeneratedCheck] = useState([])

  const PARTS_VIEWS = {
    addCheck: AddCheckParams,
    viewCheck: HistoryChanges,
    editCheck: HistoryChanges
  }

  const handleSubmitError = ({ response, actions }) => { // пока не используется
    if (response) {
      const errResponse = handingErrors(response);
      actions.setFieldError([errResponse.key], errResponse.val)
    }
    actions.setSubmitting(false)
  }

  const updateCheckInfo = (element = {}) => {
    setActiveLine(element.id)
    setLinesOfCheck(element.linesCheckList)
    setLinesOfGeneratedCheck([])
    if (element.bonus_count) {
      setDiscountCard({
        bonus: element.bonus_count,
      })
    }
    setPrevTotalSum(element.totalCost)
  }

  const getHistoryCheck = (id) => {
    setLoading(true)
    api.getHistoryCheck(id)
      .then(res => {
        console.log('res', res)
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
    if (typePage !== PAGES_TYPES.viewCheck && total_sum !== prevTotalSum) {
      dispatch('modal/toggle', {
        modal: MODAL_TYPES.sureExit,
      })
    }
    else {
      redirectToCheckList()
    }
  }

  const createCheck = (paid = true) => { // этот запрос и на редакт/отложен, ибо одинаково все
    setLoading(true)
    const check = generatCheck(discountCard, linesOfCheck, null, currentUser, paid)
    api.setCheck(check)
      .then(() => {
        console.log('check', check)
        setLoading(false)
        redirectToCheckList()
      })
      .catch((err) => {
        console.log('err', err)
        setLoading(false)
      })
  }

  const postponeCheck = () => {
    console.log('postponeCheck', generatCheck(discountCard, linesOfCheck, null, currentUser))
    dispatch('page/close')
    createCheck(false)
  }

  const addOrUpdateCheck = (noNeedWarn = false) => {
    dispatch('page/close')
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.payModal,
    })
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
                      total_sum
                    }}
                    viewCheck={{
                      activeLine,
                      addedChecks,
                      updateCheckInfo
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
            />
          </div>
        </section>
        <PayModal
          func={createCheck}
          headers={{
            main: 'Покупка',
            text: `Ожидается оплата в размере ${total_sum - (+discountCard?.bonus || 0)} руб.`,
            btnCancel: 'Отмена',
            btnOk: 'Оплатить',
          }}
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