import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useStoreon } from 'storeon/react'
import { Button, Modal } from '../../views'
import { MODAL_TYPES } from '../../const'
import style from './modal.module.scss'

const ErrorModal = ({ errorMessage, func = () => { }, closeArea = undefined }) => {
  const { modal, dispatch } = useStoreon('modal')
  const [open, setOpen] = useState(false)

  const closeModal = () => dispatch('modal/close')

  const positiveAction = () => {
    closeModal()
    func()
  }

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.errorModal)
  }, [modal])

  return (
    <Modal setOpen={setOpen} variant='centered' open={open} closeArea={closeArea}>
      <h2 className={style['modal-centered__title']}>Произошла ошибка!</h2>
      <p>{errorMessage}</p>
      <div className={classNames(style['modal-btns'], style['modal-btns__justcontent'])}>
        <Button onClick={positiveAction} className='btn_choose_logout'>
          Ок
        </Button>
      </div>
    </Modal>
  )
}

export default ErrorModal
