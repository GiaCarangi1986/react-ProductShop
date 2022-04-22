import React from 'react';
import { Button } from '../../views';
import style from './style.module.scss';

const Options = ({ operation = {}, typePage = '', handleClick = () => { } }) => {
  return (
    <div>
      <p className={style.header}>{operation.title}</p>
      <ul className={style.list}>
        {operation.content.map(el => {
          const activeStyle = typePage === el.value ? 'item-btn-active__admin' : ''
          return (
            <li key={el.value} className={style.item}>
              <Button
                variant='text'
                value={el.value}
                className={activeStyle}
                anotherClass='item-btn__admin'
                onClick={handleClick}
              >
                {el.title}
              </Button>
            </li>
          )
        }
        )}
      </ul>
    </div>
  )
}

export default Options