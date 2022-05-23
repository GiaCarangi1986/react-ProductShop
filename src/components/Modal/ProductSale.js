import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'
import { Button, Modal } from '../../views'
import { MODAL_TYPES } from '../../const'
import style from './modal.module.scss'

const ProductSale = ({ func = () => { }, data = [], title = '', idDelete = '' }) => {
  const { modal, dispatch } = useStoreon('modal')
  const [open, setOpen] = useState(false)

  const closeModal = () => dispatch('modal/close')

  const positiveAction = () => {
    closeModal()
    func(idDelete)
  }

  useEffect(() => {
    setOpen(modal === MODAL_TYPES.productSale)
  }, [modal])

  return (
    <Modal setOpen={setOpen} variant='centered' open={open}>
      <h2 className={style['modal-centered__title']}>{title}</h2>
      <ul className={style['modal-centered__list']}>
        {data.map((el, index) => {
          return (
            <li key={el.id}>
              <div className={style['modal-centered__item']}>
                <span>{`${index + 1}.`}</span>
                <span>{el.title}</span>
              </div>
            </li>
          )
        })}
      </ul>
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

export default ProductSale
