import React from 'react';
import { ADMIN_ACTIONS, ADMIN_CRUD, ADMIN_REPORTS } from '../../const';
import style from './style.module.scss';

const AdminPanel = () => {
  const options = [
    {
      title: 'Действия',
      content: [
        ADMIN_ACTIONS.make_deliveries.title,
        ADMIN_ACTIONS.write_off_act.title
      ]
    },
    {
      title: 'CRUD операции',
      content: [
        ADMIN_CRUD.bonus_card.title,
        ADMIN_CRUD.sale.title,
        ADMIN_CRUD.user.title,
      ]
    },
    {
      title: 'Отчеты',
      content: [
        ADMIN_REPORTS.best_saler.title,
        ADMIN_REPORTS.popular_product.title
      ]
    }
  ]

  return (
    <div>
      {options.map(operation => (
        <div key={operation.title}>
          <p>{operation.title}</p>
          <ul>
            {operation.content.map(el =>
              <li key={el}>{el}</li>
            )}
          </ul>
        </div>
      ))
      }
    </div>
  )
}

export default AdminPanel