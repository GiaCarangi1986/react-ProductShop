import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { Button, Icon } from '../../views'
import { POPUP_TYPES } from '../../const'
import style from './style.module.scss'

const Popup = () => {
  const { popup, text, dispatch } = useStoreon('popup', 'text')
  const [open, setOpen] = useState(false)

  const closePopup = () => dispatch('popup/close')

  useEffect(() => {
    setOpen(popup === POPUP_TYPES.admin_panel)
  }, [popup])

  useEffect(() => {
    if (open) {
      setTimeout(() => closePopup(), 6000)
    }
  }, [open]);

  if (!open) {
    return null
  }
  return (
    <div className={style.container}>
      <Button
        variant='text'
        className='button-edit_action'
        onClick={closePopup}
      >
        <Icon slot='icon-left' icon='close' />
      </Button>
      <p className={style.text}>{text}</p>
    </div>
  )
}

export default Popup
