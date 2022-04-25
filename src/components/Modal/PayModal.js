import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { Button, Modal } from '../../views'
import { MODAL_TYPES } from '../../const'
import style from './modal.module.scss'

const PayModal = ({ func = () => { }, headers = {} }) => {
  const { modal, dispatch } = useStoreon('modal')
  const [open, setOpen] = useState(false)

  const closeModal = () => dispatch('modal/close')

  const positiveAction = () => {
    closeModal()
    func()
  }

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.payModal)
  }, [modal])

  return (
    <Modal setOpen={setOpen} variant='centered' open={open}>
      <h2 className={style['modal-centered__title']}>{headers.main}</h2>
      <p>{headers.text}</p>
      <div className={style['modal-btns']}>
        <Button onClick={closeModal} outline>
          {headers.btnCancel}
        </Button>
        <Button buttonDis onClick={positiveAction} className='btn_choose_logout'>
          {headers.btnOk}
        </Button>
      </div>
    </Modal>
  )
}

export default PayModal
