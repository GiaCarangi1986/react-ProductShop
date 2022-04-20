import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { Button, Modal } from '../../views'
import { MODAL_TYPES } from '../../const'
import style from './modal.module.scss'

const ErrorModal = ({ errorMessage, func = () => { }, closeArea = undefined, data = {} }) => {
  const { modal, dispatch } = useStoreon('modal')
  const [open, setOpen] = useState(false)

  const closeModal = () => {
    if (closeArea) {
      closeArea()
    }
    dispatch('modal/close')
  }

  const positiveAction = () => {
    closeModal()
    func(data)
  }

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.errorModal)
  }, [modal])

  return (
    <Modal setOpen={setOpen} variant='centered' open={open} closeArea={closeArea}>
      <h2 className={style['modal-centered__title']}>Произошла ошибка!</h2>
      <p>{errorMessage}</p>
      <div className={style['modal-btns']}>
        <Button buttonDis onClick={positiveAction} outline >
          Удалить принудительно
        </Button>
        <Button onClick={closeModal} className='btn_choose_logout'>
          Отменить
        </Button>
      </div>
    </Modal>
  )
}

export default ErrorModal
