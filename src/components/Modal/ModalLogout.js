import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useStoreon } from 'storeon/react'
import { Button, Modal } from '../../views'
import { MODAL_TYPES, PATHS } from '../../const'
import style from './modal.module.scss'

const ModalLogout = () => {
  const { modal, dispatch } = useStoreon('modal')
  const [open, setOpen] = useState(false)

  const navigate = useNavigate();

  const logout = () => {
    dispatch('modal/close')
    dispatch('user/reset')
    navigate(PATHS.auth.path)
  }

  const closeModal = () => dispatch('modal/close')

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.logout)
  }, [modal])

  return (
    <Modal setOpen={setOpen} variant='centered' open={open}>
      <h2 className={style['modal-centered__title']}>Выход</h2>
      <p>Вы действительно хотите выйти?</p>
      <div className={style['modal-btns']}>
        <Button buttonDis onClick={logout} className='btn_choose_logout' outline>
          Выйти
        </Button>
        <Button onClick={closeModal}>
          Отмена
        </Button>
      </div>
    </Modal>
  )
}

export default ModalLogout
