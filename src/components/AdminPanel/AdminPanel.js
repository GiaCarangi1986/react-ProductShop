import React from 'react';
import { ADMIN_PANEL } from '../../const';
import { Button } from '../../views';
import style from './style.module.scss';

const AdminPanel = () => {

  return (
    <div className={style.container}>
      {ADMIN_PANEL.map(operation => (
        <div key={operation.title}>
          <p className={style.header}>{operation.title}</p>
          <ul>
            {operation.content.map(el =>
              <li key={el.value}>
                <Button variant='text' value={el.value}>{el.title}</Button>
              </li>
            )}
          </ul>
        </div>
      ))
      }
    </div>
  )
}

export default AdminPanel