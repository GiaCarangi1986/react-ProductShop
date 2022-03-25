import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useStoreon } from 'storeon/react';
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import RightPart from './RightPart'
// import LeftPart from './LeftPart'
import { Button, Icon, PreloaderPage } from '../../views';
import { PayModal } from '../Modal';
import { generatCheck, handingErrors } from '../../utils';
import { PATHS, MODAL_TYPES } from '../../const';
import style from './check_operations.module.scss';
import AddCheckParams from './AddCheckParams';
import api from '../../api'

const CheckOperations = () => {
  const navigate = useNavigate();
  const { headers, dispatch } = useStoreon('headers');

  const [linesOfCheck, setLinesOfCheck] = useState([])
  const [discountCard, setDiscountCard] = useState({})
  const [pageHeaders, setHeaders] = useState({})
  const [total_sum, setTotalSum] = useState(0)
  const [compiledCheck, setCompiledCheck] = useState({})
  const [loading, setLoading] = useState(false)
  const [typePage, setTypePage] = useState(null)

  const PARTS_VIEWS = {
    addCheck: {
      left: AddCheckParams,
      rigth: null
    }
  }

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

  const createCheck = () => { // этот запрос и на редакт/отложен, ибо одинаково все
    setLoading(true)
    api.setCheck(compiledCheck)
      .then((res) => {
        console.log('res', res)
        setLoading(false)
        redirectToCheckList()
      })
      .catch((err) => {
        console.log('err', err)
        setLoading(false)
      })
  }

  const postponeCheck = () => {
    console.log('postponeCheck', check)
    dispatch('page/close')
    createCheck()
  }

  const addOrUpdateCheck = () => {
    const _check = check
    console.log('addOrUpdateCheck', _check)
    dispatch('page/close')
    setCompiledCheck(_check)
    dispatch('modal/toggle', {
      modal: MODAL_TYPES.payModal,
    })
  }

  useEffect(() => {
    if (headers && Object.keys(headers).length > 0) {
      setHeaders(headers)
      setTypePage(headers.type)
    }
  }, [headers])

  const LeftPart = PARTS_VIEWS[typePage]?.left || null

  if (LeftPart) {
    return (
      <>
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
            />
          </div>
        </section>
        <PayModal
          func={createCheck}
          headers={{
            main: 'Покупка',
            text: `Ожидается оплата в размере ${compiledCheck.totalCost - compiledCheck.bonus_count} руб.`,
            btnCancel: 'Отмена',
            btnOk: 'Оплатить',
          }}
        />
        {loading && <PreloaderPage loaderClass='layout_full' />}
      </>
    )
  }
  else return null
}

export default CheckOperations;