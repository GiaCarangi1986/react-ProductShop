import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useStoreon } from 'storeon/react'
import { Button, Modal } from '../../views'
import { ERROR_TYPES, MODAL_TYPES, PATHS } from '../../const'
import style from './modal.module.scss'
import api from '../../api'

const ModalLogout = () => {
  const { modal, dispatch } = useStoreon('modal')
  const [open, setOpen] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.logout)
  }, [modal])

  const logout = () => {
    api
      .logoutUser()
      .then(() => {
        dispatch('modal/close')
        dispatch('user/reset')
        navigate(PATHS.auth.path)
      })
      .catch(() => {
        dispatch('modal/close')
        dispatch('error/toggle', { errorPopup: ERROR_TYPES.logout })
      })
  }

  const closeModal = () => dispatch('modal/close')

  return (
    <Modal setOpen={setOpen} variant='centered' open={open}>
      <h2 className={style['modal-centered__title']}>Выход</h2>
      <p>Вы действительно хотите выйти?</p>
      <div className={style['modal-btns']}>
        <Button onClick={closeModal} outline data-cy='btn'>
          Отмена
        </Button>
        <Button onClick={logout} data-cy='btn' buttonDis>Выйти</Button>
      </div>
    </Modal>
  )
}

export default ModalLogout
