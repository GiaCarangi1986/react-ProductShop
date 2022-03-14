import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { GxGrid, GxCol, GxRow } from '@garpix/garpix-web-components-react'
import { Button, ErrorText, Fieldset, Form, Icon, Input } from '../../views'
import { handingErrors, deleteSpaces } from '../../utils'
import { addFrequencyInfo } from '../../schema'
import { FORM_LABELS, FORM_FIELDS, MODALS_CHECK, CHECK_LINES_HEADER, WIDTH_COL_CHECK } from '../../const'
import api from '../../api'

import table_style from '../CheckTable/check_table.module.scss'
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

  const classesScroll = classNames({
    [style['table_scroll-horizontal']]: true,
    [style['table_scroll-vertical']]: true,
    [style['table-layout']]: true,
  })

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
          <div className={classesScroll}>
            <div className={style['table-layout']}>
              <table className={table_style.table}>
                <thead className={table_style['table-head']}>
                  <tr className={table_style['table-row']}>
                    <th key='action_colunm' className={table_style['table-col']}>
                      <div style={{ width: '25px' }} />
                    </th>
                    {Object.keys(CHECK_LINES_HEADER).map(header => {
                      const w = WIDTH_COL_CHECK[header] || 30
                      return (
                        <th key={header} className={table_style['table-col']}>
                          <div style={{ width: `${w}px`, margin: 'auto' }}>
                            {CHECK_LINES_HEADER[header]}
                          </div>
                        </th>
                      )
                    })}
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
            </div>
          </div>
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