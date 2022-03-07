import React, { useEffect, useState } from 'react'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Icon, Input } from '../../views'
import { handingErrors, deleteSpaces } from '../../utils'
import { addFrequencyInfo } from '../../schema'
import { FORM_LABELS, FORM_FIELDS, MODALS_CHECK } from '../../const'
import api from '../../api'

import style from './modal.module.scss'

const CheckListModal = ({
  backToMainForm = () => { },
  setContentType = () => { },
  linesOfCheck = [],
  discountCard = {},
  setLinesOfCheck = () => { },
  setDiscountCard = () => { },
  headerText = '',
}) => {
  const [disabled, setDisabled] = useState(true)

  const onSubmit = (values, actions) => {
    console.log('values', values)
  }

  return (
    <div className={style['service-form']}>
      <GxGrid className={style['service-grid']}>
        <GxRow>
          <GxCol className={style['service-col']}>
            <Button
              onClick={backToMainForm}
              className='btn-back'
              variant='text'
              data-cy='btn'
            >
              <Icon icon='arrowBack' />
              Добавление чека
            </Button>
          </GxCol>
        </GxRow>
        <GxRow>
          <GxCol className={style['service-col']}>
            <h2>{headerText}</h2>
          </GxCol>
        </GxRow>
        <div>
        </div>
        <Form onGx-submit={() => console.log('submit')} data-cy='form'>
          <table>
            <thead>
              <tr>
                <th>
                  Наименование
                </th>
                <th>
                  Кол-во/вес
                </th>
                <th>
                  Цена 1шт/1кг
                </th>
                <th>
                  Общая стоимость
                </th>
              </tr>
            </thead>
            <tbody>
              {linesOfCheck.map(line => {
                return (
                  <tr key={line.id}>
                    <td>
                      {line.label}
                    </td>
                    <td>
                      {line.count}
                    </td>
                    <td>
                      {line.price}
                    </td>
                    <td>
                      {Math.round(line.price * line.count * 100) / 100}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* <GxRow>
            <GxCol className={style['service-col']} offset={10} size={2}>
              <Button
                type='submit'
                disabled={disabled}
                className='btn_width-100'
                data-cy='btn'
                buttonDis
              >
                Добавить
              </Button>
            </GxCol>
          </GxRow> */}
        </Form>
      </GxGrid>
    </div>
  )
}

export default CheckListModal