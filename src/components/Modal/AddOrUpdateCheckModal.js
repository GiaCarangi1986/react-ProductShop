import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useStoreon } from 'storeon/react';
import CheckModal from './CheckModal';
import PayModal from './PayModal';
import CheckListModal from './CheckListModal'
import { Modal } from '../../views';
import { addOrUpdateTariffSchema } from '../../schema'
import { MODAL_TYPES, TABLE_EVENT_TYPES, MODALS_CHECK, MODALS_CHECK_TITLE } from '../../const';
import { handingErrors, processingResult } from '../../utils'
import api from '../../api'

const MODALS_TYPES = {
  default: CheckModal,
  payModal: PayModal,
  checkList: CheckListModal,
}

const AddOrUpdateCheckModal = ({
  results = null,
  getFilters = () => { },
  setAddedFilters = () => { },
  setEventType = () => { },
  updateElement = () => { },
  filterParams = {},
  ...props
}) => {
  const { modal,
    // tariff = null,
    dispatch } = useStoreon('modal',
      // 'tariff'
    )
  const [open, setOpen] = useState(false)
  const [contentType, setContentType] = useState(MODALS_CHECK.default)
  const [linesOfCheck, setLinesOfCheck] = useState([])
  const [discountCard, setDiscountCard] = useState({})

  const backToMainForm = () => setContentType(MODALS_CHECK.default)

  const addData = (actions = null) => {
    if (results.length) {
      setEventType(TABLE_EVENT_TYPES.changeData)
    }
    dispatch('modal/close')
    actions.setSubmitting(false)
  }

  const updateData = (res = [], actions = null, id = 0) => {
    const index = results.findIndex(elem => elem.id === id)
    const val = processingResult(res)
    actions.setSubmitting(false)
    dispatch('modal/close')
    updateElement(index, val)
  }

  const handleSubmitError = ({ response, actions }) => {
    if (response) {
      const errResponse = handingErrors(response);
      actions.setFieldError([errResponse.key], errResponse.val)
    }
    actions.setSubmitting(false)
  }

  // const createTariff = (values, actions) => {
  //   api.createTariff(values)
  //     .then(res => {
  //       if (res) {
  //         const pageSize = filterParams.pageSize + 1
  //         addData(actions)
  //         getFilters()
  //         loadData(1, { ...filterParams, pageSize })
  //       }
  //     })
  //     .catch(({ response }) => handleSubmitError({ response, actions }))
  // }

  // const updateTariff = (values, actions) => {
  //   api.updateService(values.id, values)
  //     .then(res => {
  //       if (res) {
  //         updateData(res, actions, values.id)
  //         getFilters()
  //       }
  //     })
  //     .catch(({ response }) => handleSubmitError({ response, actions }))
  // }

  const onSubmit = (values, actions) => {
    console.log('values', values)
  }

  const checkFormik = useFormik({
    initialValues: {},
    // validationSchema: addOrUpdateTariffSchema,
    onSubmit
  })

  // useEffect(() => {
  //   const values = {
  //     line_business: tariff && tariff.data ? {
  //       value: tariff.data.line_business_pk,
  //       label: tariff.data.line_business
  //     } : null,
  //     line_business_code: tariff?.data?.line_business_code || 0,

  //     service_line: tariff && tariff.data ? {
  //       value: tariff.data.service_line_pk,
  //       label: tariff.data.service_line
  //     } : null,
  //     service_line_code: tariff?.data?.service_line_code || 0,

  //     service: tariff && tariff.data ? {
  //       value: tariff.data.service_pk,
  //       label: tariff.data.service
  //     } : null,
  //     service_code: tariff?.data?.service_code || 0,

  //     service_element: tariff && tariff.data ? {
  //       value: tariff.data.service_element_pk,
  //       label: tariff.data.service_element
  //     } : null,
  //     service_element_code: tariff?.data?.service_element_code || 0,

  //     tariff: tariff?.data?.tariff || '',
  //     id: tariff?.data?.tariff_pk || null,
  //     code: tariff?.data?.tariff_code || 0,

  //     tariff_element: tariff && tariff.data ? {
  //       value: tariff?.data.tariff_element_pk,
  //       label: tariff?.data.tariff_element
  //     } : null,

  //     tariff_unit: tariff && tariff.data ? {
  //       value: tariff?.data.tariff_unit_pk,
  //       label: tariff?.data.tariff_unit
  //     } : null,

  //     tariff_type: tariff && tariff.data ? {
  //       value: tariff.data.tariff_type_pk,
  //       label: tariff.data.tariff_type
  //     } : null,

  //     flat_rate: tariff && tariff.data ? {
  //       value: tariff.data.flat_rate,
  //       label: tariff.data.flat_rate ? 'Да' : 'Нет'
  //     } : null,

  //     price: tariff?.data?.price || 0,
  //     is_available: tariff?.data?.is_available || true,

  //     cost_price: tariff?.data?.cost_price || 0,
  //     frequency_info: tariff && tariff.data ? {
  //       value: tariff.data?.update_frequency.pk,
  //       label: tariff.data?.update_frequency.readable_freq,
  //       freq: tariff.data?.update_frequency.freq,
  //       base: tariff.data?.update_frequency.base,
  //     } : null,
  //     comment: tariff?.data?.comment || '',
  //     start_at: tariff?.data?.start_at_special_formatted || null,
  //     end_at: tariff?.data?.end_at_special_formatted || null,
  //   }
  //   setDiscount(tariff?.data?.max_discount || 0)
  //   tariffFormik.setValues(values)
  // }, [tariff])

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.service)
  }, [modal])

  useEffect(() => {
    if (!open) {
      backToMainForm()
      setLinesOfCheck([])
      setDiscountCard(null)
    }
  }, [open])
  console.log('linesOfCheck', linesOfCheck)
  if (MODALS_TYPES[contentType]) {
    const Component = MODALS_TYPES[contentType];
    const headerText = MODALS_CHECK_TITLE[contentType] // буду проверять входящие данные (есть id редакт чека или нет) и менять эту надпись
    return (
      <Modal setOpen={setOpen} variant='right' open={open}>
        <Component
          backToMainForm={backToMainForm}
          setContentType={setContentType}
          checkFormik={checkFormik}
          setOpen={setOpen}
          open={open}
          setEventType={setEventType}
          linesOfCheck={linesOfCheck}
          setLinesOfCheck={setLinesOfCheck}
          discountCard={discountCard}
          setDiscountCard={setDiscountCard}
          handleSubmitError={handleSubmitError}
          headerText={headerText}
          {...props} />
      </Modal>
    )
  }
  return null
}

export default AddOrUpdateCheckModal;