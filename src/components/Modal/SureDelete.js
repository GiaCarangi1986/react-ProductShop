import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { Button, Modal } from '../../views'
import { MODAL_TYPES } from '../../const'
import style from './modal.module.scss'

const SureDelete = ({ func = () => { }, data = '' }) => {
  const { modal, dispatch } = useStoreon('modal')
  const [open, setOpen] = useState(false)

  const closeModal = () => dispatch('modal/close')

  const positiveAction = () => {
    closeModal()
    func(data)
  }

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.sureDelete)
  }, [modal])

  const messsage = `{Выбранный чек с id = ${data} будет безвозратно удален}`

  return (
    <Modal setOpen={setOpen} variant='centered' open={open}>
      <h2 className={style['modal-centered__title']}>Подтвердите удаление чека</h2>
      <p>{messsage}</p>
      <div className={style['modal-btns']}>
        <Button buttonDis onClick={positiveAction} outline >
          Да
        </Button>
        <Button onClick={closeModal} className='btn_choose_logout'>
          Нет
        </Button>

      </div>
    </Modal>
  )
}

export default SureDelete
