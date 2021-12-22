import React from 'react'
import { useStoreon } from 'storeon/react'
import { Button } from '..'
import { ERROR_TEXT, ERROR_TYPES } from '../../const'

import style from './popup-error.module.scss'

const ErrorPopup = () => {
  const { errorPopup, dispatch } = useStoreon('errorPopup')
  const closePopup = () => dispatch('error/toggle', {errorPopup: null})
  return (
    <div className={style['error-wrapper']}>
      <div className={style['error-popup']}>
        <div className={style['error-text']}>{ERROR_TEXT[errorPopup]}
        {errorPopup !== ERROR_TYPES.offline ? (
          <><br /> Пожалуйста, попробуйте позже</>
        ) : null}
        </div>
        {errorPopup !== ERROR_TYPES.offline && (
          <div className={style['error-bottom']}>
            <Button onClick={closePopup} outline>Закрыть</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorPopup